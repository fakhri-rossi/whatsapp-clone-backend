const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const PORT = process.env.PORT;

const corsOption = {
  origin: ["http://127.0.0.1:5173", "http://127.0.0.1:5000"],
};

const { chats } = require("./dummy/data");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    console.log("connected to db");
  })
  .catch((err) => {
    console.log(err);
  });

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

app.listen(PORT, console.log(`App is running on port ${PORT}`));
