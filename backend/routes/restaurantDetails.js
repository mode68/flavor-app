const router = require('express').Router();
let RestaurantDetails = require('../models/restaurantDetails.model');

router.route('/').get((req, res) => {
	RestaurantDetails.find()
		.then((restaurantDetails) => res.json(restaurantDetails))
		.catch((err) => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
	const restaurantDetails = {
		_id: req.body._id,
		title: req.body.title,
		address: req.body.address,
		priceMin: Number(req.body.priceMin),
		priceMax: Number(req.body.priceMax),
		rating: Number(req.body.rating),
		description: req.body.description,
		cuisineTags: req.body.cuisineTags,
		workHours: req.body.workHours,
		coordinates: req.body.coordinates,
		telephone: req.body.telephone,
		website: req.body.website,
		paymentMethod: req.body.paymentMethod,
		nearestStation: req.body.nearestStation,

		numberOfSeats: Number(req.body.numberOfSeats),
		privateDiningRooms: req.body.privateDiningRooms,
		sportsTV: req.body.sportsTV,
		fussball: req.body.fussball,
		darts: req.body.darts,
		gamingConsole: req.body.gamingConsole,
		freeWifi: req.body.freeWifi,
		paidWifi: req.body.paidWifi,
		karaoke: req.body.karaoke,
		outdoorTerraceSeating: req.body.outdoorTerraceSeating,
		counterSeating: req.body.counterSeating,
		wheelchairSpace: req.body.wheelchairSpace,
		parkingLot: req.body.parkingLot,

		vegetarianFriendly: req.body.vegetarianFriendly,
		veganFriendly: req.body.veganFriendly,
		allergyLabeled: req.body.allergyLabeled,
		allYouCanDrinkMenu: req.body.allYouCanDrinkMenu,
		allYouCanEatMenu: req.body.allYouCanEatMenu,
		courses: req.body.courses,
		reservations: req.body.reservations,
		takeOut: req.body.takeOut,
		occassion: req.body.occassion,
		withChildren: req.body.withChildren,
		withPets: req.body.withPets,
		additionalRemarks: req.body.additionalRemarks,
	};

	const newRestaurantDetails = new RestaurantDetails(restaurantDetails);

	newRestaurantDetails
		.save()
		.then((savedRestaurantDetails) => res.json(savedRestaurantDetails))
		.catch((err) => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
	RestaurantDetails.findById(req.params.id)
		.then((restaurantDetails) => res.json(restaurantDetails))
		.catch((err) => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
	RestaurantDetails.findByIdAndDelete(req.params.id)
		.then(() => res.json('Restaurant details deleted.'))
		.catch((err) => res.status(400).json('Error: ' + err));
});

router.route('/updateWhole/:id').post((req, res) => {
	RestaurantDetails.findById(req.params.id)
		.then((restaurantDetails) => {
			restaurantDetails.title = req.body.title ? req.body.title : restaurantDetails.title;
			restaurantDetails.address = req.body.address ? req.body.address : restaurantDetails.address;
			restaurantDetails.priceMin = req.body.priceMin ? Number(req.body.priceMin) : restaurantDetails.priceMin;
			restaurantDetails.priceMax = req.body.priceMax ? Number(req.body.priceMax) : restaurantDetails.priceMax;
			restaurantDetails.rating = req.body.rating ? Number(req.body.rating) : restaurantDetails.rating;
			restaurantDetails.description = req.body.description ? req.body.description : restaurantDetails.description;
			restaurantDetails.cuisineTags = req.body.cuisineTags ? req.body.cuisineTags : restaurantDetails.cuisineTags;

			restaurantDetails.coordinates = req.body.coordinates ? req.body.coordinates : restaurantDetails.coordinates;
			restaurantDetails.workHours = req.body.workHours ? req.body.workHours : restaurantDetails.workHours;
			restaurantDetails.telephone = req.body.telephone ? req.body.telephone : restaurantDetails.telephone;
			restaurantDetails.website = req.body.website ? req.body.website : restaurantDetails.website;
			restaurantDetails.paymentMethod = req.body.paymentMethod
				? req.body.paymentMethod
				: restaurantDetails.paymentMethod;
			restaurantDetails.nearestStation = req.body.nearestStation
				? req.body.nearestStation
				: restaurantDetails.nearestStation;

			restaurantDetails.numberOfSeats = req.body.numberOfSeats
				? Number(req.body.numberOfSeats)
				: restaurantDetails.numberOfSeats;
			restaurantDetails.privateDiningRooms =
				req.body.privateDiningRooms !== null
					? req.body.privateDiningRooms
					: restaurantDetails.privateDiningRooms;
			restaurantDetails.sportsTV = req.body.sportsTV !== null ? req.body.sportsTV : restaurantDetails.sportsTV;
			restaurantDetails.fussball = req.body.fussball !== null ? req.body.fussball : restaurantDetails.fussball;
			restaurantDetails.darts = req.body.darts !== null ? req.body.darts : restaurantDetails.darts;
			restaurantDetails.gamingConsole =
				req.body.gamingConsole !== null ? req.body.gamingConsole : restaurantDetails.gamingConsole;
			restaurantDetails.freeWifi = req.body.freeWifi !== null ? req.body.freeWifi : restaurantDetails.freeWifi;
			restaurantDetails.paidWifi = req.body.paidWifi !== null ? req.body.paidWifi : restaurantDetails.paidWifi;
			restaurantDetails.karaoke = req.body.karaoke !== null ? req.body.karaoke : restaurantDetails.karaoke;
			restaurantDetails.outdoorTerraceSeating =
				req.body.outdoorTerraceSeating !== null
					? req.body.outdoorTerraceSeating
					: restaurantDetails.outdoorTerraceSeating;
			restaurantDetails.counterSeating =
				req.body.counterSeating !== null ? req.body.counterSeating : restaurantDetails.counterSeating;
			restaurantDetails.wheelchairSpace =
				req.body.wheelchairSpace !== null ? req.body.wheelchairSpace : restaurantDetails.wheelchairSpace;
			restaurantDetails.parkingLot =
				req.body.parkingLot !== null ? req.body.parkingLot : restaurantDetails.parkingLot;

			restaurantDetails.vegetarianFriendly =
				req.body.vegetarianFriendly !== null
					? req.body.vegetarianFriendly
					: restaurantDetails.vegetarianFriendly;
			restaurantDetails.veganFriendly =
				req.body.veganFriendly !== null ? req.body.veganFriendly : restaurantDetails.veganFriendly;
			restaurantDetails.allergyLabeled =
				req.body.allergyLabeled !== null ? req.body.allergyLabeled : restaurantDetails.allergyLabeled;
			restaurantDetails.allYouCanDrinkMenu =
				req.body.allYouCanDrinkMenu !== null
					? req.body.allYouCanDrinkMenu
					: restaurantDetails.allYouCanDrinkMenu;
			restaurantDetails.allYouCanEatMenu =
				req.body.allYouCanEatMenu !== null ? req.body.allYouCanEatMenu : restaurantDetails.allYouCanEatMenu;
			restaurantDetails.courses = req.body.courses !== null ? req.body.courses : restaurantDetails.courses;
			restaurantDetails.reservations = req.body.reservations
				? req.body.reservations
				: restaurantDetails.reservations;
			restaurantDetails.takeOut = req.body.takeOut !== null ? req.body.takeOut : restaurantDetails.takeOut;
			restaurantDetails.occassion = req.body.occassion ? req.body.occassion : restaurantDetails.occassion;
			restaurantDetails.withChildren = req.body.withChildren
				? req.body.withChildren
				: restaurantDetails.withChildren;
			restaurantDetails.withPets = req.body.withPets !== null ? req.body.withPets : restaurantDetails.withPets;
			restaurantDetails.additionalRemarks = req.body.additionalRemarks
				? req.body.additionalRemarks
				: restaurantDetails.additionalRemarks;
			restaurantDetails
				.save()
				.then(() => res.json('Restaurant details updated!'))
				.catch((err) => res.status(400).json('Error: ' + err));
		})
		.catch((err) => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
	RestaurantDetails.findByIdAndUpdate(req.params.id, req.body)
		.then(() => res.json('Restaurant details were updated!'))
		.catch((err) => res.status(400).json('Error: ' + err));
});

const filterParseToQuery = (details, namePath = null) => {
	let queryArray = [];
	Object.keys(details).map((key) => {
		const detailValue = details[key];
		const detailName = namePath ? namePath + '.' + key : key;
		if (typeof detailValue === 'object') {
			if ('length' in detailValue) {
				if (detailValue.length !== 0) {
					queryArray.push({ [detailName]: detailValue });
				}
			} else {
				queryArray = queryArray.concat(filterParseToQuery(detailValue, detailName));
			}
		} else if (typeof detailValue === 'boolean' && detailValue) {
			queryArray.push({ [detailName]: true });
		} else if (typeof detailValue === 'number') {
			queryArray.push({ [detailName]: { $gte: detailValue } });
		} else if (typeof detailValue === 'string' && detailValue !== '') {
			queryArray.push({ [detailName]: detailValue });
		}
	});
	return queryArray;
};

router.route('/filter').post((req, res) => {
	const query = {
		$and: filterParseToQuery(req.body),
	};
	RestaurantDetails.find(query, '_id')
		.then((restaurantDetails) => res.json(restaurantDetails))
		.catch((err) => res.status(400).json('Error: ' + err));
});

module.exports = router;
