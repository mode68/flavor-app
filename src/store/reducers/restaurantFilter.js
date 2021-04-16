import * as actionTypes from '../actions/actionTypes';

const initialState = {
	restaurants: null,
	error: '',
};

const setError = (state, action) => {
	return { ...state, error: action.payload };
};

const setRestaurants = (state, action) => {
	return { ...state, restaurants: action.payload };
};

const addRestaurant = (state, action) => {
	return { ...state, restaurants: [...state.restaurants, action.payload] };
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.SET_RESTAURANTS:
			return setRestaurants(state, action);
		case actionTypes.ADD_RESTAURANT:
			return addRestaurant(state, action);
		case actionTypes.SET_ERROR:
			return setError(state, action);
		default:
			return state;
	}
};

export default reducer;
