const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const restaurantSchema = new Schema(
	{
		title: { type: String, required: true },
		address: { type: String, required: true },
		rating: { type: Number, required: true },
		description: { type: String, required: true },
	},
	{
		timestamps: true,
	}
);

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

module.exports = Restaurant;