const { Meeting, User } = require("../model");
const { StatusCodes, ReasonPhrases } = require("http-status-codes");
const { meetingValidationSchema, objectIdValidationSchema } = require("../utils/validation");

/**
 * @desc creates a new meeting
 * @method POST /api/meeting
 * @param title string
 * @param description string
 * @param startTime date
 * @param endTime date
 * @param attendees array of user IDs
 */
exports.createMeeting = async (req, res, next) => {
  try {
    const { userId } = req;

    // Validate user input
    const { error, data } = meetingValidationSchema.safeParse(req.body);
    if (error) {
      return res.status(StatusCodes.BAD_REQUEST).json({ error });
    }

    const meetingInfo = { ...data, createdBy: userId };
    const meeting = await Meeting.create(meetingInfo);

    return res.status(StatusCodes.CREATED)
      .json({ message: "Meeting created successfully.", meeting });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc get user and its employees (if applicable) meetings
 * @method GET /api/meeting
 */
exports.getMeetings = async (req, res, next) => {
  try {
    const { userId, role } = req;

    // Get user meetings
    const userMeetings = await Meeting.find({ createdBy: userId });

    if (role === "admin") {
      // Get employees' meetings as well
      const employees = await User.find({ adminId: userId, role: "employee" });
      const employeesId = employees.map(employee => employee._id);
      const employeesMeetings = await Meeting.find({ createdBy: { $in: employeesId } });

      return res.status(StatusCodes.OK)
        .json({ message: "Meetings fetched successfully.", userMeetings, employeesMeetings });
    }

    return res.status(StatusCodes.OK)
      .json({ message: "Meetings fetched successfully.", userMeetings });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc delete user meeting
 * @method DELETE /api/meeting/:meetingId
 */
exports.deleteMeeting = async (req, res, next) => {
  try {
    const { userId, role } = req;

    // Validate meeting ID from params
    const { meetingId = "" } = req.params;
    const { error } = objectIdValidationSchema.safeParse(meetingId);
    if (error) {
      return res.status(StatusCodes.BAD_REQUEST).json({ error });
    }

    // Find user
    const user = await User.findOne({ _id: userId });
    if (!user) {
      return res.status(StatusCodes.NOT_FOUND)
        .json({ error: "User not found" });
    }

    // Find meeting
    const meeting = await Meeting.findOne({ _id: meetingId });
    if (!meeting) {
      return res.status(StatusCodes.NOT_FOUND)
        .json({ error: "Meeting not found" });
    }

    // Check permission
    if (meeting.createdBy.toString() === userId) {
      // Delete meeting
      await Meeting.deleteOne({ _id: meetingId });
      return res.status(StatusCodes.OK)
        .json({ message: "Meeting deleted successfully" });
    } else if (meeting.createdBy.toString() !== userId && user.role === "admin") {
      // Check if it's an employee meeting
      const meetingOwner = await User.findOne({ _id: meeting.createdBy });
      if (meetingOwner.role === "employee" && meetingOwner.adminId === userId) {
        // Delete meeting
        await Meeting.deleteOne({ _id: meetingId });
        return res.status(StatusCodes.OK).json({ message: "Meeting deleted successfully" });
      } else {
        return res.status(StatusCodes.UNAUTHORIZED)
          .json({ message: ReasonPhrases.UNAUTHORIZED });
      }
    }

    return res.status(StatusCodes.UNAUTHORIZED)
      .json({ message: ReasonPhrases.UNAUTHORIZED });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc update user meeting by id
 * @method PATCH /api/meeting/:meetingId
 */
exports.updateMeeting = async (req, res, next) => {
  try {
    const { userId, role } = req;

    // Validate meeting ID from params
    const { meetingId = "" } = req.params;
    const { error } = objectIdValidationSchema.safeParse(meetingId);
    if (error) {
      return res.status(StatusCodes.BAD_REQUEST)
        .json({ error });
    }

    // Validate user input
    const { error: meetingDataError, data } = meetingValidationSchema.safeParse(req.body);
    if (meetingDataError) {
      return res.status(StatusCodes.BAD_REQUEST)
        .json({ error: meetingDataError });
    }

    // Find user
    const user = await User.findOne({ _id: userId });
    if (!user) {
      return res.status(StatusCodes.NOT_FOUND)
        .json({ error: "User not found" });
    }

    // Find meeting
    const meeting = await Meeting.findOne({ _id: meetingId });
    if (!meeting) {
      return res.status(StatusCodes.NOT_FOUND)
        .json({ error: "Meeting not found" });
    }

    // Check permission
    if (meeting.createdBy.toString() === userId) {
      // Update meeting
      await Meeting.updateOne({ _id: meetingId }, { ...data });
      return res.status(StatusCodes.OK)
        .json({ message: "Meeting updated successfully" });
    } else if (meeting.createdBy.toString() !== userId && user.role === "admin") {
      // Check if it's an employee meeting
      const meetingOwner = await User.findOne({ _id: meeting.createdBy });
      if (meetingOwner.role === "employee" && meetingOwner.adminId === userId) {
        await Meeting.updateOne({ _id: meetingId }, { ...data });
        return res.status(StatusCodes.OK)
          .json({ message: "Meeting updated successfully" });
      } else {
        return res.status(StatusCodes.UNAUTHORIZED)
          .json({ message: ReasonPhrases.UNAUTHORIZED });
      }
    }

    return res.status(StatusCodes.UNAUTHORIZED)
      .json({ message: ReasonPhrases.UNAUTHORIZED });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc get meeting by id
 * @method GET /api/meeting/:meetingId
 */
exports.getMeetingById = async (req, res, next) => {
  try {
    const { userId, role } = req;

    // Validate meeting ID from params
    const { meetingId = "" } = req.params;
    const { error } = objectIdValidationSchema.safeParse(meetingId);
    if (error) {
      return res.status(StatusCodes.BAD_REQUEST)
        .json({ error });
    }

    // Find user
    const user = await User.findOne({ _id: userId });
    if (!user) {
      return res.status(StatusCodes.NOT_FOUND)
        .json({ error: "User not found" });
    }

    // Find meeting
    const meeting = await Meeting.findOne({ _id: meetingId });
    if (!meeting) {
      return res.status(StatusCodes.NOT_FOUND)
        .json({ error: "Meeting not found" });
    }

    // Check permission
    if (meeting.createdBy.toString() === userId) {
      // Return meeting
      return res.status(StatusCodes.OK)
        .json({ message: "Meeting fetched successfully", meeting });
    } else if (meeting.createdBy.toString() !== userId && user.role === "admin") {
      // Check if it's an employee meeting
      const meetingOwner = await User.findOne({ _id: meeting.createdBy });
      if (meetingOwner.role === "employee" && meetingOwner.adminId === userId) {
        return res.status(StatusCodes.OK)
          .json({ message: "Meeting fetched successfully", meeting });
      } else {
        return res.status(StatusCodes.UNAUTHORIZED)
          .json({ message: ReasonPhrases.UNAUTHORIZED });
      }
    }

    return res.status(StatusCodes.UNAUTHORIZED)
      .json({ message: ReasonPhrases.UNAUTHORIZED });
  } catch (error) {
    next(error);
  }
};
