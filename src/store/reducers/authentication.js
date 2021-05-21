import * as actionTypes from '../actions/actionTypes';

const initialState = {
	user: null,
	error: '',
	token: null,
	loading: false,
	authenticated: false,
};

const addUser = (state, action) => {
	return { ...state, user: action.payload };
};

const loginUser = (state, action) => {
	return { ...state, user: action.payload, isAuthenticated: true, error: '' };
};

const logoutUser = (state, action) => {
	return { ...state, user: null, isAuthenticated: false, error: '' };
};

const setError = (state, action) => {
	return { ...state, error: action.payload };
};

const clearError = (state, action) => {
	return { ...state, error: '' };
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.ADD_USER:
			return addUser(state, action);
		case actionTypes.LOGIN_USER:
			return loginUser(state, action);
		case actionTypes.LOGOUT_USER:
			return logoutUser(state, action);
		case actionTypes.SET_AUTH_ERROR:
			return setError(state, action);
		case actionTypes.CLEAR_AUTH_ERROR:
			return clearError(state, action);
		default:
			return state;
	}
};

export default reducer;
