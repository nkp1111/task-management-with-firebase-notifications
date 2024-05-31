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

router.use(isValidUser);
router.route("/").get(getTickets).post(createTicket);

router.route("/:ticketId")
  .get(isUserAuthorized, getTicketById)
  .patch(isUserAuthorized, updateTicket)
  .delete(isUserAuthorized, deleteTicket);

module.exports = router;