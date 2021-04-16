import React from 'react';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';

const SearchBar = (props) => {
	return (
		<InputGroup className='mb-3'>
			<InputGroup.Prepend>
				<InputGroup.Text id='inputGroup-sizing-default'>Search</InputGroup.Text>
			</InputGroup.Prepend>
			<FormControl
				aria-label='Search-by-name'
				aria-describedby='inputGroup-sizing-default'
				value={props.value}
				onChange={(e) => {
					props.onChange(e.target.value);
				}}
			/>
		</InputGroup>
	);
};

export default SearchBar;
