const Users = require("../models/Users");
const Thoughts = require("../models/Thoughts");

module.exports = {
  //
  ////////////////////////////
  //                        //
  //    GET ALL THOUGHTS    //
  //                        //
  ////////////////////////////
  // GET -> -> http://localhost:3001/api/thoughts <- <- GET //
  getThoughts(req, res) {
    Thoughts.find()
      .then(thoughtData => res.json(thoughtData))
      .catch(err => res.status(500).json(err));
  },

  //
  ///////////////////////////////
  //                           //
  //    GET A THOUGHT BY ID    //
  //                           //
  ///////////////////////////////
  // GET -> -> http://localhost:3001/api/thoughts/{ID} <- <- GET //
  getThoughtById(req, res) {
    Thoughts.findOne({ _id: req.params.thoughtId })
      .select("-__v")
      .then(thoughtData =>
        !thoughtData
          ? res.status(404).json({ message: "No thought with that ID" })
          : res.json(thoughtData)
      )
      .catch(err => res.status(500).json(err));
  },

  //
  ////////////////////////////////
  //                            //
  //    CREATE A NEW THOUGHT    //
  //                            //
  ////////////////////////////////
  // POST -> -> http://localhost:3001/api/thoughts <- <- POST //
  createThought(req, res) {
    // console.log(req.body),
    Thoughts.create(req.body)
      .then(thoughtData => {
        // console.log(thought);
        return Users.findOneAndUpdate(
          { _id: req.body.userId },
          { $addToSet: { thoughts: thoughtData._id } },
          { new: true }
        );
      })
      .then(user => {
        !user
          ? res.status(404).json({
              message: "Thought created, but no user with that ID found",
            })
          : res.json("New Thought created 🎉");
      })
      .catch(err => res.status(500).json(err));
  },

  //
  ////////////////////////////////
  //                            //
  //    EDIT A THOUGHT BY ID    //
  //                            //
  ////////////////////////////////
  // PUT -> -> http://localhost:3001/api/thoughts/{ID} <- <- PUT //
  updateThought(req, res) {
    Thoughts.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true }
    )
      .then(thoughtData =>
        !thoughtData
          ? res.status(404).json({ message: "No thoughtwith this id!" })
          : res.json(thoughtData)
      )
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  //
  ////////////////////////////
  //                        //
  //    DELETE A THOUGHT    //
  //                        //
  ////////////////////////////
  // DELETE -> -> http://localhost:3001/api/thoughts/{ID} <- <- DELETE //
  deleteThought(req, res) {
    Thoughts.findOneAndDelete({ _id: req.params.thoughtId });
  },
};
