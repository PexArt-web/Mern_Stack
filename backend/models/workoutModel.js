const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const workOutSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  reps: {
    type: Number,
    required: true,
  },
  load: {
    type: Number,
    required: true,
  },
  user_id: {
    type: String,
    required: true,
  }
}, {timestamps: true});

const workout = mongoose.model('Workout', workOutSchema)

module.exports = workout
