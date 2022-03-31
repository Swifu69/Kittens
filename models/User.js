const mongoDb = require("mongoose");

const userSchema = new mongoDb.Schema({
	Email: { type: String, required: true, unique: true },
	Password: { type: String, required: true },
	Salt: { type: String, required: true },
	Role: { type: String, enum: ["user", "admin"], default: "user" },
});

const User = mongoDb.model("User", userSchema);

module.exports = User;
