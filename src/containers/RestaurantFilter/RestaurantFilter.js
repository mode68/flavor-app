import React, { useEffect, useState, useCallback } from 'react';
import { connect } from 'react-redux';

import * as classes from './RestaurantFilter.module.css';
import * as actions from '../../store/actions/index';
import * as consts from '../../shared/consts';
import RestaurantCard from '../../components/RestaurantCard/RestaurantCard';
import SearchBar from '../../components/SearchBar/SearchBar';
import OrderByDropdown from '../../components/OrderByDropdown/OrderByDropdown';
import Slider from '../../components/Slider/Slider';
import CuisineDropdown from '../../components/CuisineDropdown/CuisineDropdown';
import CuisineDropdown2 from '../../components/CuisineDropdown/CuisineDropdown2';
import { NavLink } from 'react-router-dom';

const lowestPriceSort = (a, b) => {
	const aPrice = (a.priceMin + a.priceMax) / 2;
	const bPrice = (b.priceMin + b.priceMax) / 2;
	return aPrice < bPrice ? -1 : aPrice > bPrice ? 1 : 0;
};

const bestRatingSort = (a, b) => {
	return a.rating > b.rating ? -1 : a.rating < b.rating ? 1 : 0;
};

const RestaurantFilter = ({ restaurants, filteredRestaurants, onInitRestaurants, onSetRestaurants }) => {
	const [searchValue, setSearchValue] = useState('');
	const [priceRange, setPriceRange] = useState([consts.PRICE_RANGE_MIN, consts.PRICE_RANGE_MAX]);
	const [cuisine, setCuisine] = useState('');
	const [order, setOrder] = useState('');

	// const onInitRestaurants = props.onInitRestaurants;
	useEffect(() => {
		onInitRestaurants();
	}, [onInitRestaurants]);

	const sortAndFilterRestaurants = useCallback(() => {
		if (!restaurants) {
			return;
		}
		let updatedRestaurants = restaurants.map((restaurant) => {
			return { ...restaurant };
		});

		// Filters based on the currently selected price range
		updatedRestaurants = updatedRestaurants.filter((restaurant) => {
			return restaurant.priceMin >= priceRange[0] && restaurant.priceMax <= priceRange[1];
		});

		// Filters based on the currently selected price order
		if (order) {
			if (order === consts.ORDER_CHEAPEST) {
				updatedRestaurants = updatedRestaurants.sort(lowestPriceSort);
			} else if (order === consts.ORDER_BEST_RATING) {
				updatedRestaurants = updatedRestaurants.sort(bestRatingSort);
			} else if (order === consts.ORDER_STANDARD) {
			}
		}

		// Filters based on the currently selected cuisine
		if (cuisine) {
			updatedRestaurants = updatedRestaurants.filter((restaurant) => {
				return restaurant.cuisineTags.includes(cuisine);
			});
		}

		onSetRestaurants(updatedRestaurants);
	}, [cuisine, onSetRestaurants, order, priceRange, restaurants]);
	useEffect(() => {
		sortAndFilterRestaurants();
	}, [order, cuisine, priceRange, sortAndFilterRestaurants]);

	const orderSelectHandler = (newValue) => {
		setOrder(newValue);
	};

	const cuisineChangeHandler = (cuisineSelected) => {
		setCuisine(cuisineSelected);
	};

	const setPricesHandler = (priceMin, priceMax) => {
		setPriceRange([priceMin, priceMax]);
	};

	const filteredByNameRestaurants = filteredRestaurants
		? filteredRestaurants.filter((restaurant) => {
				return restaurant.title.toLowerCase().includes(searchValue.toLowerCase());
		  })
		: [];

	const restaurantCards = filteredByNameRestaurants.map((restaurant) => (
		<NavLink key={restaurant._id} to={'/restaurant/' + restaurant._id}>
			<RestaurantCard
				title={restaurant.title}
				description={restaurant.description}
				rating={restaurant.rating}
				priceMin={restaurant.priceMin}
				priceMax={restaurant.priceMax}
				cuisineTags={restaurant.cuisineTags}
			/>
		</NavLink>
	));

	return (
		<div>
			<br />
			<SearchBar value={searchValue} onChange={setSearchValue} />
			<OrderByDropdown onSelect={orderSelectHandler} />
			<Slider priceMin={priceRange[0]} priceMax={priceRange[1]} setPrices={setPricesHandler} />
			<CuisineDropdown onChange={cuisineChangeHandler} selected={cuisine} />
			<CuisineDropdown2 show clicked={(title) => console.log(title)} />
			<br />
			<div className={classes.Restaurants}>{restaurantCards}</div>
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		restaurants: state.restaurantFilter.restaurants,
		filteredRestaurants: state.restaurantFilter.filteredRestaurants,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onInitRestaurants: () => dispatch(actions.initRestaurants()),
		onSetRestaurants: (newRestaurants) => dispatch(actions.setRestaurants(newRestaurants)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(RestaurantFilter);
