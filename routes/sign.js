const bcrypt = require("bcrypt");
const { Router } = require("express");
const User = require("../models/User.js");
const router = Router();
// signup route

router.get("/sign", (_, res) => res.render("sign"));

router.post("/sign", async (req, res) => {
	try {
		const body = req.body;

		if (!(body.Email && body.Password)) {
			return res.status(400).send({ error: "Data not formatted properly" });
		}

		// creating a new mongoose doc from user data
		const user = new User(body);
		// generate salt to hash password
		const salt = await bcrypt.genSalt(10);
		// now we set user password to hashed password
		user.Salt = salt;
		user.Password = await bcrypt.hash(body.Password, salt);
		await user.save();
		res.redirect("/login");
	} catch (err) {
		res.status(500).json(err);
		console.log(err);
	}
});

module.exports = router;
