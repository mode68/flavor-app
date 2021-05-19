const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const restaurantDetailsSchema = new Schema(
	{
		title: { type: String, required: true },
		address: { type: String, required: true },
		rating: { type: Number, required: true },
		priceMin: { type: Number, required: true },
		priceMax: { type: Number, required: true },
		description: { type: String, required: false },
		cuisineTags: { type: Array, required: true },
		telephone: { type: String, required: false },
		website: { type: String, required: false },
		coordinates: { type: Object, required: false },
		paymentMethod: { type: Object, required: true },
		nearestStation: { type: String, required: false },
		workHours: { type: Array, required: true },

		numberOfSeats: { type: Number, required: true },
		privateDiningRooms: { type: Boolean, required: false },
		sportsTV: { type: Boolean, required: false },
		fussball: { type: Boolean, required: false },
		darts: { type: Boolean, required: false },
		gamingConsole: { type: Boolean, required: false },
		freeWifi: { type: Boolean, required: false },
		paidWifi: { type: Boolean, required: false },
		karaoke: { type: Boolean, required: false },
		outdoorTerraceSeating: { type: Boolean, required: false },
		counterSeating: { type: Boolean, required: false },
		wheelchairSpace: { type: Boolean, required: false },
		parkingLot: { type: Boolean, required: false },

		vegetarianFriendly: { type: Boolean, required: false },
		veganFriendly: { type: Boolean, required: false },
		allergyLabeled: { type: Boolean, required: false },
		allYouCanDrinkMenu: { type: Boolean, required: false },
		allYouCanEatMenu: { type: Boolean, required: false },
		courses: { type: Boolean, required: false },
		reservations: { type: String, required: false },
		takeOut: { type: Boolean, required: false },
		occassion: { type: Object, required: false },
		withChildren: { type: Object, required: false },
		withPets: { type: Boolean, required: false },
		additionalRemarks: { type: String, required: false },
	},

	{
		timestamps: true,
	}
);

const RestaurantDetails = mongoose.model('RestaurantDetails', restaurantDetailsSchema);

module.exports = RestaurantDetails;
