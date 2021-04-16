import React from 'react';
import * as classes from './Layout.module.css';

import Navigation from '../Navigation/Navigation';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Layout = (props) => {
	return (
		<Container className={classes.Layout}>
			<Row>
				<Col>
					<Navigation />
				</Col>
			</Row>
			<Row>{props.children}</Row>
		</Container>
	);
};

export default Layout;
