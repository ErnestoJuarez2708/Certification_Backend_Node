import express, { Router } from "express";
import { findCourses, saveCourse } from "../controllers/courseController.js";

const courseRoutes = Router();

courseRoutes.get("/", findCourses);

courseRoutes.post("/", saveCourse);

export default courseRoutes;