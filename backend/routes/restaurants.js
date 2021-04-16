const router = require('express').Router();
let Restaurant = require('../models/restaurant.model');

router.route('/').get((req, res) => {
	Restaurant.find()
		.then((restaurants) => res.json(restaurants))
		.catch((err) => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
	const title = req.body.title;
	const address = req.body.address;
	const rating = Number(req.body.rating);
	const description = req.body.description;

	const newRestaurant = new Restaurant({ title, address, rating, description });

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
