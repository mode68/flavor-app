import React, { useEffect, useState, useCallback } from 'react';
import { connect } from 'react-redux';

import * as classes from './RestaurantFilter.module.css';
import * as actions from '../../store/actions/index';
import * as consts from '../../shared/consts';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import { copyObject } from '../../shared/utility';
import RestaurantCard from '../../components/RestaurantCard/RestaurantCard';
import SearchBar from '../../components/SearchBar/SearchBar';
import OrderByDropdown from '../../components/OrderByDropdown/OrderByDropdown';
import Slider from '../../components/Slider/Slider';
import CuisineDropdown from '../../components/CuisineDropdown/CuisineDropdown';
import { NavLink } from 'react-router-dom';
import ActiveTagSection from '../../components/ActiveTagSection/ActiveTagSection';
import GoogleMap from '../Map/Map';
import AreaSearch from '../../components/AreaSearch/AreaSearch';
import DetailsFilter from '../../components/DetailsFilter/DetailsFilter';
import ItemsPaginated from '../../components/ItemsPaginated/ItemsPaginated';

const RestaurantFilter = ({
	restaurants,
	filteredRestaurants,
	onInitRestaurants,
	onSetRestaurants,
	cuisine,
	onSetCuisine,
	priceRange,
	onSetPriceRange,
}) => {
	const [searchValue, setSearchValue] = useState('');
	const [order, setOrder] = useState('');

	useEffect(() => {
		onInitRestaurants();
	}, [onInitRestaurants]);

	const sortAndFilterRestaurants = useCallback(() => {
		if (!restaurants) {
			return;
		}

		let updatedRestaurants = copyObject(restaurants);

		// Filters based on the currently selected price range
		updatedRestaurants = updatedRestaurants.filter((restaurant) => {
			return (
				restaurant.priceMin >= priceRange[0] &&
				(priceRange[1] === consts.PRICE_RANGE_MAX ? true : restaurant.priceMax <= priceRange[1])
			);
		});

		// Filters based on the currently selected price order
		if (order) {
			if (order === consts.ORDER_CHEAPEST) {
				updatedRestaurants = updatedRestaurants.sort(consts.lowestPriceSort);
			} else if (order === consts.ORDER_BEST_RATING) {
				updatedRestaurants = updatedRestaurants.sort(consts.bestRatingSort);
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

	const cuisineChangeHandler = (cuisineIdSelected) => {
		onSetCuisine(consts.CUISINE_ID_TITLE_MAP[cuisineIdSelected]);
	};

	const setPricesHandler = (priceMin, priceMax) => {
		onSetPriceRange([priceMin, priceMax]);
	};

	const filteredByNameRestaurants = filteredRestaurants
		? filteredRestaurants.filter((restaurant) => {
				return restaurant.title.toLowerCase().includes(searchValue.toLowerCase());
		  })
		: [];

	const restaurantCards = filteredByNameRestaurants.map((restaurant) => (
		<NavLink key={restaurant._id} to={'/restaurant/' + restaurant._id + '/general'}>
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
		<div className='w-100'>
			<Container className='mw-100'>
				<Row>
					<div>
						<AreaSearch />
						<SearchBar value={searchValue} onChange={setSearchValue} />
						<OrderByDropdown onSelect={orderSelectHandler} />
						<Slider priceMin={priceRange[0]} priceMax={priceRange[1]} setPrices={setPricesHandler} />
						<CuisineDropdown show clicked={cuisineChangeHandler} />
						<DetailsFilter />
					</div>
					<ActiveTagSection search={searchValue} setSearch={setSearchValue} />
				</Row>
				<Row>
					<Col xs={6} md={6}>
						<ItemsPaginated
							items={restaurantCards}
							itemsPerPage={5}
							containerStyle={classes.RestaurantCardContainer}
							paginationControlsStyle={classes.RestaurantCardPagination}
						/>
					</Col>
					<Col xs={6} md={6}>
						<GoogleMap items={filteredRestaurants} mapStyle={{ height: '60vh', borderRadius: '5px' }} />
					</Col>
				</Row>
			</Container>
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		restaurants: state.restaurantFilter.restaurants,
		filteredRestaurants: state.restaurantFilter.filteredRestaurants,
		cuisine: state.restaurantFilter.cuisine,
		priceRange: state.restaurantFilter.priceRange,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onInitRestaurants: () => dispatch(actions.initRestaurants()),
		onSetRestaurants: (newRestaurants) => dispatch(actions.setRestaurants(newRestaurants)),
		onSetCuisine: (cuisine) => dispatch(actions.setCuisine(cuisine)),
		onSetPriceRange: (priceRange) => dispatch(actions.setPriceRange(priceRange)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(RestaurantFilter);
