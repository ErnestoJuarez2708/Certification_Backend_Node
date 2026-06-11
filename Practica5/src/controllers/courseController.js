import {
    addCourse,
    getAllCourses,
    getFilteredCourses,
    getCourseById,
    replaceCourse,
    deleteCourseById
} from "../services/courseService.js";
import { validateCourseBody } from "../utils/courseValidator.js";

//TODO: Do exceptions with code 400 or 402
export async function findCourses(req, res, next){
    const {schedule, credits, active} = req.query;
    let courses;
    if(schedule === undefined && credits === undefined && active === undefined){
        courses = await getAllCourses();
    } else {
        courses = await getFilteredCourses(schedule, credits, active);
    }
    return res.success(200, "Courses Obtained", courses);
}

export async function saveCourse(req, res, next){
    const courseValidator = validateCourseBody(req.body, true);
    
    if(!courseValidator.validation){
        const error = Error(courseValidator.message);
        error.statusCode = 400;
        return next(error);
    }
    const newCourse = await addCourse({
        name: req.body.name,
        degree: req.body.degree,
        lecturer: req.body.lecturer,
        schedule: req.body.schedule,
        credits: Number(req.body.credits),
        active: Boolean(req.body.active)
    });
    return res.success(201, "Course added", newCourse);
}

export async function findCoursebyId(req, res, next){
    const id = req.params.id;
    if (!id) {
        const error = new Error("ID is required");
        error.statusCode = 400;
        return next(error);
    }
    const course = await getCourseById(id);
    if(!course){
        const error = Error("Course Not Found");
        error.statusCode = 404;
        return next(error);
    }
    return res.success(200, `Course with id ${id} succesfully retrieved`, course);
}

export async function updateCourse(req, res, next){
    const id = req.params.id;
    const courseValidator = validateCourseBody(req.body, false);

    if(!courseValidator.validation){
        const error = Error(courseValidator.message);
        error.statusCode = 400;
        return next(error);
    }

    const upgrade = await replaceCourse(id, req.body);

    if (!upgrade) {
        const error =  Error("Course Not Found");
        error.statusCode = 404;
        return next(error);
    }
    return res.success(200, `Course with id ${id} was updated successfully`, upgrade.data);
}

export async function deleteCourse(req, res, next){
    const id = req.params.id;
    if (!id) {
        const error = new Error("ID is required");
        error.statusCode = 400;
        return next(error);
    }
    const deleteCourseReponse = await deleteCourseById(id);
    if (!deleteCourseReponse.success) {
        const error = new Error(deleteCourseReponse.message);
        error.statusCode = 404;
        return next(error);
    }
    return res.success(200, `Course with id ${id} was updated successfully`, deleteCourseReponse.data);
}