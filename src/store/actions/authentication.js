import * as actionTypes from './actionTypes';
import axios from 'axios';

export const addUser = (user) => {
	console.log('addUser', user);
	return (dispatch) =>
		axios({ method: 'post', url: 'http://localhost:5000/user/register', data: user, withCredentials: true })
			.then((response) => {
				dispatch({
					type: actionTypes.ADD_USER,
					payload: response.data,
				});
			})
			.catch((err) => dispatch({ type: actionTypes.SET_AUTH_ERROR, payload: err }));
};

export const loginUser = (user) => {
	return (dispatch) =>
		axios({ method: 'post', url: 'http://localhost:5000/user/login', data: user, withCredentials: true })
			.then((response) => {
				dispatch({
					type: actionTypes.LOGIN_USER,
					payload: response.data,
				});
			})
			.catch((err) => dispatch({ type: actionTypes.SET_AUTH_ERROR, payload: err }));
};
