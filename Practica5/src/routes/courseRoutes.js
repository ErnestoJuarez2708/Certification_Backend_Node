import express, { Router } from "express";
import { 
    findCoursebyId, 
    findCourses, 
    saveCourse, 
    updateCourse
} from "../controllers/courseController.js";

const courseRoutes = Router();

courseRoutes.get("/", findCourses);

courseRoutes.post("/", saveCourse);

courseRoutes.get("/:id", findCoursebyId);

courseRoutes.patch("/:id", updateCourse);

export default courseRoutes;