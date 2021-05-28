module.exports.isAuth = (req, res, next) => {
	if (req.isAuthenticated()) {
		console.log('You are authenticated');
		next();
	} else {
		console.log('You are NOT authenticated');
		res.redirect('/user/not-authenticated');
	}
};
