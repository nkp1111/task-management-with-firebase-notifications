const { setCookie, clearCookie } = require("./cookie");
const { generateJWTToken } = require("./jwt");

const { authCookieName } = require("../../constant/auth");

const loginUserUsingJWT = (user, res) => {
  try {
    const { accessToken, error } = generateJWTToken(user._id, user.role);
    if (error || !accessToken) return;
    setCookie(res, authCookieName, accessToken, {})
  } catch (error) {
    console.log("Error during jwt login", error);
    throw new Error(error);
  }
}


module.exports = {
  loginUserUsingJWT,
}