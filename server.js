const express = require("express");
const mongodb = require("mongoose");
const expressSession = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const path = require("path");
const filter = require("leo-profanity");

const passConf = require("./config/passport.js");
const isLoggedIn = require("./controllers/loggedCheck.js");

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
  res.locals.error = req.flash("error");

  next();
});

app.set("view engine", "ejs");

app.get("/form", (req, res) => {
  res.render("form", {
    user: req.user,
    isLoggedIn: req.isAuthenticated(),
  });
});

app.get("/logout", (req, res) => {
  req.logout();
  req.flash("successMessage", "You have been logged out");
  res.redirect("/login");
});

app.get("/unauthorized", (req, res) => {
  const status = 401;

  res.status(status).render("error", {
    msg: "You have to log in before accesing this site",
    status,
  });
});

app.get("/", isLoggedIn, (req, res) => {
  console.log(req.user);
  console.log(req.User);
  res.render("form");
});

app.get("/index", (req, res) => {
  res.render("index");
});

app.use("/", require("./routes/kittens.js"));
app.use("/", require("./routes/auth.js"));
app.use("/", require("./routes/sign.js"));

app.use((req, res) => {
  res.render("error", { status: 404 });
});

app.listen(3000, () => console.log("http://localhost:3000"));
