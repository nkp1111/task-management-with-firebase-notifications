const router = require("express").Router({ mergeParams: true });

const {
  getEmployee,
  getEmployees,
  createEmployees,
  deleteEmployee,
  updateEmployee,
} = require("../controllers/employee");

const { isValidUser } = require("../middleware/valid-user");
const { isUserAuthorized } = require("../middleware/user-permission")

router.route("/").get(getEmployees).post(createEmployees);

router.use(isValidUser, isUserAuthorized);
router.route("/:employeeId").get(getEmployee).patch(updateEmployee).delete(deleteEmployee);

module.exports = router;