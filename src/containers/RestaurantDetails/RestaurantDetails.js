import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

const RestaurantDetails = ({ restaurants, restaurant, onGetRestaurantById }) => {
	const { id } = useParams();
	const [restaurantDetails, setRestaurantDetails] = useState();

	useEffect(() => {
		if (restaurants) {
			setRestaurantDetails(restaurants.find((restaurant) => restaurant._id === id));
		} else if (!restaurant || restaurant._id !== id) {
			onGetRestaurantById(id);
		} else {
			setRestaurantDetails(restaurant);
		}
	}, [restaurant, restaurants, id, onGetRestaurantById]);

	return <div>{restaurantDetails && restaurantDetails.title}</div>;
};

const mapStateToProps = (state) => {
	return {
		restaurants: state.restaurantFilter.restaurants,
		restaurant: state.restaurantFilter.restaurant,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onGetRestaurantById: (id) => dispatch(actions.getRestaurantById(id)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(RestaurantDetails);
