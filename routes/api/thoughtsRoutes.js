const router = require("express").Router();

const {
  getThoughts,
  // getSingleThought,
  createThought,
  // updateThought,
  // deleteThought,
} = require("../../controllers/thoughtsController.js");

router.route("/").post(createThought).get(getThoughts);
// .put(updateThought)
// .delete(deleteThought);

module.exports = router;
