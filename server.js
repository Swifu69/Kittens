const express = require("express");
const mongodb = require("mongoose");
const expressSession = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const path = require("path");
const filter = require("leo-profanity");
const crypto = require("crypto").webcrypto;

//iporting passConf for to compare password
const passConf = require("./config/passport.js");
//Check if the user is logged in or not. Returns true or undefined
const isLoggedIn = require("./controllers/loggedCheck.js");

//config for mongoDB, port and secret
const config = require("./config/config.json");

const app = express();

passConf(passport);

//connecting to mongo
mongodb
	.connect(config.mongodb_uri, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => console.log("...Connected to MongoDB"))
	.catch(console.error);

app.use(express.urlencoded({ extended: true }));

//making things relative to public
app.use(express.static(path.join(__dirname, "/public")));

//session making
app.use(
	expressSession({
		// If no secret is provided generate a random one
		secret: config.secret || crypto.randomUUID(),
		resave: true,
		saveUninitialized: true,
	})
);

//passport
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

//flash messages config
app.use((req, res, next) => {
	res.locals.user = req.user;
	res.locals.errorMessage = req.flash("errorMessage");
	res.locals.successMessage = req.flash("successMessage");
	res.locals.error = req.flash("error");

	next();
});

app.set("view engine", "ejs");

//check if user is logged in. If isLoggedIn returns true, then render form.
app.get("/form", isLoggedIn, (req, res) => {
	res.render("form");
});

app.get("/form", (req, res) => {
	res.render("form", {
		user: req.user,
		isLoggedIn: req.isAuthenticated(),
	});
});

//Logout with flash message above form. Redirects to index
app.get("/logout", (req, res) => {
	req.logout();
	req.flash("successMessage", "You have been logged out");
	res.redirect("/");
});

//If isLoggedIn returns undefined
app.get("/unauthorized", (req, res) => {
	const status = 401;

	res.status(status).render("error", {
		msg: "You have to log in before accesing this site",
		status,
	});
});

// Oh index
app.get("/", (req, res) => {
	res.render("index"); // <-- this is the index omg :scream:
});

//Routes
app.use("/", require("./routes/kittens.js"));
app.use("/", require("./routes/auth.js"));
app.use("/", require("./routes/sign.js"));

//render when the url has invalid sites
app.use((req, res) => {
	res.render("error", { status: 404, msg: "Page not found" });
});

//starting the server kek
app.listen(isNaN(config.port) ? 3000 : config.port, () =>
	console.log("http://localhost:3000")
);
