const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const restaurantSchema = new Schema(
	{
		title: { type: String, required: true },
		address: { type: String, required: true },
		rating: { type: Number, required: true },
		priceMin: { type: Number, required: true },
		priceMax: { type: Number, required: true },
		description: { type: String, required: true },
		cuisineTags: { type: Array, required: true },
	},
	{
		timestamps: true,
	}
);

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

module.exports = Restaurant;
