const User = require("../models/Users");
const Thoughts = require("../models/Thoughts");

module.exports = {
  //
  /////////////////////////
  //                     //
  //    GET ALL USERS    //
  //                     //
  /////////////////////////
  // GET -> -> http://localhost:3001/api/users <- <- GET //
  getUsers(req, res) {
    User.find()
      .then(users => res.json(users))
      .catch(err => res.status(500).json(err));
  },
  //
  //////////////////////////
  //                      //
  //    GET USER BY ID    //
  //                      //
  //////////////////////////
  // GET -> -> http://localhost:3001/api/users/{ID} <- <- GET //
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      // .populate("thoughts")
      .select("-__v")
      .then(user =>
        !user
          ? res.status(404).json({ message: "No user with that ID" })
          : res.json(user)
      )
      .catch(err => res.status(500).json(err));
  },
  //
  /////////////////////////////
  //                         //
  //    CREATE A NEW USER    //
  //                         //
  /////////////////////////////
  // POST -> -> http://localhost:3001/api/users <- <- POST //
  createUser(req, res) {
    User.create(req.body)
      .then(dbUserData => res.json(dbUserData))
      .catch(err => res.status(500).json(err));
  },
  //
  /////////////////////////////
  //                         //
  //    UPDATE USER BY ID    //
  //                         //
  /////////////////////////////
  // PUT -> -> http://localhost:3001/api/users/{ID} <- <- PUT //
  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { runValidators: true }
    )
      .then(userData =>
        !userData
          ? res.status(404).json({ message: "No user with this id!" })
          : res.json(userData)
      )
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  //
  /////////////////////////////
  //                         //
  //    DELETE USER BY ID    //
  //                         //
  /////////////////////////////
  // DELETE -> -> http://localhost:3001/api/users/{ID} <- <- DELETE //
  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.userId })
      .then(user =>
        !user
          ? res.status(404).json({ message: "No user with that ID" })
          : Thoughts.deleteMany({ _id: { $in: user.thoughts } })
      )
      .then(() =>
        res.json({ message: "User and associated thoughts deleted!" })
      )
      .catch(err => res.status(500).json(err));
  },
};
