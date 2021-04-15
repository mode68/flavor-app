import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import RestaurantPlaceholderImg from '../../assets/images/restaurant_placeholder.jpg';

const RestaurantCard = (props) => {
	return (
		<Card style={{ width: '18rem', display: 'inline-block' }}>
			<Card.Img variant='top' src={RestaurantPlaceholderImg} />
			<Card.Body>
				<Card.Title>{props.title}</Card.Title>
				<Card.Text>{props.description}</Card.Text>
				<Button variant='primary'>Go somewhere</Button>
			</Card.Body>
		</Card>
	);
};

export default RestaurantCard;
