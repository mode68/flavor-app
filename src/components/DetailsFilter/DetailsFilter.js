import * as classes from './DetailsFilter.module.css';
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import Button from 'react-bootstrap/Button';
import * as consts from './DetailsFilterMap';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Checkbox from '@material-ui/core/Checkbox';
import Select from '@material-ui/core/Select';
import Chip from '@material-ui/core/Chip';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import { copyObject } from '../../shared/utility';

const DetailsFilter = ({ onSetDetailsFilter, detailsFilter }) => {
	const [show, setShow] = useState(false);
	const [value, setValue] = useState(consts.stateValueMap);

	useEffect(() => {
		if (JSON.stringify(detailsFilter) !== JSON.stringify(value)) {
			setValue(detailsFilter);
		}
	}, [detailsFilter]);

	const parseDetailsFilterMap = (object, key) => {
		const controlWrapper = (displayName, wrapperContent) => {
			return (
				<div className={classes.DetailsRow} key={key}>
					<div className={classes.NameColumn}>{displayName}</div>
					<div className={classes.ValueColumn}>{wrapperContent}</div>
				</div>
			);
		};
		switch (object.type) {
			case 'detailGroupTitle':
				return <div className={classes.CategoryTitle}>{object.displayName}</div>;
			case 'singleSelect':
				return controlWrapper(
					object.displayName,
					<Select
						value={value[object.valuePropName]}
						onChange={(e) => {
							let updatedValue = copyObject(value);
							updatedValue[object.valuePropName] = e.target.value;
							setValue(updatedValue);
						}}
					>
						{Object.keys(object.children).map((key) => (
							<MenuItem key={object.children[key].value} value={object.children[key].value}>
								{object.children[key].displayName}
							</MenuItem>
						))}
					</Select>
				);

			case 'boolean':
				return controlWrapper(
					object.displayName,
					<FormControlLabel
						control={
							<Checkbox
								checked={value[object.valuePropName]}
								onChange={(e) => {
									let updatedValue = copyObject(value);
									updatedValue[object.valuePropName] = e.target.checked;
									setValue(updatedValue);
								}}
								color='primary'
							/>
						}
						label={object.label}
					/>
				);
			case 'multiSelect':
				if (object.valueType === 'Array') {
					return controlWrapper(
						object.displayName,
						<FormControl>
							<Select
								labelId='mutiple-chip-label'
								id='mutiple-chip'
								multiple
								value={value[object.valuePropName]}
								onChange={(e) => {
									let updatedValue = copyObject(value);
									updatedValue[object.valuePropName] = e.target.value;
									setValue(updatedValue);
								}}
								input={<Input id='select-multiple-chip' />}
								renderValue={(selected) => (
									<div className={classes.Chips}>
										{selected.map((value) => (
											<Chip key={value} label={value} className={classes.Chip} />
										))}
									</div>
								)}
							>
								{Object.keys(object.children).map((key) => (
									<MenuItem key={object.children[key].value} value={object.children[key].value}>
										{object.children[key].displayName}
									</MenuItem>
								))}
							</Select>
						</FormControl>
					);
				} else if (object.valueType === 'Object') {
					return controlWrapper(
						object.displayName,
						Object.keys(object.children).map((key) => (
							<FormControlLabel
								key={key}
								control={
									<Checkbox
										checked={value[object.valuePropName][object.children[key].valuePropName]}
										onChange={(e) => {
											let updatedValue = copyObject(value);
											updatedValue[object.valuePropName][object.children[key].valuePropName] =
												e.target.checked;
											setValue(updatedValue);
										}}
										color='primary'
									/>
								}
								label={object.children[key].displayName}
							/>
						))
					);
				}
				break;
			default:
				return null;
		}
	};

	const detailsFilterItems = Object.keys(consts.detailsFilterMap).map((key) => {
		let children = null;
		if (consts.detailsFilterMap[key].children) {
			children = Object.keys(consts.detailsFilterMap[key].children).map((childKey) =>
				parseDetailsFilterMap(consts.detailsFilterMap[key].children[childKey], childKey)
			);
		}
		let parent = parseDetailsFilterMap(consts.detailsFilterMap[key], key);
		return [parent, ...children];
	});

	return (
		<div>
			<Button onClick={() => setShow(!show)}>Find details</Button>
			{show ? (
				<div className={classes.Dropdown}>
					<div className={classes.DetailsButtons}>
						<Button
							variant='success'
							style={{ width: '60%' }}
							onClick={() => {
								setShow(false);
								onSetDetailsFilter(value);
							}}
						>
							Save details
						</Button>
						<Button variant='danger' style={{ width: '40%' }} onClick={() => setShow(false)}>
							Cancel
						</Button>
					</div>
					<div>
						<div>{detailsFilterItems}</div>
					</div>
				</div>
			) : null}
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		detailsFilter: state.restaurantFilter.detailsFilter,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onSetDetailsFilter: (details) => dispatch(actions.setDetailsFilter(details)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailsFilter);
