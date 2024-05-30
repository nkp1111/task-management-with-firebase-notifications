const router = require("express").Router({ mergeParams: true });

const {
  createUser,
  getUsers,
  deleteUser,
  updateUser,
  getUser,

  loginUser,
  logoutUser,
} = require("../controllers/user");

const { isValidUser } = require("../middleware/valid-user");
const { isUserAuthorized } = require("../middleware/user-permission")

router.route("/").get(getUsers).post(createUser);

router.route("/auth").post(loginUser).get(logoutUser);

router.use(isValidUser, isUserAuthorized);
router.route("/:userId").get(getUser).patch(updateUser).delete(deleteUser);

module.exports = router;