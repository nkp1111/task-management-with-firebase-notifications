const { authExpireDays } = require("../../constant/auth");

exports.setCookie = (res, cookieName, cookieValue, options = {}) => {
  const defaultOptions = {
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * authExpireDays),
    httpOnly: true,
    // sameSite: "none",
    secure: process.env.NODE_ENV === "production",
  };
  const cookieOptions = { ...defaultOptions, ...options };
  res.cookie(cookieName, cookieValue, cookieOptions);
};

exports.clearCookie = (res, cookieName) => {
  res.cookie(cookieName, null, {
    expires: new Date(0),
    httpOnly: true,
    // sameSite: "none",
    secure: process.env.NODE_ENV === "production",
  });
};