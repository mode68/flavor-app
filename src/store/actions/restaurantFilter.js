import * as actionTypes from './actionTypes';
import axios from '../../axiosConfig';

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
			.get('/restaurants')
			.then((response) => {
				dispatch({
					type: actionTypes.INIT_RESTAURANTS,
					payload: response.data,
				});
			})
			.catch((err) => dispatch({ type: actionTypes.SET_ERROR, payload: err }));
	};
};

// TODO: remake into using redux loading state
export const getRestaurantById = (id) => {
	return (dispatch) => {
		axios
			.get('/restaurants/' + id)
			.then((response) => {
				dispatch({
					type: actionTypes.GET_RESTAURANT_BY_ID,
					payload: response.data,
				});
			})
			.catch((err) => {
				dispatch({ type: actionTypes.SET_ERROR, payload: err });
			});
	};
};

export const addRestaurant = (restaurantDetails) => {
	restaurantDetails.rating = parseInt(restaurantDetails.rating);
	return (dispatch) => {
		axios({ method: 'post', url: '/restaurants/add', data: restaurantDetails })
			.then((response) => {
				dispatch({
					type: actionTypes.ADD_RESTAURANT,
					payload: response.data,
				});
			})
			.catch((err) => dispatch({ type: actionTypes.SET_ERROR, payload: err }));
	};
};

export const setCuisine = (cuisine) => {
	return (dispatch) =>
		dispatch({
			type: actionTypes.SET_CUISINE,
			payload: cuisine,
		});
};

export const setPriceRange = (priceRange) => {
	return (dispatch) =>
		dispatch({
			type: actionTypes.SET_PRICE_RANGE,
			payload: priceRange,
		});
};

export const getRestaurantDetailsById = (id) => {
	return (dispatch) => {
		axios
			.get('/restaurantDetails/' + id)
			.then((response) => {
				dispatch({
					type: actionTypes.GET_RESTAURANT_DETAILS_BY_ID,
					payload: response.data,
				});
			})
			.catch((err) => {
				dispatch({ type: actionTypes.SET_ERROR, payload: err });
			});
	};
};

export const addReview = (review) => {
	return (dispatch) => {
		axios({ method: 'post', url: '/reviews/add', data: review, withCredentials: true })
			.then((response) => {
				dispatch({
					type: actionTypes.ADD_REVIEW,
					payload: response.data,
				});
			})
			.catch((err) => dispatch({ type: actionTypes.SET_ERROR, payload: err }));
	};
};

export const getReviewsById = (id) => {
	return (dispatch) => {
		axios
			.get('/reviews/' + id)
			.then((response) => {
				dispatch({
					type: actionTypes.GET_REVIEWS_BY_ID,
					payload: response.data,
				});
			})
			.catch((err) => {
				dispatch({ type: actionTypes.SET_ERROR, payload: err });
			});
	};
};

export const setDetailsFilter = (detailsFilter) => {
	return (dispatch) => {
		axios({ method: 'post', url: '/restaurantDetails/filter', data: detailsFilter })
			.then((response) => {
				dispatch({
					type: actionTypes.FILTER_BY_DETAILS,
				});
				console.log(response);
				// call here - get restaurants by id-array. response.data = [...]
			})
			.catch((err) => dispatch({ type: actionTypes.SET_ERROR, payload: err }));
	};
};
