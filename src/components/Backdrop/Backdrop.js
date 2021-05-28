import React from 'react';
import * as classes from './Backdrop.module.css';

const Backdrop = (props) => {
	return props.show ? (
		<div role='presentation' onKeyDown={props.clicked} className={classes.Backdrop} onClick={props.clicked}></div>
	) : null;
};

export default Backdrop;
