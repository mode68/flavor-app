import * as actionTypes from '../actions/actionTypes';

const initialState = {
	restaurants: null,
};

const initRestaurants = (state, action) => {
	const updatedRestaurants = [
		{
			id: 'id1',
			title: 'Restaurant ICHI',
			description: 'This is the first restaurant',
		},
		{
			id: 'id2',
			title: 'Restaurant NI',
			description: 'This is the second restaurant',
		},
	];
	return { restaurants: updatedRestaurants };
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.INIT_RESTAURANTS:
			return initRestaurants(state, action);
		default:
			return state;
	}
};

export default reducer;
