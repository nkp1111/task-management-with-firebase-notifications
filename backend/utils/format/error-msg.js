const { z } = require("zod");

exports.validationErrorMessage = (error, checkField = "") => {
  // console.log(error)
  return checkField + error.issues[0].path.join(" -> ") + " :: " + error.issues[0].message
}