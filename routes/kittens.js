const express = require("express");
const router = express.Router();
const Kitten = require("../models/Kitten");

const { isValidHttpUrl, validPath } = require("../controllers/validate");

router
	.route("/table")
	.post(async (req, res) => {
		try {
			const errors = [];

			const { name, url, desc } = req.body;

			if (!name || !url) {
				errors.push("Please make sure to fill both fields!!!");
			}
			if (name.match(/\[a-zA-Z]+/)) {
				errors.push(
					"Make sure name is a actual name and not invalid characters!"
				);
			}
			if (!isValidHttpUrl(url)) {
				errors.push(
					"Not a valid url, make sure your link includes http:// or https://!!!"
				);
			}
			if (!validPath) {
				errors.push(
					"Not a valid file link. Make sure your link is image(.jpeg, .jpg or .png)"
				);
			}
			if (!errors.length) {
				const kitten = new Kitten({
					Name: name,
					URL: url,
					Desc: desc,
					Dato: new Date().toLocaleString("NB", {
						weekday: "long",
						year: "numeric",
						month: "short",
						day: "numeric",
					}),
				});
				console.log(kitten);
				await kitten.save();

				res.redirect("/table");
			} else {
				res.render("form", { errors });
			}
		} catch (err) {
			console.log(err);
		}
	})
	.get(async (req, res) => {
		try {
			let cats = await Kitten.find();
			res.render("table", { kittens: cats });
		} catch (err) {
			console.log(err);
		}
	});

module.exports = router;
