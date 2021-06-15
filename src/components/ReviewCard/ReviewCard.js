import React from 'react';
import Card from 'react-bootstrap/Card';
import * as classes from './ReviewCard.module.css';
import profileImagePlaceholder from '../../assets/images/profile-placeholder.jpg';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import StarRating from '../StarRating/StarRating';

const ReviewCard = ({ review }) => {
	return (
		<>
			<Container className={classes.Review}>
				<Row>
					<Col xs={5} md={3}>
						<Image src={profileImagePlaceholder} rounded />
						{review.reviewAuthorFirstName + ' ' + review.reviewAuthorLastName}
					</Col>
					<Col xs={7} md={9}>
						<br />
						<StarRating rating={review.overallScore} />
						Money spent: ~{review.moneySpent}€
					</Col>
				</Row>
				<Row>
					<Col xs={5} md={3} style={{ paddingTop: '10px' }}>
						<Row>
							<Col xs={10} md={9}>
								Food
							</Col>
							<Col xs={2} md={1}>
								{review.foodScore}
							</Col>
						</Row>
						<Row>
							<Col xs={10} md={9}>
								Atmosphere
							</Col>
							<Col xs={2} md={1}>
								{review.atmosphereScore}
							</Col>
						</Row>
						<Row>
							<Col xs={10} md={9}>
								Service
							</Col>
							<Col xs={2} md={1}>
								{review.serviceScore}
							</Col>
						</Row>
						<Row>
							<Col xs={10} md={9}>
								Cost performance
							</Col>
							<Col xs={2} md={1}>
								{review.costPerformanceScore}
							</Col>
						</Row>
					</Col>
					<Col xs={7} md={9}>
						<div className={classes.ReviewBody}>
							<Card.Header>
								<Card.Title>{review.title}</Card.Title>
							</Card.Header>
							<Card.Body>
								<Card.Text>{review.review}</Card.Text>
							</Card.Body>
							<Card.Footer className='text-muted'>
								Visit date: {review.dateOfVisit.slice(0, 10)}
							</Card.Footer>
						</div>
					</Col>
				</Row>
			</Container>
		</>
	);
};

export default ReviewCard;
