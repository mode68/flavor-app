import * as actionTypes from '../actions/actionTypes';

const initialState = {
	restaurant: null,
	restaurants: null,
	filteredRestaurants: null,
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

const addRestaurant = (state, action) => {
	return { ...state, restaurants: [...state.restaurants, action.payload] };
};

const getRestaurantById = (state, action) => {
	return { ...state, restaurant: action.payload };
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
		case actionTypes.SET_ERROR:
			return setError(state, action);
		default:
			return state;
	}
};

export default reducer;
