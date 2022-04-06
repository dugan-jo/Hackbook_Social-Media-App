const { Schema, model } = require("mongoose");

//
//
///////////////////////
//                   //
//    USER SCHEMA    //
//                   //
///////////////////////
const userSchema = new Schema(
  {
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
        required: "Email address is required",
        // verifies if its an email.
        match: [
          /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
          "Please fill a valid email address",
        ],
      },
    },
    // creates the thoughtsId array in the user
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Thoughts",
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "user",
      },
    ],
  },

  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);
// creates a friend count variable.
userSchema.virtual("friendCount").get(function () {
  return this.friends.length;
});

//
/////////////////////////////////////
//                                 //
//    INITIALIZE THE USER MODEL    //
//                                 //
/////////////////////////////////////
const User = model("User", userSchema);
module.exports = User;
