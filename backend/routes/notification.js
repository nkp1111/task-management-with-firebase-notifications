const router = require("express").Router({ mergeParams: true });

const {
  getNotification,
  getNotifications,
  createNotification,
  updateNotification,
  deleteNotification,
  sendNotificationThroughFirebase,
} = require("../controllers/notification");

const { isValidUser } = require("../middleware/valid-user");
const { isUserAuthorized } = require("../middleware/user-permission")

router.use(isValidUser);
router.route("/").get(getNotifications).post(createNotification);

router.route("/send").post(sendNotificationThroughFirebase);

router.route("/:notificationId")
  .get(isUserAuthorized, getNotification)
  .patch(isUserAuthorized, updateNotification)
  .delete(isUserAuthorized, deleteNotification);

module.exports = router;