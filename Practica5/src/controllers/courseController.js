import {
    getAllCourses
} from "../services/courseService.js";

export function findCourses(req, res, next){
    return res.success(200, "Get all courses", getAllCourses());
}