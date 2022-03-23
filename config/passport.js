const PasslocStrat = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const User = require("../models/User");
const God = require("../models/God");

const passConf = (passport) => {
	passport.use(
		new PasslocStrat(
			{ usernameField: "email" },
			async (email, password, done) => {
				try {
					let users = User.findOne({ Email: email });
					let gods = God.findOne({ Email: email });

					let list = await Promise.all([users, gods]);

					let user = list.find((user) => user.Email == email);
					if (user) {
						// if (user.Password === password) return done(null, user);
						// else return done(null, false, { message: "No user found" })
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
		console.log("test");
		done(null, user.id);
	});

	passport.deserializeUser(async (id, done) => {
		try {
			const user = await User.findById(id);
			const god = await God.findById(id);

			const result = user || god;

			console.log(result);
			done(null, user);
		} catch (err) {
			done(err, null);
		}
	});
};

module.exports = passConf;
