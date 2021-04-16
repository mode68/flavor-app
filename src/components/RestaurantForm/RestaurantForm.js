import React, { useState } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import * as classes from './RestaurantForm.module.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const RestaurantForm = (props) => {
	const [formValues, setFormValues] = useState({
		title: '',
		address: '',
		rating: '',
		description: '',
	});

	const submitHandler = (event) => {
		event.preventDefault();
		props.onAddRestaurant(formValues);
	};

	const inputOnChangeHandler = (event, valueName) => {
		setFormValues((prevState) => {
			return { ...prevState, [valueName]: event.target.value };
		});
	};

	return (
		<Form className={classes.RestaurantForm}>
			<Form.Group controlId='restaurantForm.Title'>
				<Form.Label>Title</Form.Label>
				<Form.Control
					placeholder='Title'
					value={formValues.title}
					onChange={(e) => inputOnChangeHandler(e, 'title')}
				/>
			</Form.Group>
			<Form.Group controlId='restaurantForm.Address'>
				<Form.Label>Address</Form.Label>
				<Form.Control
					placeholder='Address'
					value={formValues.address}
					onChange={(e) => inputOnChangeHandler(e, 'address')}
				/>
			</Form.Group>
			<Form.Group controlId='restaurantForm.Rating'>
				<Form.Label>Restaurant rating</Form.Label>
				<Form.Control as='select' value={formValues.rating} onChange={(e) => inputOnChangeHandler(e, 'rating')}>
					<option>1</option>
					<option>2</option>
					<option>3</option>
					<option>4</option>
					<option>5</option>
				</Form.Control>
			</Form.Group>
			<Form.Group controlId='restaurantForm.Description'>
				<Form.Label>Description</Form.Label>
				<Form.Control
					as='textarea'
					rows={3}
					value={formValues.description}
					onChange={(e) => inputOnChangeHandler(e, 'description')}
				/>
			</Form.Group>
			<Button variant='primary' type='submit' onClick={(event) => submitHandler(event)}>
				Submit
			</Button>
		</Form>
	);
};

const mapDispatchToProps = (dispatch) => {
	return {
		onAddRestaurant: (restaurantDetails) => dispatch(actions.addRestaurant(restaurantDetails)),
	};
};

export default connect(null, mapDispatchToProps)(RestaurantForm);
