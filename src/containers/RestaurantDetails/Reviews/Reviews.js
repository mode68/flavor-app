import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Slider from '@material-ui/core/Slider';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import RatingTool from '../../../components/RatingTool/RatingTool';
import * as consts from '../../../shared/consts';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import DatePicker from 'react-datepicker';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';
import 'react-datepicker/dist/react-datepicker.css';
import ReviewCard from '../../../components/ReviewCard/ReviewCard';

const Reviews = ({ restaurant, reviews, user, authenticated, onAddReview, onGetReviewsById }) => {
	const [scores, setScores] = useState({
		overall: {
			name: 'Overall',
			score: 2.5,
		},
		food: {
			name: 'Food',
			score: 2.5,
		},
		service: {
			name: 'Service',
			score: 2.5,
		},
		atmosphere: {
			name: 'Atmosphere',
			score: 2.5,
		},
		drinks: {
			name: 'Drinks',
			score: 2.5,
		},
		costPerformance: {
			name: 'Cost performance',
			score: 2.5,
		},
	});
	const [moneySpent, setMoneySpent] = useState(1);
	const [dateVisited, setDateVisisted] = useState(new Date());
	const [reviewTitle, setReviewTitle] = useState('');
	const [reviewText, setReviewText] = useState('');
	const { id } = useParams(); // id of the restaurant

	useEffect(() => {
		onGetReviewsById(id);
	}, [onGetReviewsById, id]);

	const ratingToolArray = Object.keys(scores).map((key, index) => (
		<RatingTool
			key={scores[key].name + index}
			categoryName={scores[key].name}
			value={scores[key].score}
			onChange={(event, value) => {
				const newValue = Math.round(value * 10) / 10;
				let updatedScore = { ...scores };
				updatedScore[key].score = newValue < 0 ? 0 : newValue > 5 ? 5 : newValue;
				setScores(updatedScore);
			}}
		/>
	));

	const moneySpentSliderLabel = (value) => {
		return `~${value}€`;
	};

	const submit = (event) => {
		event.preventDefault();
		console.log(user);
		const newReview = {
			restaurantId: restaurant._id,
			reviewAuthorId: user._id,
			reviewAuthorFirstName: user.firstName,
			reviewAuthorLastName: user.lastName,
			scores: scores,
			moneySpent: moneySpent,
			dateVisited: dateVisited,
			title: reviewTitle,
			review: reviewText,
		};
		onAddReview(newReview);
	};

	return (
		<div>
			<h1>Reviews tab</h1>
			{authenticated ? (
				<Form>
					<Container>
						<Row>
							<Col md='auto'>Overall (main) score:</Col>
							<Col>{ratingToolArray[0]}</Col>
						</Row>
						<Row>
							<Col md='auto'>Other scores:</Col>
							<Col>{ratingToolArray.filter((x, index) => index !== 0)}</Col>
						</Row>
						<Row>
							<Col md='auto'>Money spent:</Col>
							<Col>
								<Slider
									value={moneySpent}
									onChange={(event, value) => {
										setMoneySpent(value);
									}}
									valueLabelFormat={moneySpentSliderLabel}
									valueLabelDisplay='auto'
									marks
									step={1}
									min={consts.PRICE_RANGE_MIN}
									max={consts.PRICE_RANGE_MAX}
								/>
							</Col>
						</Row>
						<Row>
							<Col md='auto'>Date of visit:</Col>
							<Col>
								<DatePicker selected={dateVisited} onChange={(date) => setDateVisisted(date)} />
							</Col>
						</Row>
					</Container>
					<Form.Group>
						<InputGroup className='mb-3'>
							<InputGroup.Text id='basic-addon3'>Review title</InputGroup.Text>
							<FormControl
								id='review-title'
								aria-describedby='basic-addon3'
								value={reviewTitle}
								onChange={(e) => setReviewTitle(e.target.value)}
							/>
						</InputGroup>
						<InputGroup>
							<InputGroup.Text>Review</InputGroup.Text>
							<FormControl
								as='textarea'
								aria-label='With textarea'
								value={reviewText}
								onChange={(e) => setReviewText(e.target.value)}
							/>
						</InputGroup>
						<Button variant='primary' type='submit' onClick={submit}>
							Submit
						</Button>
					</Form.Group>
				</Form>
			) : null}
			{reviews ? reviews.map((review) => <ReviewCard review={review} />) : null}
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		reviews: state.restaurantFilter.reviews,
		restaurant: state.restaurantFilter.restaurant,
		authenticated: state.authentication.authenticated,
		user: state.authentication.user,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onAddReview: (review) => dispatch(actions.addReview(review)),
		onGetReviewsById: (restaurantId) => dispatch(actions.getReviewsById(restaurantId)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Reviews);
