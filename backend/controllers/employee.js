const { User } = require("../model");
const { StatusCodes } = require("http-status-codes");

const {
  userValidationSchema,
  objectIdValidationSchema,
  userUpdateValidationSchema,
} = require("../utils/validation");


/**
 * @desc creates employees
 * @method POST /api/user/:userId/employees
 * @param employees: [employee]
 * @param employee : {email, password, name: {firstName, lastName}, phone}
 */
exports.createEmployees = async (req, res, next) => {
  try {
    // get and validate userId from params
    const { userId = "" } = req.params;
    const { error } = objectIdValidationSchema.safeParse(userId);
    if (error) {
      return res.status(StatusCodes.BAD_REQUEST)
        .json({ error });
    }

    // validate user input
    let { employees = [] } = req.body;
    employees = employees
      .filter(employee => {
        const { success } = userValidationSchema.safeParse(employee);
        return success;
      })
      .map(employee => {
        employee.role = "employee";
        employee.adminId = userId;
        return employee;
      });

    // check if user exists
    const emails = employees.map(employee => employee.email);

    // Find existing users
    const existingUsers = await User.find({ email: { $in: emails } });
    const existingEmails = existingUsers.map(user => user.email);
    // filter new employees
    const newEmployees = employees.filter(employee => !existingEmails.includes(employee.email));
    if (newEmployees.length === 0) {
      return res.status(StatusCodes.CONFLICT)
        .json({ error: "All provided users already exist." });
    }
    // add new employees to db
    const employeesAdded = await User.insertMany(newEmployees);
    return res.status(StatusCodes.CREATED)
      .json({ message: "User created successfully.", employees: employeesAdded });
  } catch (error) {
    next(error);
  }
}


/**
 * @desc get all employees
 * @method GET /api/user/:userId/employees
 */
exports.getEmployees = async (req, res, next) => {
  try {
    // get and validate userId from params
    const { userId = "" } = req.params;
    const { error } = objectIdValidationSchema.safeParse(userId);
    if (error) {
      return res.status(StatusCodes.BAD_REQUEST)
        .json({ error });
    }
    const employees = await User.find({ adminId: userId });
    return res.status(StatusCodes.OK)
      .json({ message: "Employees fetched successfully.", employees });
  } catch (error) {
    next(error);
  }
}


/**
 * @desc remove employee
 * @method DELETE /api/user/:userId/employees/:employeeId
 */
exports.deleteEmployee = async (req, res, next) => {
  try {
    // get and validate userId from params
    const { userId, employeeId } = req.params;
    const { error } = objectIdValidationSchema.safeParse(userId);
    if (error) {
      return res.status(StatusCodes.BAD_REQUEST)
        .json({ error });
    }

    const { error: employeeIdError } = objectIdValidationSchema.safeParse(employeeId);
    if (employeeIdError) {
      return res.status(StatusCodes.BAD_REQUEST)
        .json({ error: employeeIdError });
    }

    // delete employee
    const result = await User.deleteOne({ adminId: userId, _id: employeeId })
    console.log('Employee delete result', result)
    // if no user deleted
    if (result.deletedCount === 0) {
      return res.status(StatusCodes.NOT_FOUND)
        .json({ error: "Employee not found" });
    }

    return res.status(StatusCodes.OK)
      .json({ message: "Employee deleted successfully." });
  } catch (error) {
    next(error);
  }
}



/**
 * @desc update user by id
 * @method PATCH /api/user/:userId/employees/:employeeId
 */
exports.updateUser = async (req, res, next) => {
  try {
    // get and validate userId from params
    const { userId, employeeId } = req.params;
    const { error } = objectIdValidationSchema.safeParse(userId);
    if (error) {
      return res.status(StatusCodes.BAD_REQUEST)
        .json({ error });
    }
    // validate employee id
    const { error: employeeIdError } = objectIdValidationSchema.safeParse(employeeId);
    if (employeeIdError) {
      return res.status(StatusCodes.BAD_REQUEST)
        .json({ error: employeeIdError });
    }
    // validate update data
    const { error: employeeDataError, data } = userUpdateValidationSchema.partial().safeParse(req.body);
    if (employeeDataError) {
      return res.status(StatusCodes.BAD_REQUEST)
        .json({ error: employeeDataError });
    }
    // update employee
    const result = await User.findOneAndUpdate({ adminId: userId, _id: employeeId }, { $set: { ...data } })
  } catch (error) {
    next(error);
  }
}


/**
 * @desc get user by id
 * @method GET /api/user/:userId/employees/:employeeId
 */
exports.getEmployee = async (req, res, next) => {
  try {
    // get and validate userId from params
    const { userId, employeeId } = req.params;
    const { error } = objectIdValidationSchema.safeParse(userId);
    if (error) {
      return res.status(StatusCodes.BAD_REQUEST)
        .json({ error });
    }

    const { error: employeeIdError } = objectIdValidationSchema.safeParse(employeeId);
    if (employeeIdError) {
      return res.status(StatusCodes.BAD_REQUEST)
        .json({ error: employeeIdError });
    }

    // find employee
    const employee = await User.findOne({ adminId: userId, _id: employeeId })
    if (!employee) {
      return res.status(StatusCodes.NOT_FOUND)
        .json({ error: "Employee not found" });
    }

    return res.status(StatusCodes.OK)
      .json({ message: "Employee fetched successfully.", employee });
  } catch (error) {
    next(error);
  }
}