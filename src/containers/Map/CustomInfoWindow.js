import * as classes from './CustomInfoWindow.module.css';
import React from 'react';
import { NavLink } from 'react-router-dom';
import StarRating from '../../components/StarRating/StarRating';
import Badge from 'react-bootstrap/Badge';
import placeholderImage from '../../assets/images/info_window_placeholder_img.jpg';

const InfoWindow = ({ item, onInfoWindowClick }) => {
	const cuisineTags = item.cuisineTags.map((tag, i) => (
		<Badge key={i} style={{ margin: '2px' }} variant='info'>
			{tag}
		</Badge>
	));
	return (
		<div onClick={onInfoWindowClick} className={classes.InfoWindow}>
			<NavLink key={item._id} to={'/restaurant/' + item._id + '/general'}>
				<h5>{item.title}</h5>
				<div className={classes.Image}>
					<img src={placeholderImage} alt='Info window restaurant img' />
				</div>
				<div className={classes.Text}>
					<div>{cuisineTags}</div>
					<div className={classes.Rating}>
						<StarRating rating={item.rating} />
						{'  ' + item.rating}
					</div>
					<div>{item.priceMin + ' ~ ' + item.priceMax + '€'}</div>
				</div>
			</NavLink>
		</div>
	);
};

export default InfoWindow;
