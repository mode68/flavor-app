import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import { PRICE_RANGE_MIN, PRICE_RANGE_MAX } from '../../shared/consts';

import * as classes from './ActiveTagSection.module.css';
import Badge from 'react-bootstrap/Badge';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const ActiveTagSection = ({ cuisine, onSetCuisine, priceRange, onSetPriceRange, search, setSearch }) => {
	return (
		<div className={classes.ActiveTagSection}>
			{cuisine && (
				<Badge variant='dark' onClick={() => onSetCuisine('')}>
					{cuisine}
					{'   '}
					<FontAwesomeIcon icon={faTimes} />
				</Badge>
			)}
			{(priceRange[0] !== PRICE_RANGE_MIN || priceRange[1] !== PRICE_RANGE_MAX) && (
				<Badge variant='dark' onClick={() => onSetPriceRange([PRICE_RANGE_MIN, PRICE_RANGE_MAX])}>
					{priceRange[0] + ' ~ ' + priceRange[1] + '€   '}
					<FontAwesomeIcon icon={faTimes} />
				</Badge>
			)}
			{search && (
				<Badge variant='dark' onClick={() => setSearch('')}>
					Search: {search}
					{'   '}
					<FontAwesomeIcon icon={faTimes} />
				</Badge>
			)}
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		cuisine: state.restaurantFilter.cuisine,
		priceRange: state.restaurantFilter.priceRange,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onSetCuisine: (cuisineName) => dispatch(actions.setCuisine(cuisineName)),
		onSetPriceRange: (priceRange) => dispatch(actions.setPriceRange(priceRange)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ActiveTagSection);
