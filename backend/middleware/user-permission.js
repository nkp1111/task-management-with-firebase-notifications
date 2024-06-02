const {
  ReasonPhrases,
  StatusCodes,
} = require("http-status-codes");

const { User, Ticket, Meeting } = require("../model")


exports.isUserAuthorized = async (req, res, next) => {

  try {
    const { userId, role } = req;
    if (!userId || !role) {
      return res.status(StatusCodes.UNAUTHORIZED)
        .json({ message: ReasonPhrases.UNAUTHORIZED });
    }

    // to access
    const { userId: accessUserId, employeeId: accessEmployeeId, ticketId, meetingId } = req.params;
    console.log(accessUserId, userId, role)
    // console.log('validating ticket id', ticketId);
    // diff admin account
    if (role === "admin") {
      // console.log(userId, accessUserId);
      if (ticketId) {
        const ticket = await Ticket.findOne({ _id: ticketId });
        // console.log(ticket.createdBy, userId)
        // if ticket creator
        if (ticket.createdBy.toString() === userId) {
          return next();
        } else {
          // if his employee is ticket creator
          const ticketCreatorEmployee = await User.findOne({ _id: ticket.createdBy, role: "employee", adminId: userId });
          if (ticketCreatorEmployee) {
            return next();
          }
        }
        return res.status(StatusCodes.UNAUTHORIZED)
          .json({ message: ReasonPhrases.UNAUTHORIZED });
      }
      else if (meetingId) {
        const meeting = await Meeting.findOne({ _id: meetingId });
        // console.log(meeting.createdBy, userId)
        // if meeting creator
        if (meeting.createdBy.toString() === userId) {
          return next();
        } else {
          // if his employee is meeting creator
          const meetingCreatorEmployee = await User.findOne({ _id: meeting.createdBy, role: "employee", adminId: userId });
          if (meetingCreatorEmployee) {
            return next();
          }
        }
        return res.status(StatusCodes.UNAUTHORIZED)
          .json({ message: ReasonPhrases.UNAUTHORIZED });
      }
      else if (userId !== accessUserId) {
        return res.status(StatusCodes.UNAUTHORIZED)
          .json({ message: ReasonPhrases.UNAUTHORIZED });
      }
      else if (accessEmployeeId) {
        const employee = await User.findOne({ _id: accessEmployeeId, role: "employee", adminId: userId });
        if (!employee) {
          return res.status(StatusCodes.UNAUTHORIZED)
            .json({ message: ReasonPhrases.UNAUTHORIZED });
        }
      }

      return next();
    }
    // diff employee account
    if (role === "employee") {
      if (ticketId) {
        const ticket = await Ticket.findOne({ _id: ticketId });
        if (ticket && ticket.createdBy.toString() === userId) {
          return next();
        } else {
          return res.status(StatusCodes.UNAUTHORIZED)
            .json({ message: ReasonPhrases.UNAUTHORIZED });
        }
      }
      else if (meetingId) {
        const meeting = await Meeting.findOne({ _id: meetingId });
        if (meeting && meeting.createdBy.toString() === userId) {
          return next();
        } else {
          return res.status(StatusCodes.UNAUTHORIZED)
            .json({ message: ReasonPhrases.UNAUTHORIZED });
        }
      }
      if (userId !== accessUserId) {
        return res.status(StatusCodes.UNAUTHORIZED)
          .json({ message: ReasonPhrases.UNAUTHORIZED });
      }

      return next();
    }

    return res.status(StatusCodes.UNAUTHORIZED)
      .send(`${ReasonPhrases.UNAUTHORIZED}: you do not have permission to access`);

  } catch (error) {
    return res.status(StatusCodes.UNAUTHORIZED)
      .send(`${ReasonPhrases.UNAUTHORIZED}: you do not have permission to access`);
  }
}