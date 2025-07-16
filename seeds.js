const mongoose = require('mongoose');
const Product = require('./models/product');

mongoose.connect('mongodb://127.0.0.1:27017/farmStand2')
    .then(() => {
        console.log("MongoDB connected successfully!");
    })
    .catch(err => {
        console.log("Oops! MongoDB connection failed!", err);
    });

// const seedProducts = [
//     { name: 'Kashmiri Apple', price: 3.5, category: 'fruit' },
//     { name: 'Banana', price: 1.0, category: 'fruit' },
//     { name: 'Carrot', price: 0.5, category: 'vegetable' },
//     { name: 'Broccoli', price: 2.0, category: 'vegetable' },
//     { name: 'Chocolate Milk', price: 3.0, category: 'dairy' },
//     { name: 'Blue Cheese', price: 4.0, category: 'dairy'}
// ];

Product.insertMany(seedProducts)
    .then(res => {
        console.log("Seed data inserted successfully!");
        console.log(res);
    })
    .catch(err => {
        console.log("Error inserting seed data:", err);
    })
    .finally(() => {
        mongoose.connection.close();
    });