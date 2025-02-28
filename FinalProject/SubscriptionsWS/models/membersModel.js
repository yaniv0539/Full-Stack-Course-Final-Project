const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const membersSchema = new Schema({
  Name: { type: String, required: true },
  Email: { type: String, required: true },
  City: { type: String, required: true },
});

module.exports = mongoose.model("member", membersSchema);
