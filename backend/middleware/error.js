const {
  ReasonPhrases,
  StatusCodes,
} = require("http-status-codes");

exports.errorMiddleware = (error, req, res, next) => {
  if (error.name) {
    res.status(StatusCodes.BAD_REQUEST)
      .send(`${ReasonPhrases.BAD_REQUEST}: ${error.message || "Something went wrong"}`);
  } else {
    console.log("Error middleware: ", error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(`${ReasonPhrases.INTERNAL_SERVER_ERROR}: ${error.message || "An unexpected error occurred"}`)
    //   .send({
    //   error: ReasonPhrases.INTERNAL_SERVER_ERROR,
    //   message: "An unexpected error occurred",
    // });
  }
}