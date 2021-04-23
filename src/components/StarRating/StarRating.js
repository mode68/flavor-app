import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

const StarRating = ({ rating }) => {
	const [starValue, setStarValue] = useState([0, 0, 0]);

	useEffect(() => {
		let wholeStars = Math.floor(rating);
		const halfStars = rating % 1 > 0.3 && rating % 1 < 0.75 ? 1 : 0;
		wholeStars += rating % 1 >= 0.75 ? 1 : 0;
		const emptyStars = 5 - wholeStars - halfStars;
		setStarValue([wholeStars, halfStars, emptyStars]);
	}, [rating]);

	let stars = [];
	for (let i = 0; i < starValue[0]; i++) {
		stars.push(<FontAwesomeIcon key={'fullStar' + i} icon={faStar} />);
	}
	for (let i = 0; i < starValue[1]; i++) {
		stars.push(<FontAwesomeIcon key={'halfStar' + i} icon={faStarHalfAlt} />);
	}
	for (let i = 0; i < starValue[2]; i++) {
		stars.push(<FontAwesomeIcon key={'emptyStar' + i} icon={farStar} />);
	}

	const renderTooltip = (settings, rating) => (
		<Tooltip id='star-rating-tooltip' {...settings}>
			{rating} out of 5
		</Tooltip>
	);

	return (
		<OverlayTrigger
			placement='top'
			delay={{ show: 300, hide: 300 }}
			overlay={(settings) => renderTooltip(settings, rating)}
		>
			<div>{stars}</div>
		</OverlayTrigger>
	);
};

export default StarRating;
