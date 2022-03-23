const mongoDb = require("mongoose");

const kittenSchema = new mongoDb.Schema({
	Name: { type: String },
	URL: { type: String },
	Desc: { type: String },
	Dato: { type: String },
});

const Kitten = mongoDb.model("Kitten", kittenSchema);

module.exports = Kitten;
