const workout = require("../models/workoutModel");
const mongoose = require("mongoose");


const { log } = console
const getAllWorkOut = async (req, res) => {
  try {
    const user_id = req.user._id
    const getAllWorkout = await workout.find({user_id}).sort({ createdAt: -1 });
    res.status(200).json(getAllWorkout);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAsingleWorkOut = async (req, res) => {
  const { workoutId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(workoutId)) {
    return res.status(400).json({ error: "Invalid workoutId" });
  }

  try {
    const getAsingleWorkout = await workout.findById(workoutId);
    if (!getAsingleWorkout) {
      return res.status(404).json({ error: "workout not found" });
    }
    res.status(200).json(getAsingleWorkout);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const createWorkOut = async (req, res) => {
  const { title, load, reps } = req.body;
  let emptyFields = []
  if (!title){
    emptyFields.push('title')
  }
  if(!load){
    emptyFields.push('load')
  }
  if(!reps){
    emptyFields.push('reps')
  }
  if(emptyFields.length > 0) {
    return res.status(400).json({ error: `please fill in all the fields`, emptyFields });

  }
  // 
  try {
    const user_id = req.user._id 
    const newWorkout = await workout.create({ title, load, reps , user_id });
    res.status(200).json(newWorkout);
  } catch (error) {
    log(`error saving documents ${error.message}`);
    res.status(400).json(`error saving documents ${error.message}`);
  }
};

const deleteAsingleWorkOut = async (req, res) => {
  const { workoutId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(workoutId)) {
    return res.status(400).json({ error: "Invalid document Id" });
  }
  try {
    const deleteWorkOut = await workout.findByIdAndDelete(workoutId);
    if (!deleteWorkOut) {
     return res.status(404).json({ error: "no workout found" });
    }
   return res.status(200).json(deleteWorkOut);
  } catch (error) {
    res.status(404).json({ error: "unable to delete workout" });
  }
};

const updateAsingleWorkOut = async (req, res) => {
  const { workoutId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(workoutId)) {
    return res.status(404).json({ error: "no documentsss to update" });
  }
  try {
    const updateWorkout = await workout.findByIdAndUpdate(
      { _id: workoutId },
      { ...req.body }
    );
    if (!updateWorkout) {
      return res
        .status(404)
        .json({ error: "no document to update" + error.message });
    }
    res.status(200).json(updateWorkout);
  } catch (error) {
    res
      .status(404)
      .json({ error: "document unbale to update" + error.message });
  }
};

module.exports = {
  createWorkOut,
  getAllWorkOut,
  getAsingleWorkOut,
  deleteAsingleWorkOut,
  updateAsingleWorkOut,
};
