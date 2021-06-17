import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import * as actions from '../../store/actions/index';
import * as classes from './LoginForm.module.css';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

const LoginForm = ({ onAddUser, onUserLogin, authenticated, error, onClearError }) => {
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
		if (authenticated) {
			history.push('/');
		}
	}, [authenticated, history]);

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
			<div className={classes.FormTitle}>
				<label>LOGIN</label>
			</div>
			{error ? (
				<Alert variant='danger' dismissible onClose={onClearError}>
					{error}
				</Alert>
			) : null}
			<Form.Group controlId='formBasicEmail' className={classes.SigninField}>
				<Form.Label className={classes.LoginLabel}>Email address</Form.Label>
				<Form.Control
					type='email'
					placeholder='Enter email'
					onChange={(event) => onLoginFormChange(event, 'emailAddress')}
				/>
			</Form.Group>

			<Form.Group controlId='formBasicPassword' className={classes.SigninField}>
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
					href='#0'
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
			<div className={classes.FormTitle}>
				<label>REGISTER</label>
			</div>
			<Form.Group controlId='formBasicEmail' className={classes.SigninField}>
				<Form.Label>First name</Form.Label>
				<Form.Control
					type='firstname'
					placeholder='Enter first name'
					onChange={(event) => onSignUpFormChange(event, 'firstName')}
				/>
			</Form.Group>
			<Form.Group controlId='formBasicEmail' className={classes.SigninField}>
				<Form.Label>Last name</Form.Label>
				<Form.Control
					type='lastname'
					placeholder='Enter last name'
					onChange={(event) => onSignUpFormChange(event, 'lastName')}
				/>
			</Form.Group>
			<Form.Group controlId='formBasicEmail' className={classes.SigninField}>
				<Form.Label>Email address</Form.Label>
				<Form.Control
					type='email'
					placeholder='Enter email'
					onChange={(event) => onSignUpFormChange(event, 'emailAddress')}
				/>
			</Form.Group>
			<Form.Group controlId='formBasicPassword' className={classes.SigninField}>
				<Form.Label>Password</Form.Label>
				<Form.Control
					type='password'
					placeholder='Password'
					onChange={(event) => onSignUpFormChange(event, 'password')}
				/>
			</Form.Group>
			<Form.Group controlId='formRepeatPassword' className={classes.SigninField}>
				<Form.Label>Repeat password</Form.Label>
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
				Already have an account?{' '}
				<a
					href='#0'
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
		authenticated: state.authentication.authenticated,
		error: state.authentication.error,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onAddUser: (signUpForm) => dispatch(actions.addUser(signUpForm)),
		onUserLogin: (loginForm) => dispatch(actions.loginUser(loginForm)),
		onClearError: () => dispatch(actions.clearAuthError()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
