const express = require("express");
require("dotenv").config();
const { StatusCodes } = require("http-status-codes");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const { connectMongoDB } = require("./config/mongo-connect");
const { errorMiddleware } = require("./middleware/error");
const {
  UserRouter,
  EmployeeRouter,
  TicketRouter,
  MeetingRouter,
  NotificationRouter,
} = require("./routes");


const app = express();
const port = process.env.PORT || 3000;
const clientUrls = process.env.CLIENT_URL?.includes(",")
  ? process.env.CLIENT_URL.split(",").map((url) => url.trim())
  : [process.env.CLIENT_URL];

// middleware
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(cookieParser());
app.use(cors(
  {
    origin: clientUrls,
    credentials: true,
    allowedHeaders: "Content-Type, Authorization",
  }
));

app.use((req, res, next) => {
  console.log(req.method, req.body, req.path)
  next();
})

// routes
app.get("/", (req, res) => {
  res.status(StatusCodes.OK)
    .send("Welcome to Task Manager...");
})
app.use("/api/user/:userId/employees", EmployeeRouter); // employee routes
app.use("/api/user", UserRouter); // user routes
app.use("/api/ticket", TicketRouter); // ticket routes
app.use("/api/meeting", MeetingRouter); // meeting routes
app.use("/api/notification", NotificationRouter); // notification routes

// handle unknown routes
app.use("*", (req, res) => {
  res.status(StatusCodes.NOT_FOUND)
    .send("Page not found");
})

// handle all uncaught errors from app
app.use(errorMiddleware);

// start server with db
const startServer = async () => {
  try {
    // connect to mongo db
    await connectMongoDB();

    // app listen to server
    app.listen(port, () => {
      console.log("Server started...");
    })

  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    process.exit(1);
  }
}


startServer();

module.exports = app;
