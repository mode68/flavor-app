import React, { useRef, useState, useEffect } from 'react';
import * as classes from './CuisineDropdown.module.css';
import { copyObject } from '../../shared/utility';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';

const cuisineCategories = [
	{
		id: 'japanesecuisine',
		displayTitle: 'Japanese Cuisine',
		children: [
			{
				id: 'japanesecuisine_ramen',
				displayTitle: 'Ramen',
			},
			{
				id: 'japanesecuisine_yakiniku',
				displayTitle: 'Yakiniku',
			},
		],
	},
	{
		id: 'italiancuisine',
		displayTitle: 'Italian Cuisine',
		children: [
			{
				id: 'italiancuisine_pizza',
				displayTitle: 'Pizza',
			},
			{
				id: 'italiancuisine_lasagna',
				displayTitle: 'Lasagna',
			},
		],
	},
	{
		id: 'westerncuisine',
		displayTitle: 'Western Cuisine',
		children: [
			{
				id: 'westerncuisine_burgers',
				displayTitle: 'Burgers',
			},
		],
	},
	{
		id: 'sandwiches',
		displayTitle: 'Sandwiches',
	},
	{
		id: 'soups',
		displayTitle: 'Soups',
	},
];

function useCloseOnOutsideClick(ref, setShow) {
	useEffect(() => {
		function handleClickOutside(event) {
			if (ref.current && !ref.current.contains(event.target)) {
				setShow(false);
			}
		}

		document.addEventListener('click', handleClickOutside);
		return () => document.removeEventListener('click', useCloseOnOutsideClick);
	}, [ref, setShow]);
}

const CuisineDropdown = ({ clicked }) => {
	const [filterValue, setFilterValue] = useState('');
	const [show, setShow] = useState(false);
	const wrapperRef = useRef(null);
	useCloseOnOutsideClick(wrapperRef, setShow);

	const cuisineCategoriesCopy = copyObject(cuisineCategories);
	const filteredCuisineCategories = !filterValue
		? cuisineCategoriesCopy
		: cuisineCategoriesCopy.filter((cuisine) => {
				if (!cuisine.displayTitle.toLowerCase().includes(filterValue.toLowerCase())) {
					if (!cuisine.children) {
						return false;
					}
					cuisine.children = cuisine.children.filter((subcuisine) =>
						subcuisine.displayTitle.toLowerCase().includes(filterValue.toLowerCase())
					);
					return cuisine.children.length !== 0;
				}
				return true;
		  });

	const onCuisineClick = (id) => {
		clicked(id);
		setShow(false);
	};

	let dropdownLinks = filteredCuisineCategories.map((cuisineObj) => {
		return (
			<ul
				key={cuisineObj.id}
				style={{ listStyle: 'none', padding: 0, margin: 0 }}
				value={cuisineObj.displayTitle}
			>
				<div onClick={() => onCuisineClick(cuisineObj.id)}>{cuisineObj.displayTitle}</div>
				{cuisineObj.children
					? cuisineObj.children.map((subcuisineObj) => {
							return (
								<li
									key={subcuisineObj.id}
									onClick={() => onCuisineClick(subcuisineObj.id)}
									value={subcuisineObj.displayTitle}
								>
									{subcuisineObj.displayTitle}
								</li>
							);
					  })
					: null}
			</ul>
		);
	});
	return (
		<div style={{ display: 'inline-block', float: 'left' }} ref={wrapperRef}>
			<Button variant='outline-primary' onClick={() => setShow((prevState) => !prevState)} active={show}>
				Select a cuisine
			</Button>
			{show && (
				<div className={classes.Dropdown}>
					<FormControl
						autoFocus
						style={{ width: '100%' }}
						className='my-2'
						placeholder='Type to filter...'
						onChange={(e) => setFilterValue(e.target.value)}
						value={filterValue}
					/>
					{dropdownLinks}
				</div>
			)}
		</div>
	);
};

export default CuisineDropdown;
