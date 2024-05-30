const {
  ReasonPhrases,
  StatusCodes,
} = require("http-status-codes");

const { User } = require("../model")


exports.isUserAuthorized = async (req, res, next) => {

  try {
    const { userId, role } = req;
    if (!userId || !role) {
      return res.status(StatusCodes.UNAUTHORIZED)
        .json({ message: ReasonPhrases.UNAUTHORIZED });
    }

    // to access
    const { userId: accessUserId, employeeId: accessEmployeeId } = req.params;
    // diff admin account
    if (role === "admin") {
      if (userId !== accessUserId) {
        return res.status(StatusCodes.UNAUTHORIZED)
          .json({ message: ReasonPhrases.UNAUTHORIZED });
      } else if (accessEmployeeId) {
        const employee = await User.findOne({ _id: accessEmployeeId, role: "employee", adminId: userId });
        if (!employee) {
          return res.status(StatusCodes.UNAUTHORIZED)
            .json({ message: ReasonPhrases.UNAUTHORIZED });
        }
      }
    }
    // diff employee account
    if (role === "employee" && userId !== accessEmployeeId) {
      return res.status(StatusCodes.UNAUTHORIZED)
        .json({ message: ReasonPhrases.UNAUTHORIZED });
    }

    return next();

  } catch (error) {
    return res.status(StatusCodes.UNAUTHORIZED)
      .json({ message: ReasonPhrases.UNAUTHORIZED });
  }
}