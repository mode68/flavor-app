import React, { useState } from 'react';
import * as classes from './CuisineDropdown.module.css';
import FormControl from 'react-bootstrap/FormControl';

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

const CuisineDropdown = ({ show, clicked }) => {
	const [filterValue, setFilterValue] = useState('');

	const cuisineCategoriesCopy = JSON.parse(JSON.stringify(cuisineCategories));
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

	let dropdownLinks = filteredCuisineCategories.map((cuisineObj) => {
		return (
			<ul
				key={cuisineObj.id}
				style={{ listStyle: 'none', padding: 0, margin: 0 }}
				value={cuisineObj.displayTitle}
			>
				<div onClick={() => clicked(cuisineObj.id)}>{cuisineObj.displayTitle}</div>
				{cuisineObj.children
					? cuisineObj.children.map((subcuisineObj) => {
							return (
								<li
									key={subcuisineObj.id}
									onClick={() => clicked(subcuisineObj.id)}
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
		<div style={{ display: 'inline-block' }}>
			<div>Select a cuisine</div>
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
