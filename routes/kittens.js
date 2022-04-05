const express = require("express");
const filter = require("leo-profanity");
const router = express.Router();
const Kitten = require("../models/Kitten");

const { isValidHttpUrl, validPath } = require("../controllers/validate");

router
	.route("/table")
	.post(async (req, res) => {
		try {
			//   const profanity = ["Nigger", "Nibba", "nigga", "nibba", "﷽", "nigger"];
			//   const replaceProfanity = [
			//     "Beautifull",
			//     "Wholesome",
			//     "Funny",
			//     "Fruty",
			//     "Very Cute",
			//   ];

			filter.loadDictionary();

			const errors = [];

			const { name, url } = req.body;
			let desc = req.body.desc;

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

			//   profanity.forEach((word) => {
			//     console.log(word);
			//     if (desc.includes(word)) {
			//       const randomIndex = Math.round(
			//         Math.random() * replaceProfanity.length - 1
			//       );
			//       const wordq = replaceProfanity[randomIndex];

			//       desc = desc.replaceAll(word, wordq);
			//     }
			//   });

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
				await kitten.save();

				res.redirect("/table");
			} else {
				res.render("form", { errors });
			}
		} catch (err) {
			console.log(err);
		}
	})
	.get(async (_, res) => {
		try {
			let cats = await Kitten.find();
			res.render("table", { kittens: cats });
		} catch (err) {
			console.log(err);
		}
	});

router.delete("/delete/:id", async (req, res) => {
	const id = req.params.id;

	try {
		await Kitten.deleteOne({ _id: id });
		res.status(202).json({ redirect: "/table" });
	} catch (err) {
		console.log(err);
		res.redirect("/error");
	}
});

module.exports = router;
