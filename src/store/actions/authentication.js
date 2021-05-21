import * as actionTypes from './actionTypes';
import axios from 'axios';

export const addUser = (user) => {
	return (dispatch) =>
		axios({ method: 'post', url: 'http://localhost:5000/user/register', data: user, withCredentials: true })
			.then((response) => {
				dispatch({
					type: response.data.success ? actionTypes.ADD_USER : actionTypes.SET_AUTH_ERROR,
					payload: response.data.message,
				});
			})
			.catch((err) => dispatch({ type: actionTypes.SET_AUTH_ERROR, payload: err }));
};

export const loginUser = (user) => {
	return (dispatch) =>
		axios({ method: 'post', url: 'http://localhost:5000/user/login', data: user, withCredentials: true })
			.then((response) => {
				response.data.success
					? dispatch({
							type: actionTypes.LOGIN_USER,
							payload: response.data.user,
					  })
					: dispatch({
							type: actionTypes.SET_AUTH_ERROR,
							payload: response.data.message,
					  });
			})
			.catch((err) => {
				dispatch({ type: actionTypes.SET_AUTH_ERROR, payload: err });
			});
};

export const logoutUser = (user) => {
	return (dispatch) =>
		axios({ method: 'get', url: 'http://localhost:5000/user/logout' })
			.then((response) => {
				dispatch({
					type: response.data.success ? actionTypes.LOGOUT_USER : actionTypes.SET_AUTH_ERROR,
					payload: response.data.message,
				});
			})
			.catch((err) => dispatch({ type: actionTypes.SET_AUTH_ERROR, payload: err }));
};

export const clearAuthError = () => {
	return (dispatch) =>
		dispatch({
			type: actionTypes.CLEAR_AUTH_ERROR,
		});
};
