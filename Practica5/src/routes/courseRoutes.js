import express, { Router } from "express";
import { findCoursebyId, findCourses, saveCourse } from "../controllers/courseController.js";

const courseRoutes = Router();

courseRoutes.get("/", findCourses);

courseRoutes.post("/", saveCourse);

courseRoutes.get("/:id", findCoursebyId);

export default courseRoutes;