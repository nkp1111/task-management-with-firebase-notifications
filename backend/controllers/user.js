const { User } = require("../model");
const { StatusCodes } = require("http-status-codes");


/**
 * @desc creates a new user
 * @method POST /api/user
 * @param email string
 * @param password string
 * @param role string [admin|employee] admin(default)
 * @param optional {name: {firstName, lastName}, role: admin}
 */
exports.createUser = async (req, res, next) => {
  try {
    return res.status(StatusCodes.CREATED).json({ message: "User created successfully." });
  } catch (error) {
    next(error);
  }
}


/**
 * @desc get all users
 * @method GET /api/user
 */
exports.getUsers = async (req, res, next) => {
  try {
    return res.status(StatusCodes.OK).json({ message: "Users fetched successfully." });
  } catch (error) {
    next(error);
  }
}


/**
 * @desc delete user
 * @method DELETE /api/user/:user-id
 */
exports.deleteUser = async (req, res, next) => {
  try {
    return res.status(StatusCodes.OK).json({ message: "User deleted successfully." });
  } catch (error) {
    next(error);
  }
}



/**
 * @desc update user by id
 * @method PATCH /api/user/:user-id
 */
exports.updateUser = async (req, res, next) => {
  try {
    return res.status(StatusCodes.OK).json({ message: "User updated successfully." });
  } catch (error) {
    next(error);
  }
}


/**
 * @desc get user by id
 * @method GET /api/user/:user-id
 */
exports.getUser = async (req, res, next) => {
  try {
    return res.status(StatusCodes.OK).json({ message: "User fetched successfully." });
  } catch (error) {
    next(error);
  }
}