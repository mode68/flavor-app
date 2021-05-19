const bcrypt = require('bcryptjs');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const User = require('./models/user.model');

module.exports = function (passport) {
	// passport.use(
	// 	new LocalStrategy((emailAddress, password, done) => {
	// 		User.findOne({ emailAddress: emailAddress }).then((err, user) => {
	// 			if (!user) throw done(null, false, { message: 'That email is not registered' });
	// 			if (err) throw err;
	// 			bcrypt.compare(password, user.password, (err, isMatch) => {
	// 				if (err) throw err;
	// 				if (isMatch) {
	// 					return done(null, user);
	// 				} else {
	// 					return done(null, false, { message: 'Password incorrect' });
	// 				}
	// 			});
	// 		});
	// 	})
	// );

	passport.use(
		new LocalStrategy({ usernameField: 'emailAddress' }, (emailAddress, password, done) => {
			User.findOne({ emailAddress: emailAddress })
				.then((user) => {
					if (!user) return done(null, false, { message: 'That email is not registered' });

					bcrypt.compare(password, user.password, (err, isMatch) => {
						if (err) throw err;
						if (isMatch) {
							return done(null, user);
						} else {
							return done(null, false, { message: 'Password incorrect' });
						}
					});
				})
				.catch((err) => console.log(err));
		})
	);

	passport.serializeUser((user, done) => {
		done(null, user.id);
	});

	passport.deserializeUser((id, done) => {
		User.findOne({ _id: id }).then((err, user) => {
			done(err, user);
		});
	});
};
