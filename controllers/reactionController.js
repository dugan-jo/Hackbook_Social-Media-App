const { Reaction, Users } = require("../models");

module.exports = {
  ///////////////////////////////
  //                           //
  //    CREATE NEW REACTION    //
  //                           //
  ///////////////////////////////
  // POST  -> -> http://localhost:3001/api/reaction
  createReaction(req, res) {
    Reaction.create(req.body)
      .then(Thoughts => {
        return Users.findOneAndUpdate(
          { _id: req.body.userId },
          { $addToSet: { reaction: reaction._id } },
          { new: true }
        );
      })
      .then(user =>
        !user
          ? res.status(404).json({
              message: "Reaction created, but no user with that ID found",
            })
          : res.json("New reaction created 🎉")
      )
      .catch(err => res.status(500).json(err));
  },
  ///////////////////////////
  //                       //
  //    DELETE REACTION    //
  //                       //
  ///////////////////////////
};
