import express, { Router } from "express";
import { 
    findCoursebyId, 
    findCourses, 
    saveCourse, 
    updateCourse,
    deleteCourse,
    putSchedule
} from "../controllers/courseController.js";

const courseRoutes = Router();

courseRoutes.get("/", findCourses);

courseRoutes.post("/", saveCourse);

courseRoutes.get("/:id", findCoursebyId);

courseRoutes.patch("/:id", updateCourse);

courseRoutes.delete("/:id", deleteCourse);

courseRoutes.put("/schedule", putSchedule);

export default courseRoutes;