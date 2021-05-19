const router = require('express').Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
let User = require('../models/user.model');

router.route('/login').post((req, res, next) => {
	passport.authenticate('local', (err, user, info) => {
		if (err) return next(err);
		if (!user) {
			res.send("User with this email doesn't exist");
		} else {
			req.logIn(user, (err) => {
				if (err) return next(err);
				return res.send({
					_id: user._id,
					firstName: user.firstName,
					lastName: user.lastName,
					emailAddress: user.emailAddress,
				});
			});
		}
	})(req, res, next);
});

router.route('/register').post((req, res) => {
	User.findOne({ emailAddress: req.body.emailAddress }, (err, user) => {
		if (err) throw err;
		if (user) res.send('User already exists!');
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
							res.json('User successfully registered!');
						})
						.catch((err) => res.status(400).json('Error: ' + err));
				})
			);
		}
	});
});

router.route('/get').get((req, res) => {
	console.log(req.body);
});

router.route('/logout').get((req, res) => {
	req.logout();
	res.json('User logged out!');
});

module.exports = router;
