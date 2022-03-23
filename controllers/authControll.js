const passport = require("passport");

function login(req, res, next) {
	passport.authenticate("local", {
		successRedirect: "/table",
		failureRedirect: "/login",
		failureFlash: true,
	})(req, res, next);
}

module.exports = { login };
