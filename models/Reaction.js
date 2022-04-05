const { Schema, model } = require("mongoose");

const ReactionSchema = new Schema({
  thoughtBody: {
    type: String,
    required: true,
    max_length: 280,
  },
  username: req.body._ID,
  createdAt: { type: Date, required: true },
});
