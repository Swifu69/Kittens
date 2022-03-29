function isLoggedIn(req, res, next) {
	if (req.isAuthenticated()) {
		req.isLogged = true;
		return next();
	}
	res.redirect("/unauthorized");
}

module.exports = isLoggedIn;
