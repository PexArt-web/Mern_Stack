require("dotenv").config();
const mongoose = require("mongoose");
let dbUrl = process.env.db_Url;


module.exports = {
  connectDb: async (cb) => {
    try {
        const connectDataBase = await mongoose.connect(dbUrl)
      return cb();
    } catch (error) {
      return cb(error);
    }
  }
};
