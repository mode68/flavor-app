const router = require('express').Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
let User = require('../models/user.model');

router.route('/login').post((req, res, next) => {
	passport.authenticate('local', (err, user, info) => {
		if (err) return next(err);
		if (!user) {
			// return next('Authentication failed. ' + info.message);
			return res.send({ success: false, message: info.message });
		} else {
			req.logIn(user, (err) => {
				if (err) return next(err);
				return res.send({
					success: true,
					user: {
						_id: user._id,
						firstName: user.firstName,
						lastName: user.lastName,
						emailAddress: user.emailAddress,
					},
				});
			});
		}
	})(req, res, next);
});

router.route('/register').post((req, res) => {
	User.findOne({ emailAddress: req.body.emailAddress }, (err, user) => {
		if (err) throw err;
		if (user) res.send({ success: false, message: 'Email address already taken!' });
		if (!user) {
			const newUser = new User({
				emailAddress: req.body.emailAddress,
				firstName: req.body.firstName,
				lastName: req.body.lastName,
			});
			bcrypt.genSalt(10, (err, salt) =>
				bcrypt.hash(req.body.password, salt, (err, hash) => {
					if (err) throw err;
					newUser.password = hash;
					newUser
						.save()
						.then(() => {
							res.send({ success: true, message: 'Registration complete!' });
						})
						.catch((err) => res.status(400).json('Error: ' + err));
				})
			);
		}
	});
});

router.route('/checkauth').post((req, res) => {
	console.log(req.isAuthenticated());
	if (req.user) {
		console.log('user is authenticated!');
		return next();
	} else {
		console.log('user is NOT authenticated!');
		return res.status(401).json({ error: 'User not authenticated' });
	}
});

router.route('/').get((req, res) => {
	console.log(req);
	// res.send(req);
});

router.route('/logout').get((req, res) => {
	req.logout();
	res.send({ success: true, message: 'Logged out successfully!' });
});

module.exports = router;
