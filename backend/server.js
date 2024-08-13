require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const { connectDb } = require("./config/database");
const morgan = require("morgan");
const port = process.env.PORT;
const workoutRoutes = require("./routes/workout");
app.use(express.json());
app.use(cors())
app.use(morgan("dev"));

const { log } = console;

app.use("/api/workouts", workoutRoutes);

// db and server connection
connectDb((error) => {
  if (error) {
    log(`error connecting to server and database : ${error.message} `);
    return;
  }
  app.listen(port, () => {
    log("database and server connected");
  });
});
