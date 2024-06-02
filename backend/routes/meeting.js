const router = require("express").Router({ mergeParams: true });

const {
  createMeeting,
  updateMeeting,
  getMeetingById,
  getMeetings,
  deleteMeeting,
} = require("../controllers/meeting");

const { isValidUser } = require("../middleware/valid-user");
const { isUserAuthorized } = require("../middleware/user-permission")

router.use(isValidUser);
router.route("/").get(getMeetings).post(createMeeting);

router.route("/:meetingId")
  .get(isUserAuthorized, getMeetingById)
  .patch(isUserAuthorized, updateMeeting)
  .delete(isUserAuthorized, deleteMeeting);

module.exports = router;