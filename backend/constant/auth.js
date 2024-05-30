exports.authCookieName = process.env.AUTH_COOKIE_NAME || "task_manager";
exports.authExpireDays = (() => {
  const expireDays = Number(process.env.AUTH_EXPIRE_DAYS);
  return Number.isNaN(expireDays) || expireDays <= 0 ? 3 : expireDays;
})();