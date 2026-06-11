import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  name: String,
  degree: String,
  lecturer: String,
  schedule: String,
  credits: Number,
  active: Boolean
});

export const Course = mongoose.model("Course", courseSchema);