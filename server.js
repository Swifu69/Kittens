const express = require("express");
const mongodb = require("mongoose");
const expressSession = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const path = require("path");

const passConf = require("./config/passport.js");

const app = express();

passConf(passport);

mongodb
	.connect("mongodb://10.12.8.65:27017/kittens", {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => console.log("Mongo er oppe lol"))
	.catch(console.error);

app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "/public")));

app.use(
	expressSession({ secret: "qq", resave: true, saveUninitialized: true })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

app.use((req, res, next) => {
	res.locals.user = req.user;
	res.locals.errorMessage = req.flash("errorMessage");
	res.locals.successMessage = req.flash("successMessage");
	next();
});

app.set("view engine", "ejs");

app.get("/", (req, res) => {
	res.render("form");
});

app.use("/", require("./routes/kittens.js"));
app.use("/", require("./routes/auth.js"));
app.use("/", require("./routes/sign.js"));

app.use((req, res) => {
	res.render("error", { status: 404 });
});

app.listen(3000, () => console.log("http://localhost:3000"));
