const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const moviesSchema = new Schema({
  Name: { type: String, required: true },
  Genres: [{ type: String, required: true }],
  Image: { type: String, required: true },
  Premiered: { type: Date, required: true },
});

module.exports = mongoose.model("movie", moviesSchema);
