const jwt = require('jsonwebtoken');
const { authExpireDays } = require("../../constant/auth");

const jwtAuthSecret = process.env.JWT_ACCESS_TOKEN_SECRET || "RandomAuthSecret";

exports.generateJWTToken = (_id, role) => {
  try {
    const accessToken = jwt.sign({ _id, role }, jwtAuthSecret, {
      expiresIn: authExpireDays + 'd',
    });

    return { accessToken };
  } catch (error) {
    console.log("Error generating jwt token", error);
    return { error };
  }
};


exports.verifyJWTToken = (token) => {
  try {
    if (!token) {
      throw new Error("No auth token provided");
    }

    const decoded = jwt.verify(token, jwtAuthSecret);
    if (!decoded?._id) {
      throw new Error("Invalid auth token");
    }

    return decoded;
  } catch (error) {
    // throw new Error(error);
    console.log("Error verifying jwt token", error);
    return { error };
  }
}

