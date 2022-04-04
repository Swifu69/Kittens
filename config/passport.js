const PasslocStrat = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const User = require("../models/User");

const passConf = (passport) => {
	passport.use(
		new PasslocStrat(
			{ usernameField: "email" },
			async (email, password, done) => {
				try {
					let user = await User.findOne({ Email: email });

					if (user) {
						bcrypt.compare(password, user.Password, (err, match) => {
							if (err) throw err;
							if (match) return done(null, user);
							else return done(null, false, { message: "Incorrect Password" });
						});
					} else {
						return done(null, false, { message: "User not found" });
					}
				} catch (err) {
					console.log(err);
				}
			}
		)
	);

	passport.serializeUser((user, done) => {
		done(null, user.id);
	});

	passport.deserializeUser(async (id, done) => {
		try {
			const user = await User.findById(id);

			done(null, user);
		} catch (err) {
			done(err, null);
		}
	});
};

module.exports = passConf;
