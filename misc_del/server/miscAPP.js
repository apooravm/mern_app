const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();

// Importing routes

mongoose
	.connect(process.env.MONGO_URL)
	.then(() => {
		console.log("Connected to DB!");
	})
	.catch((err) => {
		console.log(err);
	})

app.use(express.static("./public"));

// Parse URL encoded data
app.use(express.urlencoded({ extended: false }))
app.use(express.json());

app.get('/newfile', (req, res) => {
	res.sendFile(__dirname + '/content/index.html', (err) => {
		console.log(err);
	});
})

app.post('/getInfo', (req, res) => {
	// console.log(req.body)
	// res.send(`Input was ${req.body.inputValue}`);
	console.log(req.body);
	res.status(200).end();
})

const port = process.env.PORT || 3000
app.listen(port, () => {
	console.log(`Server live on https://localhost:${port}`);
})
