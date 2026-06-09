import {
    getAllCourses,
    getFilteredCourses
} from "../services/courseService.js";
import { validateCourseBody } from "../utils/courseValidator.js";

export function findCourses(req, res, next){
    const {schedule, credits, active} = req.query;
    if(schedule === undefined || credits === undefined || active === undefined){
        return res.success(200, "Get all courses", getAllCourses());
    }

    const filtered = getFilteredCourses(schedule, credits, active);
    return res.success(200, "Filtered courses", filtered);
}