import React, { useState, useRef, useEffect } from 'react';
import Slider from '@material-ui/core/Slider';
import Form from 'react-bootstrap/Form';
import StarRating from '../StarRating/StarRating';
import * as classes from './RatingTool.module.css';

const useOutsideClick = (ref, onClick) => {
	useEffect(() => {
		// Alert if clicked on outside of element
		function handleClickOutside(event) {
			if (ref.current && !ref.current.contains(event.target)) {
				onClick();
			}
		}
		// Bind the event listener
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			// Unbind the event listener on clean up
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [ref, onClick]);
};

const RatingTool = ({ categoryName, value, onChange }) => {
	const wrapperRef = useRef(null);
	const [active, setActive] = useState(false);

	const onOutsideClick = () => {
		setActive(false);
	};

	useOutsideClick(wrapperRef, onOutsideClick);

	return (
		<div className={classes.RatingTool} ref={wrapperRef}>
			<div onClick={() => setActive(true)} style={{ cursor: 'pointer' }}>
				{categoryName}:
				<Form.Control
					className={classes.FormControl}
					type='number'
					onChange={(event) => onChange(null, event.target.value)}
					value={value}
					min={0}
					max={5}
					required
				/>
			</div>
			{active ? (
				<div className={classes.RatingPanel}>
					<div className={classes.ArrowUp}></div>
					<div className={classes.Panel}>
						<Slider
							value={value}
							onChange={onChange}
							aria-labelledby='discrete-slider'
							step={0.1}
							min={0}
							max={5}
							valueLabelDisplay='off'
						/>
						<StarRating rating={value} style={classes.StarRating} />
					</div>
				</div>
			) : null}
		</div>
	);
};

export default RatingTool;
