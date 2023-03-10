const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');

mongoose.set('strictQuery', true);

app.use(express.json());
app.use(cors());

// Importing routes
const userRoute = require('./routes/user');
const authRoute = require('./routes/auth');
const productRoute = require('./routes/product');
const cartRoute = require('./routes/cart');
const orderRoute = require('./routes/order');

mongoose
	.connect(process.env.MONGO_URL)
	.then(() => {
		console.log("Connected to DB!");
	})
	.catch((err) => {
		console.log(err);
	})

// /api/user/userTest 
app.use('/api/user', userRoute);

app.use('/api/auth', authRoute);

app.use('/api/product', productRoute);

app.use('/api/cart', cartRoute);

app.use('/api/order', orderRoute);

const port = process.env.PORT || 3000
app.listen(port, () => {
	console.log(`Server live on https://localhost:${port}`);
})