const { Thoughts, Users } = require("../models");

module.exports = {
  ////////////////////////////
  //                        //
  //    GET ALL THOUGHTS    //
  //                        //
  ////////////////////////////
  getThoughts(req, res) {
    Thoughts.find()
      .then(thoughts => res.json(thoughts))
      .catch(err => res.status(500).json(err));
  },

  ////////////////////////////////////
  //                                //
  //    GET SINGLE THOUGHT BY ID    //
  //                                //
  ////////////////////////////////////
  //   getSingleThought(req, res) {
  //     Thoughts.findOne({ _id: req.params.userId })
  //       .select("-__v")
  //       .then(user =>
  //         !user
  //           ? res.status(404).json({ message: "No user with that ID" })
  //           : res.json(user)
  //       )
  //       .catch(err => res.status(500).json(err));
  //   },

  ////////////////////////////////
  //                            //
  //    CREATE A NEW THOUGHT    //
  //                            //
  ////////////////////////////////
  // POST -> -> http://localhost:3001/api/thoughts <- <- POST //
  createThought(req, res) {
    console.log(req.body),
      Thoughts.create(req.body)

        .then(thought => {
          console.log(thought);
          return Users.findOneAndUpdate(
            { _id: req.body.userId },
            { $addToSet: { thoughts: thought._id } },
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
};
