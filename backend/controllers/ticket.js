const { Ticket, User } = require("../model");
const { StatusCodes, ReasonPhrases } = require("http-status-codes");

const {
  ticketValidationSchema,
  objectIdValidationSchema,
} = require("../utils/validation");

const { validationErrorMessage } = require("../utils/format/error-msg");


/**
 * @desc creates a new ticket
 * @method POST /api/ticket
 * @param title string
 * @param description string
 * @param optional {type, status}
 */
exports.createTicket = async (req, res, next) => {
  try {
    const { userId } = req;
    // validate user input
    const { error, data } = ticketValidationSchema.safeParse(req.body);
    if (error) {
      return res.status(StatusCodes.BAD_REQUEST)
        .json({ error: validationErrorMessage(error) });
    }
    const ticketInfo = { ...data, createdBy: userId };

    const ticket = await Ticket.create(ticketInfo);


    // create new notification
    await addNewNotification(
      userId,
      ticket,
      "ticket",
    )


    return res.status(StatusCodes.CREATED)
      .json({ message: "Ticket created successfully.", ticket });
  } catch (error) {
    next(error);
  }
}


/**
 * @desc get user and its employees(if applicable) tickets
 * @method GET /api/ticket
 */
exports.getTickets = async (req, res, next) => {
  try {
    const { userId, role } = req;
    // get user tickets
    const userTickets = await Ticket.find({ createdBy: userId });
    if (role === "admin") {
      // get employees tickets as well
      const employees = await User.find({ adminId: userId, role: "employees" });
      const employeesId = employees.map(employee => employee._id);
      const employeesTickets = await Ticket.find({ createdBy: { $in: employeesId } });

      return res.status(StatusCodes.OK)
        .json({ message: "Users fetched successfully.", userTickets, employeesTickets });
    }

    return res.status(StatusCodes.OK)
      .json({ message: "Users fetched successfully.", userTickets });
  } catch (error) {
    next(error);
  }
}


/**
 * @desc delete user ticket
 * @method DELETE /api/ticket:ticketId
 */
exports.deleteTicket = async (req, res, next) => {
  try {
    const { userId, role } = req;
    // get and validate userId from params
    const { ticketId = "" } = req.params;
    const { error } = objectIdValidationSchema.safeParse(ticketId);
    if (error) {
      return res.status(StatusCodes.BAD_REQUEST)
        .json({ error: validationErrorMessage(error, "Ticket Id: ") });
    }

    // find user
    const user = await User.findOne({ _id: userId })
    if (!user) {
      return res.status(StatusCodes.NOT_FOUND)
        .json({ error: "User not found" });
    }
    // find ticket
    const ticket = await Ticket.findOne({ _id: ticketId });
    if (!ticket) {
      return res.status(StatusCodes.NOT_FOUND)
        .json({ error: "Ticket not found" });
    }

    // check permission
    // user ticket
    if (ticket.createdBy.toString() === userId) {
      // delete ticket
      await Ticket.deleteOne({ _id: ticketId });
      return res.status(StatusCodes.OK)
        .json({ message: "Ticket deleted successfully" });
    }
    // not belong to user
    else if (ticket.createdBy.toString() !== userId && user.role === "admin") {
      // check employee ticket
      const ticketOwner = await User.findOne({ _id: ticket.createdBy });
      if (ticketOwner.role === "employee" && ticketOwner.adminId === userId) {
        // employee ticket confirmed
        // delete ticket
        await Ticket.deleteOne({ _id: ticketId });
        return res.status(StatusCodes.OK)
          .json({ message: "Ticket deleted successfully" });
      }
      else {
        // not employee ticket
        return res.status(StatusCodes.UNAUTHORIZED)
          .json({ message: ReasonPhrases.UNAUTHORIZED });
      }
    }

    return res.status(StatusCodes.UNAUTHORIZED)
      .json({ message: ReasonPhrases.UNAUTHORIZED });
  } catch (error) {
    next(error);
  }
}



/**
 * @desc update user ticket by id
 * @method PATCH /api/ticket/:ticketId
 */
exports.updateTicket = async (req, res, next) => {
  try {
    const { userId, role } = req;
    // get and validate ticket from params
    const { ticketId = "" } = req.params;
    const { error } = objectIdValidationSchema.safeParse(ticketId);
    if (error) {
      return res.status(StatusCodes.BAD_REQUEST)
        .json({ error: validationErrorMessage(error, "Ticket Id: ") });
    }
    // validate user input
    const { error: ticketDataError, data } = ticketValidationSchema.safeParse(req.body);
    if (ticketDataError) {
      return res.status(StatusCodes.BAD_REQUEST)
        .json({ error: validationErrorMessage(ticketDataError) });
    }

    // find user
    const user = await User.findOne({ _id: userId })
    if (!user) {
      return res.status(StatusCodes.NOT_FOUND)
        .json({ error: "User not found" });
    }
    // find ticket
    const ticket = await Ticket.findOne({ _id: ticketId });
    if (!ticket) {
      return res.status(StatusCodes.NOT_FOUND)
        .json({ error: "Ticket not found" });
    }

    // check permission
    // user ticket
    if (ticket.createdBy.toString() === userId) {
      // update ticket
      const updateResult = await Ticket.updateOne({ _id: ticketId }, { ...data });
      // console.log("ticket update result", updateResult);

      // create new notification
      await addNewNotification(
        userId,
        ticket,
        "ticket",
      )


      return res.status(StatusCodes.OK)
        .json({ message: "Ticket updated successfully" });
    }
    // not belong to user
    else if (ticket.createdBy.toString() !== userId && user.role === "admin") {
      // check employee ticket
      const ticketOwner = await User.findOne({ _id: ticket.createdBy });
      if (ticketOwner.role === "employee" && ticketOwner.adminId === userId) {
        // employee ticket confirmed
        const updateResult = await Ticket.updateOne({ _id: ticketId }, { ...data });
        // console.log("ticket update result", updateResult);

        // create new notification
        await addNewNotification(
          userId,
          ticket,
          "ticket",
        )


        return res.status(StatusCodes.OK)
          .json({ message: "Ticket updated successfully" });
      }
      else {
        // not employee ticket
        return res.status(StatusCodes.UNAUTHORIZED)
          .json({ message: ReasonPhrases.UNAUTHORIZED });
      }
    }

    return res.status(StatusCodes.UNAUTHORIZED)
      .json({ message: ReasonPhrases.UNAUTHORIZED });
  } catch (error) {
    next(error);
  }
}


/**
 * @desc get ticket by id
 * @method GET /api/ticket/:ticketId
 */
exports.getTicketById = async (req, res, next) => {
  try {
    const { userId, role } = req;
    // get and validate ticket from params
    const { ticketId = "" } = req.params;
    const { error } = objectIdValidationSchema.safeParse(ticketId);
    if (error) {
      return res.status(StatusCodes.BAD_REQUEST)
        .json({ error: validationErrorMessage(error, "Ticket Id: ") });
    }

    // find user
    const user = await User.findOne({ _id: userId })
    if (!user) {
      return res.status(StatusCodes.NOT_FOUND)
        .json({ error: "User not found" });
    }
    // find ticket
    const ticket = await Ticket.findOne({ _id: ticketId });
    if (!ticket) {
      return res.status(StatusCodes.NOT_FOUND)
        .json({ error: "Ticket not found" });
    }

    // check permission
    // user ticket
    if (ticket.createdBy.toString() === userId) {
      // return ticket
      return res.status(StatusCodes.OK)
        .json({ message: "Ticket fetched successfully", ticket });
    }
    // not belong to user
    else if (ticket.createdBy.toString() !== userId && user.role === "admin") {
      // check employee ticket
      const ticketOwner = await User.findOne({ _id: ticket.createdBy });
      if (ticketOwner.role === "employee" && ticketOwner.adminId === userId) {
        // employee ticket confirmed
        return res.status(StatusCodes.OK)
          .json({ message: "Ticket fetched successfully", ticket });
      }
      else {
        // not employee ticket
        return res.status(StatusCodes.UNAUTHORIZED)
          .json({ message: ReasonPhrases.UNAUTHORIZED });
      }
    }

    return res.status(StatusCodes.UNAUTHORIZED)
      .json({ message: ReasonPhrases.UNAUTHORIZED });
  } catch (error) {
    next(error);
  }
}