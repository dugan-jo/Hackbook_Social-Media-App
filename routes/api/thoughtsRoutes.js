const router = require("express").Router();

const {
  getThoughts,
  getThoughtById,
  createThought,
  updateThought,
  deleteThought,
  create,
} = require("../../controllers/thoughtsController.js");

router.route("/").post(createThought).get(getThoughts);
router
  .route("/:thoughtId")
  .delete(deleteThought)
  .put(updateThought)
  .get(getThoughtById);

module.exports = router;
