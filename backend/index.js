const express = require("express");
require("dotenv").config();
const { StatusCodes } = require("http-status-codes");

const { connectMongoDB } = require("./config/mongo-connect");
const { errorMiddleware } = require("./middleware/error");
const {
  UserRouter,
} = require("./routes");


const app = express();
const port = process.env.PORT || 3000;

// middleware
app.use(express.json());

// routes
app.get("/", (req, res) => {
  res.status(StatusCodes.OK)
    .send("Welcome to Task Manager...");
})
app.use("/api/user", UserRouter); // user routes

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
