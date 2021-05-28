import React from 'react';
import * as actions from '../../store/actions/index';
import * as classes from './Navigation.module.css';
import Nav from 'react-bootstrap/Nav';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

const Navigation = ({ isAuthenticated, user, onUserLogout }) => {
	const callUserRoot = () => {
		axios({ method: 'post', url: 'http://localhost:5000/user/checkauth', withCredentials: true })
			.then((response) => {
				console.log(response);
			})
			.catch((err) => {
				console.error(err);
			});
	};

	return (
		<Nav variant='pills' defaultActiveKey='/'>
			<Nav.Item className={classes.NavigationItem}>
				<NavLink to='/'>Restaurants</NavLink>
			</Nav.Item>
			<Nav.Item className={classes.NavigationItem}>
				<NavLink to='/add-restaurant'>Add Restaurant</NavLink>
			</Nav.Item>
			<Button variant='outline-primary' onClick={onUserLogout}>
				Logout
			</Button>
			<Button variant='outline-primary' onClick={callUserRoot}>
				user/
			</Button>
			{isAuthenticated ? (
				<div>
					<div>
						Welcome {user.firstName} {user.lastName}!
					</div>
				</div>
			) : (
				<Nav.Item className={classes.NavigationItem}>
					<NavLink to='/login'>Login</NavLink>
				</Nav.Item>
			)}
		</Nav>
	);
};

const mapStateToProps = (state) => {
	return {
		user: state.authentication.user,
		isAuthenticated: state.authentication.isAuthenticated,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onUserLogout: () => dispatch(actions.logoutUser()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
