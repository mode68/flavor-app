import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';

const DropdownItemNested = (props) => {
	const childrenComponents = props.children.map((child, i) => (
		<Dropdown.Item key={child + i} eventKey={child}>
			{child}
		</Dropdown.Item>
	));
	return (
		<Dropdown.Item>
			<Dropdown.Header>{props.title}</Dropdown.Header>
			{childrenComponents}
		</Dropdown.Item>
	);
};

export default DropdownItemNested;
