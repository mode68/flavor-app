import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faCheck } from '@fortawesome/free-solid-svg-icons';

const BooleanDisplay = ({ value }) => {
	return value ? (
		<FontAwesomeIcon style={{ color: 'green' }} icon={faCheck} />
	) : (
		<FontAwesomeIcon style={{ color: 'red' }} icon={faTimes} />
	);
};

export default BooleanDisplay;
