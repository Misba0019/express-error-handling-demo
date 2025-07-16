# ⚠️ Express Error Handling Demo

A beginner-friendly learning project that demonstrates how to handle common backend errors in an **Express.js** application using **custom middleware**, a **reusable error class**, and **Mongoose**.

Built around a simple product CRUD system, this app is designed to help you understand how to catch and respond to different types of errors gracefully in a full-stack Node.js environment.

---

## Features

- Full CRUD operations for products
- Filter products by category
- Mongoose model validation
- Custom error class (`AppError`)
- Centralized error-handling middleware
- Handles:
  - Invalid MongoDB ObjectIDs (`CastError`)
  - Mongoose validation errors (`ValidationError`)
  - Non-existent documents (404)
- Clean UI using EJS + Bootstrap

---

## Routes & App Flow

- **GET** `/products` – View all or filter by category
- **GET** `/products/new` – Show form to add a product
- **POST** `/products` – Create a new product
- **GET** `/products/:id` – View details of a product
- **GET** `/products/:id/edit` – Show edit form 
- **PUT** `/products/:id` – Update a product
- **DELETE** `/products/:id` – Delete a product

---

## Technologies Used

- Node.js
- Express.js
- MongoDB & Mongoose
- EJS
- Bootstrap 5
- Method-Override

---

## Error Handling Examples

This project demonstrates how to handle common Express + Mongoose errors:

---

### 1. Invalid MongoDB ID (`CastError`)

**Try:**  
`/products/123abc`

**Response:**  
`Invalid ID format!`

---

### 2. Validation Error (`ValidationError`)

**Trigger:**  
Submit the form with missing or invalid fields (e.g., blank name or negative price).

**Response:**  
`Validation Error :- Product name is required`

---

### 3. Missing Document (`404 Not Found`)

**Try:**  
`/products/64a5fc328f7de00000000000` (valid ID format, but not in DB)

**Response:**  
`Product not found`

---

## Getting Started

### 1. Install Dependencies
```bash
npm install
```
### 2. Start MongoDB
Make sure MongoDB is running on your machine:
```bash
mongosh
```
### 3. (Optional) Seed the Database
To populate your database with your sample products, uncomment the seedProducts array in seeds.js, then run:
```bash
node seeds.js
```
### 4. Start the Server
```bash
nodemon index.js
```
Visit the app at:
[http://localhost:3000/products](http://localhost:3000/products)

---

## Feedback

If you like this project, consider starring the repo to show your support!

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details