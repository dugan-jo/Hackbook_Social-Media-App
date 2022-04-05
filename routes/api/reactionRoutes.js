const router = require("express").Router();
// DO I EVEN NEED THIS PAGE? IF REACTION IS A VIRTUAL OF THOUGHTS I DONT THINK I NEED THIS?
const {
  getReaction,
  getSingleReaction,
  createReaction,
  deleteReaction,
} = require("../../controllers/reactionController.js");

router.route("/").post(createReaction);
//   .put(updateReaction)
//   .delete(deleteReaction);

module.exports = router;
