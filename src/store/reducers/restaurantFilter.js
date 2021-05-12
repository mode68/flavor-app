import * as actionTypes from '../actions/actionTypes';
import { copyObject } from '../../shared/utility';
import { PRICE_RANGE_MIN, PRICE_RANGE_MAX } from '../../shared/consts';

const initialState = {
	restaurant: null,
	restaurants: null,
	filteredRestaurants: null,
	priceRange: [PRICE_RANGE_MIN, PRICE_RANGE_MAX],
	cuisine: '',
	error: '',
};

const setError = (state, action) => {
	return { ...state, error: action.payload };
};

const initRestaurants = (state, action) => {
	return { ...state, restaurants: action.payload, filteredRestaurants: action.payload };
};

const setRestaurants = (state, action) => {
	return { ...state, filteredRestaurants: action.payload };
};

const setCuisine = (state, action) => {
	return { ...state, cuisine: action.payload };
};

const addRestaurant = (state, action) => {
	let restaurantCopy = copyObject(state.restaurants);
	restaurantCopy.push(action.payload);
	return { ...state, restaurants: restaurantCopy };
};

const getRestaurantById = (state, action) => {
	return { ...state, restaurant: action.payload };
};

const setPriceRange = (state, action) => {
	return { ...state, priceRange: action.payload };
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.INIT_RESTAURANTS:
			return initRestaurants(state, action);
		case actionTypes.SET_RESTAURANTS:
			return setRestaurants(state, action);
		case actionTypes.ADD_RESTAURANT:
			return addRestaurant(state, action);
		case actionTypes.GET_RESTAURANT_BY_ID:
			return getRestaurantById(state, action);
		case actionTypes.SET_CUISINE:
			return setCuisine(state, action);
		case actionTypes.SET_PRICE_RANGE:
			return setPriceRange(state, action);
		case actionTypes.SET_ERROR:
			return setError(state, action);
		default:
			return state;
	}
};

export default reducer;
