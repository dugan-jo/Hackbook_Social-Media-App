const router = require("express").Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  deleteUser,
  updateUser,
  addFriend,
  deleteFriend,
} = require("../../controllers/userController");

//
//
///////////////////////
//                   //
//    USER ROUTES    //
//                   //
///////////////////////
// GET || POST -> -> api/users <- <- GET || POST //
router.route("/").get(getUsers).post(createUser);

// GET || DELETE || PUT -> -> api/users/{userID} <- <- GET || DELETE || PUT //
router.route("/:userId").get(getSingleUser).delete(deleteUser).put(updateUser);

//
//
/////////////////////////
//                     //
//    FRIEND ROUTES    //
//                     //
/////////////////////////
// POST -> -> /{userId}/friend <- <- POST //
router.route("/:userId/friend").post(addFriend);

// DELETE -> -> /{userId}/friend/{friendId} <- <- DELETE //
router.route("/:userId/friend/:friendId").post(addFriend);

module.exports = router;
