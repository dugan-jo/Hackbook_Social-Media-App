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
// GET || POST -> -> http://localhost:3001/api/users <- <- GET || POST //
router.route("/").get(getUsers).post(createUser);

// GET || DELETE || PUT -> -> http://localhost:3001/api/users/{userID} <- <- GET || DELETE || PUT //
router.route("/:userId").get(getSingleUser).delete(deleteUser).put(updateUser);

//
//
/////////////////////////
//                     //
//    FRIEND ROUTES    //
//                     //
/////////////////////////
// POST -> -> http://localhost:3001/api/users/{userId}/friend <- <- POST //
router.route("/:userId/friend").post(addFriend);

// DELETE -> -> http://localhost:3001/api/users/{userId}/friend/{friendId} <- <- DELETE //
router.route("/:userId/friend/:friendId").delete(deleteFriend);

module.exports = router;
