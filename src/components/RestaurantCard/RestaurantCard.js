import React from 'react';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import * as classes from './RestaurantCard.module.css';
import RestaurantPlaceholderImg from '../../assets/images/restaurant_placeholder.jpg';
import StarRating from '../StarRating/StarRating';

const RestaurantCard = (props) => {
	const cuisineTags = props.cuisineTags.map((tag, i) => (
		<Badge key={i} style={{ margin: '2px' }} variant='info'>
			{tag}
		</Badge>
	));
	return (
		<Card className={classes.RestaurantCard}>
			<Card.Img variant='top' src={RestaurantPlaceholderImg} />
			<Card.Body>
				<Card.Title>{props.title}</Card.Title>
				<Card.Text>{props.description}</Card.Text>
				<StarRating rating={props.rating} />
				<Card.Text>
					{props.priceMin !== props.priceMax ? props.priceMin + ' ~ ' + props.priceMax : '~' + props.priceMin}
					€
				</Card.Text>
				{cuisineTags}
			</Card.Body>
		</Card>
	);
};

export default RestaurantCard;
