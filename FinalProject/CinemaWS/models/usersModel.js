const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const membersSchema = new Schema({
  Username: { type: String, required: true, unique: true },
  Password: String,
});

module.exports = mongoose.model("member", membersSchema);
