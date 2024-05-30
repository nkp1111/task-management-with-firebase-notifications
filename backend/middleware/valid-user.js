const {
  ReasonPhrases,
  StatusCodes,
} = require("http-status-codes");

const { authCookieName } = require("../constant/auth");
const { verifyJWTToken } = require("../utils/auth/jwt");
const { objectIdValidationSchema } = require("../utils/validation")


exports.isValidUser = (req, res, next) => {
  const token = req.cookies[authCookieName];
  if (!token) {
    return res.status(StatusCodes.UNAUTHORIZED)
      .json({ message: ReasonPhrases.UNAUTHORIZED });
  }

  try {
    const result = verifyJWTToken(token);
    if (result.error) {
      return res.status(StatusCodes.UNAUTHORIZED)
        .json({ message: ReasonPhrases.UNAUTHORIZED });
    }

    const { _id, role } = result;
    const { success } = objectIdValidationSchema.safeParse(_id);
    if (!success) {
      return res.status(StatusCodes.FORBIDDEN)
        .json({ message: ReasonPhrases.FORBIDDEN });
    }

    req.userId = _id;
    req.role = role;

    return next();

  } catch (error) {
    return res.status(StatusCodes.UNAUTHORIZED)
      .json({ message: ReasonPhrases.UNAUTHORIZED });
  }
}