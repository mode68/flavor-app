const bcrypt = require('bcryptjs');
const LocalStrategy = require('passport-local').Strategy;
const User = require('./models/user.model');

module.exports = function (passport) {
	passport.use(
		new LocalStrategy({ usernameField: 'emailAddress' }, (emailAddress, password, done) => {
			User.findOne({ emailAddress: emailAddress })
				.then((user) => {
					if (!user) return done(null, false, { message: 'Email address not found' });

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
		done(null, user._id);
	});

	passport.deserializeUser((id, done) => {
		User.findById(id).then((user, err) => {
			if (err) {
				done(null, false, { error: err });
			} else {
				done(null, user);
			}
		});
	});
};
