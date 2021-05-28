import * as actionTypes from './actionTypes';
import axios from '../../axiosConfig';

export const addUser = (user) => {
	return (dispatch) =>
		axios({ method: 'post', url: '/user/register', data: user, withCredentials: true })
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
		axios({ method: 'post', url: '/user/login', data: user, withCredentials: true })
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
		axios({ method: 'get', url: '/user/logout' })
			.then((response) => {
				dispatch({
					type: response.data.success ? actionTypes.LOGOUT_USER : actionTypes.SET_AUTH_ERROR,
					payload: response.data.message,
				});
			})
			.catch((err) => dispatch({ type: actionTypes.SET_AUTH_ERROR, payload: err }));
};

export const isAuthenticated = () => {
	return (dispatch) =>
		axios({ method: 'get', url: '/user/is-authenticated', withCredentials: true })
			.then((response) => {
				dispatch({
					type: actionTypes.IS_AUTHENTICATED,
					payload: response.data,
				});
			})
			.catch((err) => {
				dispatch({ type: actionTypes.SET_AUTH_ERROR, payload: err });
			});
};

export const clearAuthError = () => {
	return (dispatch) =>
		dispatch({
			type: actionTypes.CLEAR_AUTH_ERROR,
		});
};
