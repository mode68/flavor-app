import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

const LoginForm = ({ onAddUser, onUserLogin, isAuthenticated }) => {
	const history = useHistory();
	const [isLogin, setIsLogin] = useState(true);
	const [loginForm, setLoginForm] = useState({
		emailAddress: '',
		password: '',
		rememberMe: false,
	});
	const [signUpForm, setSignUpForm] = useState({
		firstName: '',
		lastName: '',
		emailAddress: '',
		password: '',
		repeatedPassword: '',
	});

	useEffect(() => {
		if (isAuthenticated) {
			history.push('/');
		}
	}, [isAuthenticated]);

	const onLoginFormChange = (event, fieldName, checkbox = false) => {
		const updatedLoginForm = { ...loginForm };
		updatedLoginForm[fieldName] = checkbox ? event.target.checked : event.target.value;
		setLoginForm(updatedLoginForm);
	};

	const onSignUpFormChange = (event, fieldName) => {
		const updatedSignUpForm = { ...signUpForm };
		updatedSignUpForm[fieldName] = event.target.value;
		setSignUpForm(updatedSignUpForm);
	};

	return isLogin ? (
		<Form>
			<Form.Group controlId='formBasicEmail'>
				<Form.Label>Email address</Form.Label>
				<Form.Control
					type='email'
					placeholder='Enter email'
					onChange={(event) => onLoginFormChange(event, 'emailAddress')}
				/>
			</Form.Group>

			<Form.Group controlId='formBasicPassword'>
				<Form.Label>Password</Form.Label>
				<Form.Control
					type='password'
					placeholder='Password'
					onChange={(event) => onLoginFormChange(event, 'password')}
				/>
			</Form.Group>
			<Form.Group controlId='formBasicCheckbox'>
				<Form.Check
					type='checkbox'
					label='Remember me'
					onChange={(event) => onLoginFormChange(event, 'rememberMe', true)}
				/>
			</Form.Group>
			<Button
				variant='primary'
				type='submit'
				onClick={(e) => {
					e.preventDefault();
					onUserLogin(loginForm);
				}}
			>
				Login
			</Button>

			<Form.Text className='text-muted'>
				Don't have an account?{' '}
				<a
					onClick={() => {
						setIsLogin(false);
					}}
				>
					Sign up
				</a>
			</Form.Text>
		</Form>
	) : (
		<Form>
			<Form.Group controlId='formBasicEmail'>
				<Form.Label>First name</Form.Label>
				<Form.Control
					type='firstname'
					placeholder='Enter first name'
					onChange={(event) => onSignUpFormChange(event, 'firstName')}
				/>
			</Form.Group>
			<Form.Group controlId='formBasicEmail'>
				<Form.Label>Last name</Form.Label>
				<Form.Control
					type='lastname'
					placeholder='Enter last name'
					onChange={(event) => onSignUpFormChange(event, 'lastName')}
				/>
			</Form.Group>
			<Form.Group controlId='formBasicEmail'>
				<Form.Label>Email address</Form.Label>
				<Form.Control
					type='email'
					placeholder='Enter email'
					onChange={(event) => onSignUpFormChange(event, 'emailAddress')}
				/>
			</Form.Group>
			<Form.Group controlId='formBasicPassword'>
				<Form.Label>Choose a password</Form.Label>
				<Form.Control
					type='password'
					placeholder='Password'
					onChange={(event) => onSignUpFormChange(event, 'password')}
				/>
			</Form.Group>
			<Form.Group controlId='formRepeatPassword'>
				<Form.Label>Repeat your password</Form.Label>
				<Form.Control
					type='password'
					placeholder='Reapeat password'
					onChange={(event) => onSignUpFormChange(event, 'repeatedPassword')}
				/>
			</Form.Group>
			<Button
				variant='primary'
				type='submit'
				onClick={(e) => {
					e.preventDefault();
					onAddUser(signUpForm);
				}}
			>
				Sign up
			</Button>
			<Form.Text className='text-muted'>
				Don't have an account?{' '}
				<a
					onClick={() => {
						setIsLogin(true);
					}}
				>
					Sign in
				</a>
			</Form.Text>
		</Form>
	);
};

const mapStateToProps = (state) => {
	return {
		user: state.authentication.user,
		token: state.authentication.token,
		loading: state.authentication.loading,
		isAuthenticated: state.authentication.isAuthenticated,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onAddUser: (signUpForm) => dispatch(actions.addUser(signUpForm)),
		onUserLogin: (loginForm) => dispatch(actions.loginUser(loginForm)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
