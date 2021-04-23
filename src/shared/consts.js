export const PRICE_RANGE_MIN = 0;
export const PRICE_RANGE_MAX = 20;

export const ORDER_STANDARD = 'Standard';
export const ORDER_CHEAPEST = 'Cheapest first';
export const ORDER_BEST_RATING = 'Highest rated first';

export const CUISINE_ID_TITLE_MAP = {
	japanesecuisine: 'Japanese Cuisine',
	japanesecuisine_ramen: 'Ramen',
	japanesecuisine_yakiniku: 'Yakiniku',

	italiancuisine: 'Italian Cuisine',
	italiancuisine_pizza: 'Pizza',
	italiancuisine_lasagna: 'Lasagna',

	westerncuisine: 'Western Cuisine',
	westerncuisine_burgers: 'Burgers',

	sandwiches: 'Sandwiches',

	soups: 'Soups',
};

export const lowestPriceSort = (a, b) => {
	const aPrice = (a.priceMin + a.priceMax) / 2;
	const bPrice = (b.priceMin + b.priceMax) / 2;
	return aPrice < bPrice ? -1 : aPrice > bPrice ? 1 : 0;
};

export const bestRatingSort = (a, b) => {
	return a.rating > b.rating ? -1 : a.rating < b.rating ? 1 : 0;
};
