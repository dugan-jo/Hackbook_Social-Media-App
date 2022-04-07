const router = require("express").Router();

const {
  getThoughts,
  getThoughtById,
  createThought,
  updateThought,
  deleteThought,
  createReaction,
  deleteReaction,
} = require("../../controllers/thoughtsController.js");

//
//
//////////////////////////
//                      //
//    THOUGHT ROUTES    //
//                      //
//////////////////////////
// POST || GET -> -> http://localhost:3001/api/thoughts <- <- POST || GET //
router.route("/").get(getThoughts);
router.route("/").post(createThought);

// PUT || GET || DELETE -> -> http://localhost:3001/api/thoughts/{thoughtsId} <- <- PUT || GET || DELETE //
router.route("/:thoughtId").delete(deleteThought);
router.route("/:thoughtId").put(updateThought);
router.route("/:thoughtId").get(getThoughtById);

//
//
///////////////////////////
//                       //
//    REACTION ROUTES    //
//                       //
///////////////////////////
// POST -> -> http://localhost:3001/api/thoughts/{thoughtsId}/reaction <- <- POST //
router.route("/:thoughtId/reaction").post(createReaction);

// DELETE -> -> http://localhost:3001/api/thoughts/{thoughtsId}/reaction/{reactionId} <- <- DELETE //
router.route("/:thoughtId/reaction/:reactionId").delete(deleteReaction);

module.exports = router;
