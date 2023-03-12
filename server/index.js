const express = require("express");
const router = require("./routes/index");
const errorHandler = require("./middleware/ErrorHandlingMiddleware");
const cors = require("cors");
const { SERVER_PORT } = require("./env");
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", router);

app.use(errorHandler);

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
