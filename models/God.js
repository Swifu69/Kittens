const mongoDb = require("mongoose");

const GodSchema = new mongoDb.Schema({
  Email: { type: String, required: true },
  Password: { type: String, required: true, isGod: true },
});

const God = mongoDb.model("God", GodSchema);

module.exports = God;
