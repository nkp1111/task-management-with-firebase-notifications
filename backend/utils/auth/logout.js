const { clearCookie } = require("./cookie");

const authCookieName = process.env.AUTH_COOKIE_NAME || "store-nest-main";

const logoutUserUsingJWT = (res, cookieName = authCookieName) => {
  clearCookie(res, cookieName);
}

module.exports = {
  logoutUserUsingJWT,
}