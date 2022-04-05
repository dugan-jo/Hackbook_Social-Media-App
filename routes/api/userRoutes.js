const router = require("express").Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  //   deleteUser,
  //   addThought,
  //   removeThought,
} = require("../../controllers/userController");

// /api/users
router.route("/").get(getUsers).post(createUser);
router.route("/:userId").get(getSingleUser);

module.exports = router;
