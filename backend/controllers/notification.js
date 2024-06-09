const { User, Notification } = require("../model");
const { StatusCodes } = require("http-status-codes");

const {
  notificationValidationSchema,
  objectIdValidationSchema,
  notificationUpdateValidationSchema,
} = require("../utils/validation");

const { validationErrorMessage } = require("../utils/format/error-msg");

const { sendNotification } = require("../config/firebase")


/**
 * @desc creates a new notification
 * @method POST /api/notification
 * @param title string
 * @param body string
 * @param image string
 * @param receivers []
 */
exports.createNotification = async (req, res, next) => {
  try {
    const { userId } = req;

    // validate notification input
    const { error, data } = notificationValidationSchema.safeParse(req.body);
    if (error) {
      return res.status(StatusCodes.BAD_REQUEST)
        .json({ error: validationErrorMessage(error) });
    }
    // create notification
    const notification = await Notification.create({ ...data, createdBy: userId });

    return res.status(StatusCodes.CREATED)
      .json({ message: "Notification created successfully.", notification });
  } catch (error) {
    next(error);
  }
}


/**
 * @desc get all notifications
 * @method GET /api/notification
 */
exports.getNotifications = async (req, res, next) => {
  try {
    const { userId } = req;
    // get notifications where it is creator or mentioned
    const notifications = await Notification.find({
      $or: [
        { createdBy: userId },
        { receivers: userId }
      ]
    });
    return res.status(StatusCodes.OK)
      .json({ message: "Notifications fetched successfully.", notifications });
  } catch (error) {
    next(error);
  }
}


/**
 * @desc delete notification
 * @method DELETE /api/notification/:notificationId
 */
exports.deleteNotification = async (req, res, next) => {
  try {
    const { userId } = req;
    // get and validate notificationId from params
    const { notificationId = "" } = req.params;
    const { error } = objectIdValidationSchema.safeParse(notificationId);
    if (error) {
      return res.status(StatusCodes.BAD_REQUEST)
        .json({ error: validationErrorMessage(error, "Notification Id: ") });
    }

    // Find user
    const user = await User.findOne({ _id: userId });
    if (!user) {
      return res.status(StatusCodes.NOT_FOUND)
        .json({ error: "User not found" });
    }

    // Find notification
    const notification = await Notification.findOne({ _id: notificationId, createdBy: userId });
    if (!notification) {
      return res.status(StatusCodes.NOT_FOUND)
        .json({ error: "Notification not found" });
    }

    // delete notification
    const result = await Notification.deleteOne({ _id: notificationId })
    // console.log('notification delete result', result)
    // if no notification deleted
    if (result.deletedCount === 0) {
      return res.status(StatusCodes.NOT_FOUND)
        .json({ error: "Notification not found" });
    }

    return res.status(StatusCodes.OK)
      .json({ message: "Notification deleted successfully." });
  } catch (error) {
    next(error);
  }
}



/**
 * @desc update notification by id
 * @method PATCH /api/notification/:notificationId
 */
exports.updateNotification = async (req, res, next) => {
  try {
    const { userId } = req;
    // get and validate notificationId from params
    const { notificationId = "" } = req.params;
    const idValidationResult = objectIdValidationSchema.safeParse(notificationId);
    if (idValidationResult.error) {
      return res.status(StatusCodes.BAD_REQUEST)
        .json({ error: validationErrorMessage(idValidationResult.error, "Notification Id: ") });
    }
    // validate notification input
    const { error, data } = notificationUpdateValidationSchema.partial().safeParse(req.body);
    if (error) {
      return res.status(StatusCodes.BAD_REQUEST)
        .json({ error: validationErrorMessage(error) });
    }

    // update notification
    const result = await Notification.findOneAndUpdate({ _id: notificationId, createdBy: userId }, { ...data })

    return res.status(StatusCodes.OK)
      .json({ message: "Notification updated successfully." });
  } catch (error) {
    next(error);
  }
}


/**
 * @desc get notification by id
 * @method GET /api/notification/:notificationId
 */
exports.getNotification = async (req, res, next) => {
  try {
    const { userId } = req;
    // get and validate notificationId from params
    const { notificationId = "" } = req.params;
    const { error } = objectIdValidationSchema.safeParse(notificationId);
    if (error) {
      return res.status(StatusCodes.BAD_REQUEST)
        .json({ error: validationErrorMessage(error, "Notification Id: ") });
    }
    // find notification
    const notification = await Notification.findOne({ _id: notificationId, createdBy: userId });
    return res.status(StatusCodes.OK)
      .json({ message: "Notification fetched successfully.", notification });
  } catch (error) {
    next(error);
  }
}



/**
 * @desc send notification to user
 * @method POST /api/notification/send
 */
exports.sendNotificationThroughFirebase = async (req, res, next) => {
  try {
    const { userId } = req;
    const notifications = await Notification.find({
      $or: [
        { receivers: { $in: [userId] } },
        { receivers: { $size: 0 } },
      ]
    });

    const { token } = req.body;
    if (!token) {
      return res.status(StatusCodes.BAD_REQUEST)
        .json({ error: "Token is required for sending notifications." });
    }

    notifications.forEach(async notification => {
      // console.log(notification.title)
      try {
        await sendNotification(token, notification);

      } catch (error) {
        console.log(error, "Error sending notification");
      }
    })

    return res.status(StatusCodes.OK)
      .json({ message: "Notification fetched successfully.", notifications });
  } catch (error) {
    next(error);
  }
}