import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import * as classes from './RestaurantFilter.module.css';
import * as actions from '../../store/actions/index';
import RestaurantCard from '../../components/RestaurantCard/RestaurantCard';
import SearchBar from '../../components/SearchBar/SearchBar';

const RestaurantFilter = (props) => {
	const [searchValue, setSearchValue] = useState('');
	const onInitRestaurants = props.onInitRestaurants;
	useEffect(() => {
		onInitRestaurants();
	}, [onInitRestaurants]);

	const filteredByNameRestaurants = props.restaurants.filter((restaurant) => {
		return restaurant.title.toLowerCase().includes(searchValue.toLowerCase());
	});

	const restaurantCards = props.restaurants
		? filteredByNameRestaurants.map((restaurant) => (
				<RestaurantCard
					key={restaurant._id}
					title={restaurant.title}
					description={restaurant.description}
					rating={restaurant.rating}
				/>
		  ))
		: null;

	return (
		<div>
			<br />
			<SearchBar value={searchValue} onChange={setSearchValue} />
			<br />
			<div className={classes.Restaurants}>{restaurantCards}</div>
		</div>
	);
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
