const Users = require("../models/Users");
const Thoughts = require("../models/Thoughts");
const Reaction = require("../models/Reaction");

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
      .then(thoughts => res.json(thoughts))
      .catch(err => res.status(500).json(err));
  },

  //
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
          : res.json(req.body)
      )
      .catch(err => res.status(500).json(err));
  },

  //
  //
  ////////////////////////////////
  //                            //
  //    CREATE A NEW THOUGHT    //
  //                            //
  ////////////////////////////////
  // POST -> -> http://localhost:3001/api/thoughts <- <- POST //
  createThought(req, res) {
    Thoughts.create(req.body)
      .then(thought => {
        return Users.findOneAndUpdate(
          { _id: req.body.userId },
          { $addToSet: { thoughts: thought._id } },
          { new: true }
        );
      })
      .then(user =>
        !user
          ? res.status(404).json({
              message: "Thought created, but found no user with that ID",
            })
          : res.json(req.body)
      )
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  //
  //
  ////////////////////////////////
  //                            //
  //    EDIT A THOUGHT BY ID    //
  //                            //
  ////////////////////////////////
  // PUT -> -> http://localhost:3001/api/thoughts/{ID} <- <- PUT //
  updateThought(req, res) {
    return Thoughts.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true }
    )
      .then(thoughtData =>
        !thoughtData
          ? res.status(404).json({ message: "No thought with this id!" })
          : res.json(req.body)
      )
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  //
  //
  ////////////////////////////
  //                        //
  //    DELETE A THOUGHT    //
  //                        //
  ////////////////////////////
  // DELETE -> -> http://localhost:3001/api/thoughts/{ID} <- <- DELETE //
  deleteThought(req, res) {
    Thoughts.findOneAndRemove({ _id: req.params.thoughtId })
      .then(thought =>
        !thought
          ? res.status(404).json({ message: "No thought with this id!" })
          : res.json({ message: "Thought deleted" })
      )
      .catch(err => res.status(500).json(err));
  },

  //
  //
  //////////////////////////////////
  //                              //
  //    CREATE A NEW REACTIONS    //
  //                              //
  //////////////////////////////////
  // POST -> -> http://localhost:3001/api/{thoughtsID}/reaction <- <- POST //
  createReaction(req, res) {
    Thoughts.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body } },
      { new: true }
    )
      .then(thought =>
        !thought
          ? res.status(404).json({ message: "No Thought with this id!" })
          : res.json(req.body)
      )
      .catch(err => res.status(500).json(err));
  },

  //
  //
  /////////////////////////////
  //                         //
  //    DELETE A REACTION    //
  //                         //
  /////////////////////////////
  // DELETE -> -> http://localhost:3001/api/{thoughtsID}/reaction/{reactionID} <- <- DELETE //
  deleteReaction(req, res) {
    Thoughts.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { _id: req.params.reactionId } } },
      { runValidators: true, new: true }
    )
      .then(reactionData => {
        !reactionData
          ? res.status(404).json({
              message: "Reaction created, but no thought with that ID found",
            })
          : res.json("Reaction deleted! 🎉", reactionData);
      })
      .catch(err => res.status(500).json(err));
  },
};
