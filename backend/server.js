const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');

require('dotenv').config();

// Passport config
require('./passportConfig')(passport);

const app = express();
const port = process.env.PORT || 5000;

app.use(
	cors({
		origin: 'http://localhost:3000',
		credentials: true,
	})
);
app.use(express.json());
app.use(
	session({
		secret: 'ajinohimitsu',
		resave: true,
		saveUninitialized: true,
	})
);

app.use(cookieParser('ajinohimitsu'));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

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
const restaurantDetailsRouter = require('./routes/restaurantDetails');
const userRouter = require('./routes/user');

app.use('/restaurants', restaurantsRouter);
app.use('/restaurantDetails', restaurantDetailsRouter);
app.use('/user', userRouter);

// set port, listen for requests
app.listen(port, () => {
	console.log(`Server is running on port ${port}.`);
});
