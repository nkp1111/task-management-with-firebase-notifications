const router = require("express").Router({ mergeParams: true });

const {
  createTicket,
  updateTicket,
  getTicketById,
  getTickets,
  deleteTicket,
} = require("../controllers/ticket");

const { isValidUser } = require("../middleware/valid-user");
const { isUserAuthorized } = require("../middleware/user-permission")

router.route("/").get(getTickets).post(createTicket);


router.use(isValidUser, isUserAuthorized);
router.route("/:ticketId").get(getTicketById).patch(updateTicket).delete(deleteTicket);

module.exports = router;