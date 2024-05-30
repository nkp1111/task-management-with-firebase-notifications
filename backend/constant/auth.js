exports.authCookieName = process.env.AUTH_COOKIE_NAME || "store-nest-main";
exports.authExpireDays = (() => {
  const expireDays = Number(process.env.AUTH_EXPIRE_DAYS);
  return Number.isNaN(expireDays) ? 3 : expireDays;
})();