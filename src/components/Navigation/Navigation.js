import React from 'react';
import * as classes from './Navigation.module.css';
import Nav from 'react-bootstrap/Nav';
import { NavLink } from 'react-router-dom';

const Navigation = () => {
	return (
		<Nav variant='pills' defaultActiveKey='/'>
			<Nav.Item className={classes.NavigationItem}>
				<NavLink to='/'>Restaurants</NavLink>
			</Nav.Item>
			<Nav.Item className={classes.NavigationItem}>
				<NavLink to='/add-restaurant'>Add Restaurant</NavLink>
			</Nav.Item>
		</Nav>
	);
};

export default Navigation;
