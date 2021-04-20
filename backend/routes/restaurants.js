const router = require('express').Router();
let Restaurant = require('../models/restaurant.model');

router.route('/').get((req, res) => {
	Restaurant.find()
		.then((restaurants) => res.json(restaurants))
		.catch((err) => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
	const restaurant = {
		title: req.body.title,
		address: req.body.address,
		priceMin: Number(req.body.priceMin),
		priceMax: Number(req.body.priceMax),
		rating: Number(req.body.rating),
		description: req.body.description,
	};

	// const newRestaurant = new Restaurant({ title, address, rating, description });
	const newRestaurant = new Restaurant(restaurant);

	newRestaurant
		.save()
		.then((savedRestaurant) => res.json(savedRestaurant))
		.catch((err) => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
	Restaurant.findById(req.params.id)
		.then((restaurant) => res.json(restaurant))
		.catch((err) => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
	Restaurant.findByIdAndDelete(req.params.id)
		.then(() => res.json('Restaurant deleted.'))
		.catch((err) => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
	Restaurant.findById(req.params.id)
		.then((restaurant) => {
			restaurant.title = req.body.title;
			restaurant.address = req.body.address;
			restaurant.priceMin = req.body.priceMin;
			restaurant.priceMax = req.body.priceMax;
			restaurant.rating = Number(req.body.rating);
			restaurant.description = req.body.description;

			restaurant
				.save()
				.then(() => res.json('Restaurant updated!'))
				.catch((err) => res.status(400).json('Error: ' + err));
		})
		.catch((err) => res.status(400).json('Error: ' + err));
});

module.exports = router;
