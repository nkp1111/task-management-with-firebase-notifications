const { User } = require("../model");
const { StatusCodes } = require("http-status-codes");

const {
  userValidationSchema,
  objectIdValidationSchema,
  userUpdateValidationSchema,

  userAuthValidationSchema,
} = require("../utils/validation");
const { loginUserUsingJWT } = require("../utils/auth/login");
const { logoutUserUsingJWT } = require("../utils/auth/logout");


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

    // if creating employee, valid admin is required
    if (data.role === "employee") {
      const { error } = objectIdValidationSchema.safeParse(data.adminId);
      if (error) {
        return res.status(StatusCodes.BAD_REQUEST)
          .json({ error: "Employee should have valid admin" });
      }
    }

    // create user
    const user = await User.create(data);
    // login user
    loginUserUsingJWT(user, res);
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


// AUTH //
/**
 * @desc login user
 * @method POST /api/user/auth
 */
exports.loginUser = async (req, res, next) => {
  try {
    // get and validate userId from params
    const { error, data } = userAuthValidationSchema.safeParse(req.body);
    if (error) {
      return res.status(StatusCodes.BAD_REQUEST)
        .json({ error });
    }
    // find user
    const user = await User.findOne({ email: data.email }).select("+password");
    if (!user) {
      return res.status(StatusCodes.UNAUTHORIZED)
        .json({ error: "Invalid email or password" });
    }

    const passwordMatch = await user.comparePassword(data.password);
    if (!passwordMatch) {
      return res.status(StatusCodes.UNAUTHORIZED)
        .json({ error: "Invalid email or password" });
    }

    // login user
    loginUserUsingJWT(user, res);

    return res.status(StatusCodes.OK)
      .json({ message: "User signed in successfully", user });
  } catch (error) {
    next(error);
  }
}


/**
 * @desc logout user
 * @method GET /api/user/auth
 * @returns 
 */
exports.logoutUser = async (req, res, next) => {
  try {

    // logout user
    logoutUserUsingJWT(res);

    return res.status(StatusCodes.OK)
      .json({ message: "User signed out successfully" });
  } catch (error) {
    next(error);
  }
}