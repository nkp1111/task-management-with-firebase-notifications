const { Notification, User } = require("../../model");

const {
  notificationValidationSchema,
} = require("../validation");


exports.addNewNotification = async (createdBy, data, type) => {

  try {
    const { startTime = "", endTime = "", attendees = [], title = "" } = data;

    console.log(data, 'on add new notification')

    const user = await User.findOne({ _id: createdBy });
    if (!user) return;

    const userName = user?.name?.firstName + " " + user?.name?.lastName;

    let notificationInfo = {
      createdBy,
      receivers: [],
    }

    if (type === "meeting") {
      notificationInfo = {
        ...notificationInfo,
        receivers: attendees,
        title: "Meeting scheduled",
        body: `New meeting is scheduled with ${userName} on ${startTime}. The meeting is scheduled to end on ${endTime}. The subject of meeting is ${title}.`,
      }
    }

    else if (type === "ticket") {
      notificationInfo = {
        ...notificationInfo,
        title: "A ticket is opened",
        body: `A ticket is ${data.status} of *${data.type}* type. It is started by ${userName}.`,
      }
    }

    else {
      notificationInfo = {
        ...notificationInfo,
        ...data,
      }
    }

    // validate notification input
    const { error, data: notificationData } = notificationValidationSchema.safeParse(notificationInfo);
    if (error) {
      // console.log(
      //   "Error during creating notifications", error
      // )
      return;
    }

    // create notification
    const notification = await Notification.create({ ...notificationData, createdBy });
    return notification;
  } catch (error) {
    console.log("Server error during notification addition", error);
    return;
  }
}