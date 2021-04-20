import * as actionTypes from './actionTypes';
import axios from 'axios';

export const setRestaurants = (newRestaurants) => {
	return (dispatch) =>
		dispatch({
			type: actionTypes.SET_RESTAURANTS,
			payload: newRestaurants,
		});
};

export const initRestaurants = () => {
	return (dispatch) => {
		axios
			.get('http://localhost:5000/restaurants')
			.then((response) => {
				dispatch({
					type: actionTypes.SET_RESTAURANTS,
					payload: response.data,
				});
			})
			.catch((err) => dispatch({ type: actionTypes.SET_ERROR, payload: err }));
	};
};

export const addRestaurant = (restaurantDetails) => {
	restaurantDetails.rating = parseInt(restaurantDetails.rating);
	console.log('restaurantDetails', restaurantDetails);
	return (dispatch) => {
		axios({ method: 'post', url: 'http://localhost:5000/restaurants/add', data: restaurantDetails })
			.then((response) => {
				dispatch({
					type: actionTypes.ADD_RESTAURANT,
					payload: response.data,
				});
			})
			.catch((err) => dispatch({ type: actionTypes.SET_ERROR, payload: err }));
	};
};
