import express, { Router } from "express";
import { findCourses } from "../controllers/courseController.js";

const courseRoutes = Router();

courseRoutes.get("/", findCourses);

export default courseRoutes;