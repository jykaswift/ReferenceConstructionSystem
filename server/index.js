const express = require("express");
const app = express();
const router = require("./routes/index");
require("dotenv").config();
const SERVER_PORT = process.env.SERVER_PORT;

app.use(express.json());
app.use("/api", router);
app.options("/url...", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET");
  res.header("Access-Control-Allow-Headers", "accept, content-type");
  res.header("Access-Control-Max-Age", "1728000");
  return res.sendStatus(200);
});

const start = async () => {
  try {
    app.listen(SERVER_PORT, (err) => {
      if (err) {
        return console.log(err);
      }
    });
  } catch (e) {
    console.log(e);
  }
};

start();
