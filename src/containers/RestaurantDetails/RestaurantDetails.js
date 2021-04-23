import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

const RestaurantDetails = ({ restaurants, restaurant, onGetRestaurantById }) => {
	const { id } = useParams();
	const [restaurantDetails, setRestaurantDetails] = useState();

	useEffect(() => {
		if (!restaurants && !restaurant) {
			onGetRestaurantById(id).then((res) => {
				setRestaurantDetails(res);
			});
			return;
		}

		restaurants
			? setRestaurantDetails(restaurants.find((restaurant) => restaurant._id === id))
			: setRestaurantDetails(restaurant);
	}, [id, onGetRestaurantById, restaurant, restaurants]);

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
		onGetRestaurantById: (id) =>
			new Promise((resolve, reject) => dispatch(actions.getRestaurantById(id, resolve, reject))),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(RestaurantDetails);
