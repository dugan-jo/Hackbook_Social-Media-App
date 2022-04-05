const mongoose = require("mongoose");

const reactionSchema = new mongoose.Schema({
  reactionBody: {
    type: String,
    required: true,
    max_length: 280,
  },
  username: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
// const Reactions = model("reactions", reactionSchema);
module.exports = reactionSchema;
