const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const AppError = require('./AppError'); // Custom error handling module

const Product = require('./models/product'); // Importing the Product model

mongoose.connect('mongodb://127.0.0.1:27017/farmStand2')
    .then(() => {
        console.log('MongoDB connected');
    })
    .catch(err => {
        console.error('Connection Error:', err);
    });

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

const categories = ['fruit', 'vegetable', 'dairy'];

// Display all products or filter by category
app.get('/products', async (req, res, next) => {
    try{
        const { category } = req.query;
        if (category) {
            const products = await Product.find({ category });
            res.render('products/index', { products, category });
        } else {
            const products = await Product.find({});
            res.render('products/index', { products, category: 'All' });
        }
    } catch (err) {
        next(err);
    }
});

// Show form to create a new product
app.get('/products/new', (req, res) => {
    res.render('products/new', { categories });
});

// Create a new product
app.post('/products', async (req, res, next) => {
    try{
        const newProduct = new Product(req.body);
        await newProduct.save();
        res.redirect(`/products/${newProduct._id}`);
    } catch (err){
        next(err);
    }
});

// Show a single product
app.get('/products/:id', async (req, res, next) => {
    try{
        const { id } = req.params;
        const product = await Product.findById(id)
        if (!product) {
            throw new AppError('Product not found', 404);
        }
        res.render('products/details', { product });
    } catch (err) {
        next(err);
    }
});

// Show form to edit a product
app.get('/products/:id/edit', async (req, res, next) => {
    try{
        const { id } = req.params;
        const product = await Product.findById(id);
        if (!product) {
            throw new AppError('Product not found', 404);
        }
        res.render('products/edit', { product, categories });
    } catch(err){
        next(err);
    }   
});

// Update a product
app.put('/products/:id', async (req, res, next) => {
    try{
        const { id } = req.params;
        await Product.findByIdAndUpdate(id, req.body, { runValidators: true, new: true });
        res.redirect(`/products/${id}`);
    } catch (err){
        next(err);
    }
});

// Delete a product
app.delete('/products/:id', async (req, res, next) => {
    try{
        const { id } = req.params;
        await Product.findByIdAndDelete(id);
        res.redirect('/products');
    } catch(err){
        next(err);
    }
});

// Custom error handling middleware for validation errors
const handleValidationErr = (err) => {
    const messages = Object.values(err.errors).map(e => e.message).join(', ');
    return new AppError(messages, 400);
}

// Custom error handling middleware for cast errors
const handleCastErr = (err) => {
    console.dir(err);
    return err;
}

// Middleware to handle validation errors
app.use((err, req, res, next) => {
    console.log(err.name);

    if(err.name === 'ValidationError'){ 
        err = handleValidationErr(err);
    }

    if(err.name === 'CastError') { 
        err = handleCastErr(err);
        return res.status(400).send('Invalid ID format!');
    }

    const { status = 500, message = 'Something went wrong!'} = err;
    res.status(status).send(message);
})

app.listen(3000, () => {
    console.log('App is listening on port 3000');
});
