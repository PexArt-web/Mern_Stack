require("dotenv").config();
const express = require("express");
const app = express();
const { connectDb } = require("./config/database");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
const port = process.env.PORT;
const workoutRoutes = require("./routes/workout");
const userRoutes = require("./routes/user")
app.use(express.json());
app.use(cors())
app.use(morgan("dev"));

const { log } = console;

app.use("/api/workouts", workoutRoutes);
app.use('/api/user',userRoutes)


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
