import React from 'react';
import Form from 'react-bootstrap/Form';

const OrderByDropdown = (props) => {
	return (
		<Form.Group controlId='exampleForm.SelectCustomSizeSm'>
			<Form.Label>Order by</Form.Label>
			<Form.Control as='select' size='sm' custom onChange={(e) => props.onSelect(e.target.value)}>
				<option>Standard</option>
				<option>Highest rated first</option>
				<option>Cheapest first</option>
			</Form.Control>
		</Form.Group>
	);
};

export default OrderByDropdown;
