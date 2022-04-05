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

/////////////////////////////////////////////////
//                                             //
//    DO I NEED TO MAKE A REACTION VIRTUAL?    //
//                                             //
/////////////////////////////////////////////////

const Thoughts = model("thoughts", thoughtsSchema);
module.exports = Thoughts;
