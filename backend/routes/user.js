const router = require("express").Router({ mergeParams: true });

const {
  createUser,
  getUsers,
  deleteUser,
  updateUser,
  getUser,
} = require("../controllers/user");

router.route("/").get(getUsers).post(createUser);
router.route("/:userId").get(getUser).patch(updateUser).delete(deleteUser);

module.exports = router;