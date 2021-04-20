import React from 'react';
import Card from 'react-bootstrap/Card';
import * as classes from './RestaurantCard.module.css';
import RestaurantPlaceholderImg from '../../assets/images/restaurant_placeholder.jpg';

const RestaurantCard = (props) => {
	return (
		<Card className={classes.RestaurantCard}>
			<Card.Img variant='top' src={RestaurantPlaceholderImg} />
			<Card.Body>
				<Card.Title>{props.title}</Card.Title>
				<Card.Text>{props.description}</Card.Text>
				<Card.Text>{'Rating: ' + props.rating}</Card.Text>
				<Card.Text>
					{props.priceMin !== props.priceMax ? props.priceMin + ' ~ ' + props.priceMax : '~' + props.priceMin}
					€
				</Card.Text>
			</Card.Body>
		</Card>
	);
};

export default RestaurantCard;
