import {
    addCourse,
    getAllCourses,
    getFilteredCourses
} from "../services/courseService.js";
import { validateCourseBody } from "../utils/courseValidator.js";

//TODO: Do exceptions with code 400 or 402
export function findCourses(req, res, next){
    const {schedule, credits, active} = req.query;

    if(schedule === undefined && credits === undefined && active === undefined){
        return res.success(200, "Get all courses", getAllCourses());
    }

    const filtered = getFilteredCourses(schedule, credits, active);
    return res.success(200, "Filtered courses", filtered);
}

export function saveCourse(req, res, next){
    const courseValidator = validateCourseBody(req.body, true);
    
    if(!courseValidator.validation){
        const error = Error(courseValidator.message);
        error.statusCode = 400;
        return next(error);
    }
    const newCourse = addCourse({
        _id: Date.now(),
        name: req.body.name,
        degree: req.body.degree,
        lecturer: req.body.lecturer,
        schedule: req.body.schedule,
        credits: Number(req.body.credits),
        active: Boolean(req.body.active)
    });
    return res.success(201, "Course added", newCourse);
}