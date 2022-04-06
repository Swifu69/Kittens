const mongoDb = require("mongoose");

const kittenSchema = new mongoDb.Schema(
	{
		Name: { type: String },
		URL: { type: String },
		Desc: { type: String },
		Date: { type: Date, default: Date.now },
		Owner: {
			type: mongoDb.Types.ObjectId,
			required: true,
			ref: "user",
		},
	},
	{
		toJSON: {
			transform(doc, ret) {
				ret.Id = ret._id;
				delete ret._id;
				delete ret.__v;
			},
		},
	}
);

const Kitten = mongoDb.model("Kitten", kittenSchema);

module.exports = Kitten;
