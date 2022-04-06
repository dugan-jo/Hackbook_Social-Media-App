// WHEN I PUT THIS IN, THE SERVER DOES NOT WORK AND I GET (ERR)
const { Schema, model } = require("mongoose");
const reactionSchema = require("./Reaction");

const thoughtsSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      max_length: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    username: {
      type: String,
      required: true,
    },

    reaction: [reactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: true,
  }
);
reactionSchema.virtual("reaction").get(function () {
  return res.body;
});

const Thoughts = model("thoughts", thoughtsSchema);
module.exports = Thoughts;
