module.exports.isAuth = (req, res, next) => {
	if (req.isAuthenticated()) {
		console.log('You are authenticated');
		next();
	} else {
		console.log('You are NOT authenticated');
		res.status(401).json({ message: 'You are not authorized to view this page' });
	}
};
