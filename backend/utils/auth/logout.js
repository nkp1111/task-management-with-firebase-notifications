const { clearCookie } = require("./cookie");

const authCookieName = process.env.AUTH_COOKIE_NAME || "task_manager";

const logoutUserUsingJWT = (res, cookieName = authCookieName) => {
  clearCookie(res, cookieName);
}

module.exports = {
  logoutUserUsingJWT,
}