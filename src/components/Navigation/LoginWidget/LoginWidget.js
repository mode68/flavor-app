import React, { useEffect, useState } from 'react';
import * as actions from '../../../store/actions/index';
import Nav from 'react-bootstrap/Nav';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Modal from '../../Modal/Modal';
import LoginForm from '../../../containers/LoginForm/LoginForm';

const LoginWidget = ({ authenticated, user, onUserLogout, onIsAuthenticated }) => {
	const [showLoginForm, setShowLoginForm] = useState(false);

	useEffect(() => {
		onIsAuthenticated();
	}, [onIsAuthenticated]);

	useEffect(() => {
		if (showLoginForm && authenticated) {
			setShowLoginForm(false);
		}
	}, [authenticated, showLoginForm]);

	const onModalClosed = () => {
		setShowLoginForm(false);
	};

	return (
		<div>
			{authenticated ? (
				<div>
					<div>
						Welcome {user.firstName} {user.lastName}!
					</div>
					<Button variant='outline-primary' onClick={onUserLogout}>
						Logout
					</Button>
				</div>
			) : (
				<Nav.Item>
					{/* <NavLink to='/login'>SIGN IN</NavLink> */}
					<Button
						variant='outline-primary'
						onClick={() => {
							setShowLoginForm(true);
						}}
					>
						SIGN IN
					</Button>
				</Nav.Item>
			)}
			{showLoginForm ? (
				<Modal show={showLoginForm} modalClosed={onModalClosed}>
					<LoginForm />
				</Modal>
			) : null}
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		user: state.authentication.user,
		authenticated: state.authentication.authenticated,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onUserLogout: () => dispatch(actions.logoutUser()),
		onIsAuthenticated: () => dispatch(actions.isAuthenticated()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginWidget);
