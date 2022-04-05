const { Schema, model } = require("mongoose");
const { Users } = require(".");
const ThoughtsSchema = require("./Thoughts");

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    email: {
      type: String,
      trim: true,
      unique: true,
      // required: 'Email address is required',
      // validate: [validateEmail, 'Please fill a valid email address'],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
    },
  },
  thoughts: [ThoughtsSchema],
  // friends: [userSchema]
  thoughts: [{ type: Schema.Types.ObjectId }, { ref: "thoughts" }],
});

const User = model("user", userSchema);

module.exports = User;
