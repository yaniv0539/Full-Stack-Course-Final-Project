const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const subscriptionsSchema = new Schema({
  MemberId: { type: Schema.Types.ObjectId, required: true },
  Movies: [
    {
      MovieId: { type: Schema.Types.ObjectId, required: true },
      Date: { type: Date, required: true },
    },
  ],
});

module.exports = mongoose.model("subscription", subscriptionsSchema);
