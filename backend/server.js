const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const url = process.env.ATLAS_URL;
mongoose.connect(url, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true });
const connection = mongoose.connection;
connection.once('open', () => {
	console.log('MongoDB database connection established successfully');
});

// simple route
app.get('/', (req, res) => {
	res.json({ message: 'ExpressJS server is running.' });
});

const restaurantsRouter = require('./routes/restaurants');
const restaurantDetailsRouter = require('./routes/restaurants');
const usersRouter = require('./routes/users');

app.use('/restaurants', restaurantsRouter);
app.use('/restaurantDetails', restaurantDetailsRouter);
app.use('/users', usersRouter);

// set port, listen for requests
app.listen(port, () => {
	console.log(`Server is running on port ${port}.`);
});
