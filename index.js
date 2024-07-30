const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const PORT = process.env.PORT;
const { chats } = require("./dummy/data");
const connectDB = require("./config/db");
const userRouter = require("./routers/userRouter.js");
const errorHandler = require("./error/errorMiddleware.js");

const corsOption = {
  origin: ["http://127.0.0.1:5173", "http://127.0.0.1:5000"],
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

connectDB();

app.get("/", (req, res) => {
  res.send("API is Working!");
});

app.get("/api/chat", cors(corsOption), (req, res) => {
  res.json({
    chats,
  });
});

app.get("/api/chat/:id", (req, res) => {
  const { id } = req.params;
  const singleChat = chats.find((chat) => chat._id === id);
  res.send(singleChat);
});

app.use("/api/user", userRouter);

app.use(errorHandler);

app.listen(PORT, console.log(`App is running on port ${PORT}`));
