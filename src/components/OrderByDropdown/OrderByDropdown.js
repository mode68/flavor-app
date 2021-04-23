import React from 'react';
import Form from 'react-bootstrap/Form';
import * as consts from '../../shared/consts';

const OrderByDropdown = (props) => {
	return (
		<Form.Group controlId='exampleForm.SelectCustomSizeSm'>
			<Form.Label>Order by</Form.Label>
			<Form.Control as='select' size='sm' custom onChange={(e) => props.onSelect(e.target.value)}>
				<option>{consts.ORDER_STANDARD}</option>
				<option>{consts.ORDER_BEST_RATING}</option>
				<option>{consts.ORDER_CHEAPEST}</option>
			</Form.Control>
		</Form.Group>
	);
};

export default OrderByDropdown;
