import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import * as classes from './RestaurantFilter.module.css';
import RestaurantCard from '../../components/RestaurantCard/RestaurantCard';
import * as actions from '../../store/actions/index';

const RestaurantFilter = (props) => {
	const onInitRestaurants = props.onInitRestaurants;
	useEffect(() => {
		onInitRestaurants();
	}, [onInitRestaurants]);

	const restaurantCards = props.restaurants
		? props.restaurants.map((restaurant) => (
				<RestaurantCard key={restaurant.id} title={restaurant.title} description={restaurant.description} />
		  ))
		: null;

	return <div className={classes.Restaurants}>{restaurantCards}</div>;
};

const mapStateToProps = (state) => {
	return {
		restaurants: state.restaurantFilter.restaurants,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onInitRestaurants: () => dispatch(actions.initRestaurants()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(RestaurantFilter);
