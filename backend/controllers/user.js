const { User } = require("../model");
const { StatusCodes } = require("http-status-codes");

const {
  userValidationSchema,
  objectIdValidationSchema,
  userUpdateValidationSchema,
} = require("../utils/validation");


/**
 * @desc creates a new user
 * @method POST /api/user
 * @param email string
 * @param password string
 * @param optional {name: {firstName, lastName}, phone}
 */
exports.createUser = async (req, res, next) => {
  try {
    // validate user input
    const { error, data } = userValidationSchema.safeParse(req.body);
    if (error) {
      return res.status(StatusCodes.BAD_REQUEST)
        .json({ error });
    }
    // check if user exists
    const existedUser = await User.findOne({ email: data.email });
    if (existedUser) {
      return res.status(StatusCodes.CONFLICT)
        .json({ error: "User already exists" });
    }
    const user = await User.create(data);
    return res.status(StatusCodes.CREATED)
      .json({ message: "User created successfully.", user });
  } catch (error) {
    next(error);
  }
}


/**
 * SUPER_ADMIN ROUTE
 * @desc get all users
 * @method GET /api/user
 */
exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.find({});
    return res.status(StatusCodes.OK)
      .json({ message: "Users fetched successfully.", users });
  } catch (error) {
    next(error);
  }
}


/**
 * @desc delete user
 * @method DELETE /api/user/:userId
 */
exports.deleteUser = async (req, res, next) => {
  try {
    // get and validate userId from params
    const { userId = "" } = req.params;
    const { error } = objectIdValidationSchema.safeParse(userId);
    if (error) {
      return res.status(StatusCodes.BAD_REQUEST)
        .json({ error });
    }

    // delete user
    const result = await User.deleteOne({ _id: userId })
    console.log('User delete result', result)
    // if no user deleted
    if (result.deletedCount === 0) {
      return res.status(StatusCodes.NOT_FOUND)
        .json({ error: "User not found" });
    }

    return res.status(StatusCodes.OK)
      .json({ message: "User deleted successfully." });
  } catch (error) {
    next(error);
  }
}



/**
 * @desc update user by id
 * @method PATCH /api/user/:userId
 */
exports.updateUser = async (req, res, next) => {
  try {
    // get and validate userId from params
    const { userId = "" } = req.params;
    const idValidationResult = objectIdValidationSchema.safeParse(userId);
    if (idValidationResult.error) {
      return res.status(StatusCodes.BAD_REQUEST)
        .json({ error: idValidationResult.error });
    }
    // validate user input
    const { error, data } = userUpdateValidationSchema.partial().safeParse(req.body);
    if (error) {
      return res.status(StatusCodes.BAD_REQUEST)
        .json({ error });
    }

    // delete user
    const result = await User.findOneAndUpdate({ _id: userId }, { $set: { ...data } })
    console.log('user update result', result)
    return res.status(StatusCodes.OK)
      .json({ message: "User updated successfully." });
  } catch (error) {
    next(error);
  }
}


/**
 * @desc get user by id
 * @method GET /api/user/:userId
 */
exports.getUser = async (req, res, next) => {
  try {
    // get and validate userId from params
    const { userId = "" } = req.params;
    const { error } = objectIdValidationSchema.safeParse(userId);
    if (error) {
      return res.status(StatusCodes.BAD_REQUEST)
        .json({ error });
    }
    // find user
    const user = await User.findOne({ _id: userId })
    return res.status(StatusCodes.OK)
      .json({ message: "User fetched successfully.", user });
  } catch (error) {
    next(error);
  }
}