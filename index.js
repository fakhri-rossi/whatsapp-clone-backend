const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT;

app.get("/", (req, res) => {
  res.send("API is Working!");
});

app.listen(PORT, console.log(`App is running on port ${PORT}`));
