import React from 'react';
import CustomToggle from './CustomToggle';
import CustomMenu from './CustomMenu';
import Dropdown from 'react-bootstrap/Dropdown';

const CuisineDropdown = (props) => {
	const cuisineSelectHandler = (eventKey) => {
		props.onChange(eventKey);
	};

	return (
		<Dropdown onSelect={cuisineSelectHandler}>
			<Dropdown.Toggle as={CustomToggle} id='dropdown-custom-components'>
				{props.selected ? props.selected : 'Select a cuisine'}
			</Dropdown.Toggle>

			<Dropdown.Menu as={CustomMenu}>
				<Dropdown.Item eventKey='Pizza'>Pizza</Dropdown.Item>
				<Dropdown.Item eventKey='Ramen'>Ramen</Dropdown.Item>
				<Dropdown.Item eventKey='Burgers'>Burgers</Dropdown.Item>
				<Dropdown.Item eventKey='Yakiniku'>Yakiniku</Dropdown.Item>
				<Dropdown.Item eventKey='Sandwiches'>Sandwiches</Dropdown.Item>
				<Dropdown.Item eventKey='Soups'>Soups</Dropdown.Item>
				<Dropdown.Item eventKey='French'>Frech</Dropdown.Item>
				<Dropdown.Item eventKey='American'>American</Dropdown.Item>
				<Dropdown.Item eventKey='Italian'>Italian</Dropdown.Item>
				<Dropdown.Item eventKey='Mediterranean'>Mediterranean</Dropdown.Item>
			</Dropdown.Menu>
		</Dropdown>
	);
};

export default CuisineDropdown;
