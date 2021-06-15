import React from 'react';
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
		<>
			<div className='container-fluid'>
				<div className='row'>
					<div className='col-12 mt-3'>
						<div className='card'>
							<div className={classes.CardHorizontal}>
								<div className='img-square-wrapper'>
									<img
										className={classes.RestaurantCardImage}
										src={RestaurantPlaceholderImg}
										alt='Card image cap'
									/>
								</div>
								<div className='card-body'>
									<h4 className='card-title'>{props.title}</h4>
									<div className='card-text'>
										{props.description}
										<StarRating rating={props.rating} />
										{props.priceMin !== props.priceMax
											? props.priceMin + ' ~ ' + props.priceMax
											: '~' + props.priceMin}
										€
									</div>
								</div>
							</div>
							<div className='card-footer'>{cuisineTags}</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default RestaurantCard;
