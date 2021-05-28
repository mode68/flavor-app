import React, { useEffect, useState } from 'react';
import * as actions from '../../../store/actions/index';
import Nav from 'react-bootstrap/Nav';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button';

const LoginWidget = ({ authenticated, user, onUserLogout, onIsAuthenticated }) => {
	const [isAuth, setIsAuth] = useState(false);
	useEffect(() => {
		onIsAuthenticated();
	}, [onIsAuthenticated]);

	return (
		<div>
			{authenticated ? (
				<div>
					<div>
						Welcome {user.firstName} {user.lastName}!
					</div>
					<Button variant='outline-primary' onClick={onUserLogout}>
						Logout
					</Button>
				</div>
			) : (
				<Nav.Item>
					<NavLink to='/login'>Login</NavLink>
				</Nav.Item>
			)}
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		user: state.authentication.user,
		authenticated: state.authentication.authenticated,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onUserLogout: () => dispatch(actions.logoutUser()),
		onIsAuthenticated: () => dispatch(actions.isAuthenticated()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginWidget);
