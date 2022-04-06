const { Schema, model } = require("mongoose");

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
        match: [
          /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
          "Please fill a valid email address",
        ],
      },
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Thoughts",
      },
    ],
    // friends: [userSchema],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: true,
  }
);
userSchema.virtual("friends").get(function () {
  ///////////////////////////////
  //                           //
  //    WHAT DO WE RETURN?     //
  //                           //
  ///////////////////////////////
});

const User = model("User", userSchema);
module.exports = User;
