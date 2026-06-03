import { Router } from "express";

import {
  findStudents,
  saveStudent,
  findStudentByID,
} from "../controllers/studentController.js";

const studentRoutes = Router();

studentRoutes.get("/", findStudents);

studentRoutes.post("/", saveStudent);

studentRoutes.get("/:pos", findStudentByID);

export default studentRoutes;