import React, { useEffect, useState } from 'react';
import { NavLink, Route, useRouteMatch, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import * as classes from './RestaurantDetails.module.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import PlaceholderImg from '../../assets/images/restaurant_placeholder.jpg';
import StarRating from '../../components/StarRating/StarRating';
import General from './General/General';
import Reviews from './Reviews/Reviews';
import MapTab from './Map/Map';

const RestaurantDetails = ({ restaurants, restaurant, onGetRestaurantById }) => {
	const routeMatch = useRouteMatch();
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

	return (
		<div style={{ width: '100%' }}>
			{restaurantDetails && (
				<div className={classes.TopDetails}>
					<div className={classes.TopDetailsImg}>
						<img src={PlaceholderImg} alt='Generic placeholder' />
					</div>
					<div className={classes.TopDetailsText}>
						<div>
							<h2>{restaurantDetails.title}</h2>
						</div>
						<Container className={classes.TopDetailsDescription}>
							<Row>
								<Col sm={4}>Address:</Col>
								<Col sm={8}>{restaurantDetails.address}</Col>
							</Row>
							<Row>
								<Col sm={4}>TEL:</Col>
								<Col sm={8}>+3706548978452</Col>
							</Row>
							<Row>
								<Col sm={4}>Homepage:</Col>
								<Col sm={8}>
									https://www.{restaurantDetails.title.replace(/\s/g, '').toLowerCase()}.com
								</Col>
							</Row>
							<Row>
								<Col sm={4}>Rating:</Col>
								<Col sm={8}>
									<StarRating rating={restaurantDetails.rating} style={classes.StarRating} />
									{restaurantDetails.rating}
								</Col>
							</Row>
							<Row>
								<Col sm={4}>Budget:</Col>
								<Col sm={8}>
									{restaurantDetails.priceMin + ' ~ ' + restaurantDetails.priceMax + '€'}
								</Col>
							</Row>
						</Container>
					</div>
				</div>
			)}
			<Nav fill variant='tabs' defaultActiveKey='/home' className={classes.MainNavTabs}>
				<Nav.Item>
					<Nav.Link eventKey='link-0' as={NavLink} to={`${routeMatch.url}/general`}>
						General
					</Nav.Link>
				</Nav.Item>
				<Nav.Item>
					<Nav.Link eventKey='link-1' as={NavLink} to={`${routeMatch.url}/reviews`}>
						Reviews
					</Nav.Link>
				</Nav.Item>
				<Nav.Item>
					<Nav.Link eventKey='link-2' as={NavLink} to={`${routeMatch.url}/map`}>
						Map
					</Nav.Link>
				</Nav.Item>
			</Nav>
			<Route path={`${routeMatch.path}/general`} component={General} />
			<Route path={`${routeMatch.path}/reviews`} component={Reviews} />
			<Route path={`${routeMatch.path}/map`} component={MapTab} />
		</div>
	);
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
