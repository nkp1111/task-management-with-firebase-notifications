const router = require("express").Router({ mergeParams: true });

const {
  createUser,
  getUsers,
  deleteUser,
  updateUser,
  getUser,
} = require("../controllers/user");

const { isValidUser } = require("../middleware/valid-user");
const { isUserAuthorized } = require("../middleware/user-permission")

router.route("/").get(getUsers).post(createUser);

router.use(isValidUser, isUserAuthorized);
router.route("/:userId").get(getUser).patch(updateUser).delete(deleteUser);

module.exports = router;