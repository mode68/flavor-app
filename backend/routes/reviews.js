const router = require('express').Router();
let Review = require('../models/review.model');
let mongoose = require('mongoose');
const isAuth = require('../authMiddleware').isAuth;

router.route('/').get((req, res) => {
	Review.find()
		.then((reviews) => res.json(reviews))
		.catch((err) => res.status(400).json('Error: ' + err));
});

router.post('/add', isAuth, (req, res) => {
	const review = {
		reviewAuthorId: mongoose.Types.ObjectId(req.body.reviewAuthorId),
		reviewAuthorFirstName: req.body.reviewAuthorFirstName,
		reviewAuthorLastName: req.body.reviewAuthorLastName,
		restaurantId: mongoose.Types.ObjectId(req.body.restaurantId),
		overallScore: Number(req.body.scores.overall.score),
		foodScore: Number(req.body.scores.food.score),
		serviceScore: Number(req.body.scores.service.score),
		atmosphereScore: Number(req.body.scores.atmosphere.score),
		drinksScore: Number(req.body.scores.drinks.score),
		costPerformanceScore: Number(req.body.scores.costPerformance.score),
		moneySpent: Number(req.body.moneySpent),
		dateOfVisit: Date(req.body.dateOfVisit),
		title: req.body.title,
		review: req.body.review,
	};

	const newReview = new Review(review);

	newReview
		.save()
		.then((savedReview) => res.json(savedReview))
		.catch((err) => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
	Review.find({ restaurantId: req.params.id })
		.then((reviews) => res.json(reviews))
		.catch((err) => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
	Review.findByIdAndDelete(req.params.id)
		.then(() => res.json('Review deleted.'))
		.catch((err) => res.status(400).json('Error: ' + err));
});

router.route('/set/:id').post((req, res) => {
	Review.findById(req.params.id)
		.then((review) => {
			review.title = req.body.title;
			review.review = req.body.address;
			review.overallScore = Number(req.body.scores.overallScore);
			review.foodScore = Number(req.body.scores.foodScore);
			review.serviceScore = Number(req.body.scores.serviceScore);
			review.atmosphereScore = Number(req.body.scores.atmosphereScore);
			review.drinksScore = Number(req.body.scores.drinksScore);
			review.costPerformanceScore = Number(req.body.scores.costPerformanceScore);
			review.moneySpent = req.body.moneySpent;
			review.dateOfVisit = req.body.dateOfVisit;

			review
				.save()
				.then(() => res.json('Resview set!'))
				.catch((err) => res.status(400).json('Error: ' + err));
		})
		.catch((err) => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
	Review.findByIdAndUpdate(req.params.id, req.body)
		.then(() => res.json('Review was updated!'))
		.catch((err) => res.status(400).json('Error: ' + err));
});

module.exports = router;
