const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const reviewSchema = new Schema(
	{
		reviewAuthorId: { type: Schema.Types.ObjectId, required: true },
		reviewAuthorFirstName: { type: String, required: true, trim: true },
		reviewAuthorLastName: { type: String, required: true, trim: true },
		restaurantId: { type: Schema.Types.ObjectId, required: true },
		overallScore: { type: Number, required: true },
		foodScore: { type: Number, required: true },
		serviceScore: { type: Number, required: true },
		atmosphereScore: { type: Number, required: true },
		drinksScore: { type: Number, required: true },
		costPerformanceScore: { type: Number, required: true },
		moneySpent: { type: Number, required: true },
		dateOfVisit: { type: Schema.Types.Date, required: true },
		title: { type: String, required: true, trim: true },
		review: { type: String, required: true, trim: true },
	},
	{
		timestamps: true,
	}
);

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
