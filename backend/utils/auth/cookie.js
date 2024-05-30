const { authExpireDays } = require("../../constant/auth");

exports.setCookie = (res, cookieName, cookieValue, options = {}) => {
  const defaultOptions = {
    httpOnly: true,
    sameSite: 'none',
    maxAge: 1000 * 60 * 60 * 24 * authExpireDays,
  };

  const cookieOptions = { ...defaultOptions, ...options };
  res.cookie(cookieName, cookieValue, cookieOptions);
};

exports.clearCookie = (res, cookieName) => {
  res.cookie(cookieName, null, {
    expires: new Date(0),
    httpOnly: true,
    sameSite: 'none',
  });
};