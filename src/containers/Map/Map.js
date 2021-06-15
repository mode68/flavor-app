import React from 'react';
import { GoogleMap, InfoWindow, Marker, useLoadScript } from '@react-google-maps/api';
import Spinner from '../../components/Spinner/Spinner';
import mapStyles from './MapOptions';
import CustomInfoWindow from './CustomInfoWindow';

const mapContainerStyle = {
	width: '500px',
	height: '500px',
};

const center = {
	lat: 54.6870458,
	lng: 25.2829111,
};

const options = {
	styles: mapStyles,
};

const MapComponent = ({ items, mapStyle, mapClassName }) => {
	const { isLoaded, loadError } = useLoadScript({
		googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
	});
	const [selected, setSelected] = React.useState(null);

	const mapRef = React.useRef();
	const onMapLoad = React.useCallback((map) => {
		mapRef.current = map;
	}, []);

	if (loadError) return 'Error loading maps';
	if (!isLoaded) return <Spinner />;

	return (
		<div>
			<GoogleMap mapContainerStyle={mapStyle} zoom={14} center={center} options={options} onLoad={onMapLoad}>
				{items
					? items.map((item) => (
							<Marker
								key={item._id}
								position={{
									lat: parseFloat(item.coordinates.lat),
									lng: parseFloat(item.coordinates.lng),
								}}
								onClick={() => {
									setSelected(item);
								}}
							></Marker>
					  ))
					: null}

				{selected ? (
					<InfoWindow
						position={{
							lat: parseFloat(selected.coordinates.lat),
							lng: parseFloat(selected.coordinates.lng),
						}}
						onCloseClick={() => {
							setSelected(null);
						}}
					>
						<CustomInfoWindow
							item={selected}
							onClick={() => {
								console.log('it works~');
							}}
						/>
					</InfoWindow>
				) : null}
			</GoogleMap>
		</div>
	);
};

export default MapComponent;
