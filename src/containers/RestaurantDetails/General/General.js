import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';
import Spinner from '../../../components/Spinner/Spinner';
import * as classes from './General.module.css';
import Table from 'react-bootstrap/Table';
import BooleanDisplay from '../../../components/BooleanDisplay/BooleanDisplay';
import WorkHoursDisplay from '../../../components/WorkHoursDisplay/WorkHoursDisplay';

const General = ({ restaurant, restaurantDetails, onGetRestaurantDetailsById }) => {
	const { id } = useParams();

	useEffect(() => {
		onGetRestaurantDetailsById(id);
	}, [onGetRestaurantDetailsById]);

	return restaurantDetails && restaurant ? (
		<div>
			<div>
				<div>Main Information</div>
				<Table striped bordered hover variant='dark'>
					<tbody>
						<tr>
							<td>Restaurant name</td>
							<td>{restaurantDetails.title}</td>
						</tr>
						<tr>
							<td>Categories</td>
							<td>
								{restaurantDetails.cuisineTags.map((tag, i) =>
									restaurantDetails.cuisineTags.length - 1 === i ? tag : tag + ', '
								)}
							</td>
						</tr>
						<tr>
							<td>Telephone</td>
							<td>{restaurant.telephone}</td>
						</tr>
						<tr>
							<td>Address</td>
							<td>{restaurant.address}</td>
						</tr>
						<tr>
							<td>Nearest bus station</td>
							<td>{restaurantDetails.nearestStation}</td>
						</tr>
						<tr>
							<td>Work hours</td>
							<td>
								<WorkHoursDisplay workHours={restaurantDetails.workHours} />
							</td>
						</tr>
						<tr>
							<td>Budget</td>
							<td>{restaurantDetails.priceMin + ' ~ ' + restaurantDetails.priceMax + '€'}</td>
						</tr>
						<tr>
							<td>Payment method</td>
							<td>
								Card - <BooleanDisplay value={restaurantDetails.paymentMethod.card} />
								<br />
								Cash - <BooleanDisplay value={restaurantDetails.paymentMethod.cash} />
							</td>
						</tr>
					</tbody>
				</Table>
				<div>Facilities</div>
				<Table striped bordered hover variant='dark'>
					<tbody>
						<tr>
							<td>Number of seats</td>
							<td>{restaurantDetails.numberOfSeats}</td>
						</tr>
						<tr>
							<td>Private dining rooms</td>
							<td>
								<BooleanDisplay value={restaurantDetails.privateDiningRooms} />
							</td>
						</tr>
						<tr>
							<td>Sports TV</td>
							<td>
								<BooleanDisplay value={restaurantDetails.sportsTV} />
							</td>
						</tr>
						<tr>
							<td>Fussball table</td>
							<td>
								<BooleanDisplay value={restaurantDetails.fussball} />
							</td>
						</tr>
						<tr>
							<td>Darts</td>
							<td>
								<BooleanDisplay value={restaurantDetails.darts} />
							</td>
						</tr>
						<tr>
							<td>Gaming console/PC</td>
							<td>
								<BooleanDisplay value={restaurantDetails.gamingConsole} />
							</td>
						</tr>
						<tr>
							<td>Karaoke</td>
							<td>
								<BooleanDisplay value={restaurantDetails.karaoke} />
							</td>
						</tr>
						<tr>
							<td>Free Wi-Fi</td>
							<td>
								<BooleanDisplay value={restaurantDetails.freeWifi} />
							</td>
						</tr>
						<tr>
							<td>Paid Wi-Fi</td>
							<td>
								<BooleanDisplay value={restaurantDetails.paidWifi} />
							</td>
						</tr>
						<tr>
							<td>Outdoor/terrace seating</td>
							<td>
								<BooleanDisplay value={restaurantDetails.outdoorTerraceSeating} />
							</td>
						</tr>
						<tr>
							<td>Seating at the counter</td>
							<td>
								<BooleanDisplay value={restaurantDetails.counterSeating} />
							</td>
						</tr>
						<tr>
							<td>Wheelchair accessible space</td>
							<td>
								<BooleanDisplay value={restaurantDetails.wheelchairSpace} />
							</td>
						</tr>
						<tr>
							<td>Parking lot</td>
							<td>
								<BooleanDisplay value={restaurantDetails.parkingLot} />
							</td>
						</tr>
					</tbody>
				</Table>
				<div>Features</div>
				<Table striped bordered hover variant='dark'>
					<tbody>
						<tr>
							<td>Vegeterian friendly</td>
							<td>
								<BooleanDisplay value={restaurantDetails.vegetarianFriendly} />
							</td>
						</tr>
						<tr>
							<td>Vegan friendly</td>
							<td>
								<BooleanDisplay value={restaurantDetails.veganFriendly} />
							</td>
						</tr>
						<tr>
							<td>Allergy labeled</td>
							<td>
								<BooleanDisplay value={restaurantDetails.allergyLabeled} />
							</td>
						</tr>
						<tr>
							<td>Courses available</td>
							<td>
								<BooleanDisplay value={restaurantDetails.courses} />
							</td>
						</tr>
						<tr>
							<td>"All you can eat" menu available</td>
							<td>
								<BooleanDisplay value={restaurantDetails.allYouCanEatMenu} />
							</td>
						</tr>
						<tr>
							<td>"All you can drink" menu available</td>
							<td>
								<BooleanDisplay value={restaurantDetails.allYouCanDrinkMenu} />
							</td>
						</tr>
						<tr>
							<td>Reservations</td>
							<td>{restaurantDetails.reservations}</td>
						</tr>
						<tr>
							<td>Take-out</td>
							<td>
								<BooleanDisplay value={restaurantDetails.takeOut} />
							</td>
						</tr>
						<tr>
							<td>Occasion</td>
							<td>
								{restaurantDetails.occassion.map((occassion, i) =>
									restaurantDetails.occassion.length - 1 === i ? occassion : occassion + ', '
								)}
							</td>
						</tr>
						<tr>
							<td>With children</td>
							<td>
								Babies welcome - <BooleanDisplay value={restaurantDetails.withChildren.babiesWelcome} />
								<br />
								Baby seats available -{' '}
								<BooleanDisplay value={restaurantDetails.withChildren.babySeatsAvailable} />
								<br />
								Baby strollers allowed -{' '}
								<BooleanDisplay value={restaurantDetails.withChildren.babyStrollersAllowed} />
								<br />
								Pre-school children welcome -{' '}
								<BooleanDisplay value={restaurantDetails.withChildren.preschoolWelcome} />
								<br />
								Elementary school children welcome -{' '}
								<BooleanDisplay value={restaurantDetails.withChildren.elementaryWelcome} />
								<br />
								Children menu available -{' '}
								<BooleanDisplay value={restaurantDetails.withChildren.childrenMenuAvailable} />
								<br />
							</td>
						</tr>
						<tr>
							<td>With pets</td>
							<td>
								<BooleanDisplay value={restaurantDetails.withPets} />
							</td>
						</tr>
						<tr>
							<td>Additional remarks</td>
							<td>{restaurantDetails.additionalRemarks}</td>
						</tr>
					</tbody>
				</Table>
			</div>
		</div>
	) : (
		<Spinner />
	);
};

const mapStateToProps = (state) => {
	return {
		restaurant: state.restaurantFilter.restaurant,
		restaurantDetails: state.restaurantFilter.restaurantDetails,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onGetRestaurantDetailsById: (id) => dispatch(actions.getRestaurantDetailsById(id)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(General);
