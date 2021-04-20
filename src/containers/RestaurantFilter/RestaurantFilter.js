import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import * as classes from './RestaurantFilter.module.css';
import * as actions from '../../store/actions/index';
import RestaurantCard from '../../components/RestaurantCard/RestaurantCard';
import SearchBar from '../../components/SearchBar/SearchBar';
import OrderByDropdown from '../../components/OrderByDropdown/OrderByDropdown';

const lowestPriceSort = (a, b) => {
	const aPrice = (a.priceMin + a.priceMax) / 2;
	const bPrice = (b.priceMin + b.priceMax) / 2;
	return aPrice < bPrice ? -1 : aPrice > bPrice ? 1 : 0;
};

const bestRatingSort = (a, b) => {
	return a.rating > b.rating ? -1 : a.rating < b.rating ? 1 : 0;
};

const RestaurantFilter = (props) => {
	const [searchValue, setSearchValue] = useState('');
	const [selectedOrder, setSelectedOrder] = useState('');

	const onInitRestaurants = props.onInitRestaurants;
	useEffect(() => {
		onInitRestaurants();
	}, [onInitRestaurants]);

	const orderSelectHandler = (newValue) => {
		setSelectedOrder(newValue);
		if (newValue === 'Cheapest first') {
			props.onSetRestaurants(props.restaurants.sort(lowestPriceSort));
		} else if (newValue === 'Highest rated first') {
			props.onSetRestaurants(props.restaurants.sort(bestRatingSort));
		}
	};

	const filteredByNameRestaurants = props.restaurants
		? props.restaurants.filter((restaurant) => {
				return restaurant.title.toLowerCase().includes(searchValue.toLowerCase());
		  })
		: [];

	const restaurantCards = filteredByNameRestaurants.map((restaurant) => (
		<RestaurantCard
			key={restaurant._id}
			title={restaurant.title}
			description={restaurant.description}
			rating={restaurant.rating}
			priceMin={restaurant.priceMin}
			priceMax={restaurant.priceMax}
		/>
	));

	return (
		<div>
			<br />
			<SearchBar value={searchValue} onChange={setSearchValue} />
			<OrderByDropdown onSelect={orderSelectHandler} />
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
		onSetRestaurants: (newRestaurants) => dispatch(actions.setRestaurants(newRestaurants)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(RestaurantFilter);
