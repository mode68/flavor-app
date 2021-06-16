import * as actionTypes from '../actions/actionTypes';
import { copyObject } from '../../shared/utility';
import { PRICE_RANGE_MIN, PRICE_RANGE_MAX } from '../../shared/consts';
import { stateValueMap } from '../../components/DetailsFilter/DetailsFilterMap';

const initialState = {
	restaurant: null,
	restaurantDetails: null,
	restaurants: null,
	filteredRestaurants: null,
	detailsFilter: stateValueMap,
	reviews: null,
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

const getRestaurantDetailsById = (state, action) => {
	return { ...state, restaurantDetails: action.payload };
};

const setPriceRange = (state, action) => {
	return { ...state, priceRange: action.payload };
};

const addReview = (state, action) => {
	return state;
};

const filterByDetails = (state, action) => {
	return state;
};

const getReviewsById = (state, action) => {
	return { ...state, reviews: action.payload };
};

const getRestaurantsByIdArray = (state, action) => {
	return { ...state, restaurants: action.payload };
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
		case actionTypes.ADD_REVIEW:
			return addReview(state, action);
		case actionTypes.GET_REVIEWS_BY_ID:
			return getReviewsById(state, action);
		case actionTypes.FILTER_BY_DETAILS:
			return filterByDetails(state, action);
		case actionTypes.GET_RESTAURANT_DETAILS_BY_ID:
			return getRestaurantDetailsById(state, action);
		case actionTypes.GET_RESTAURANTS_BY_ID_ARRAY:
			return getRestaurantsByIdArray(state, action);
		case actionTypes.SET_ERROR:
			return setError(state, action);
		default:
			return state;
	}
};

export default reducer;
