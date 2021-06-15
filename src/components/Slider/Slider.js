import React, { useState } from 'react';
import { Slider, Rail, Handles, Tracks, Ticks } from 'react-compound-slider';
import { SliderRail, Handle, Track, Tick } from './components';
import * as consts from '../../shared/consts';

const sliderStyle = {
	position: 'relative',
	width: '100%',
};

const SliderComponent = (props) => {
	const [sliderVal, setSliderVal] = useState({
		domain: [consts.PRICE_RANGE_MIN, consts.PRICE_RANGE_MAX],
		update: [props.priceMin, props.priceMax],
		reversed: false,
	});

	const onUpdate = (update) => {
		setSliderVal((prevVal) => {
			return { ...prevVal, update: update };
		});
	};

	const onChange = (values) => {
		props.setPrices(values[0], values[1]);
	};

	return (
		<div style={{ width: '100%', padding: '20px', margin: '30px 0' }}>
			<div>
				<div style={{ float: 'left', marginTop: '-50px' }}>from {props.priceMin}€</div>
				<div style={{ float: 'right', marginTop: '-50px' }}>
					up to {props.priceMax}
					{props.priceMax === sliderVal.domain[1] ? '+' : ''}€
				</div>
			</div>
			<Slider
				mode={1}
				step={1}
				domain={sliderVal.domain}
				reversed={sliderVal.reversed}
				rootStyle={sliderStyle}
				onUpdate={onUpdate}
				onChange={onChange}
				values={[props.priceMin, props.priceMax]}
			>
				<Rail>{({ getRailProps }) => <SliderRail getRailProps={getRailProps} />}</Rail>
				<Handles>
					{({ handles, getHandleProps }) => (
						<div className='slider-handles'>
							{handles.map((handle) => (
								<Handle
									key={handle.id}
									handle={handle}
									domain={sliderVal.domain}
									getHandleProps={getHandleProps}
								/>
							))}
						</div>
					)}
				</Handles>
				<Tracks left={false} right={false}>
					{({ tracks, getTrackProps }) => (
						<div className='slider-tracks'>
							{tracks.map(({ id, source, target }) => (
								<Track key={id} source={source} target={target} getTrackProps={getTrackProps} />
							))}
						</div>
					)}
				</Tracks>
				<Ticks count={10}>
					{({ ticks }) => (
						<div className='slider-ticks'>
							{ticks.map((tick) => (
								<Tick key={tick.id} tick={tick} count={ticks.length} />
							))}
						</div>
					)}
				</Ticks>
			</Slider>
		</div>
	);
};

export default SliderComponent;
