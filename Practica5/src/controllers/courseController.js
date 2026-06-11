import {
    addCourse,
    getAllCourses,
    getFilteredCourses,
    getCourseById,
    replaceCourse,
    deleteCourseById,
    checkScheduleConflicts
} from "../services/courseService.js";
import { 
    validateCourseBody, 
    validateSchedule, 
    validateCredits,
    validateActive 
} from "../utils/courseValidator.js";

export async function findCourses(req, res, next){
    const {schedule, credits, active} = req.query;
    if (schedule !== undefined) {
        const scheduleValidation = validateSchedule(schedule);
        if (!scheduleValidation.validation) {
            const error = new Error(scheduleValidation.message);
            error.statusCode = 400;
            return next(error);
        }
    }
    if (credits !== undefined) {
        const creditsValidation = validateCredits(credits);
        if (!creditsValidation.validation) {
            const error = new Error(creditsValidation.message);
            error.statusCode = 400;
            return next(error);
        }
    }
    if (active !== undefined) {
        const activeValidation = validateActive(active);
        if (!activeValidation.validation) {
            const error = new Error(activeValidation.message);
            error.statusCode = 400;
            return next(error);
        }
    }
    try {
        let courses;
        if (schedule === undefined && credits === undefined && active === undefined) {
            courses = await getAllCourses();
        } else {
            courses = await getFilteredCourses(schedule, credits, active);
        }

        return res.success(200, "Courses Obtained", courses);
    } catch (error) {
        next(error);
    }
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

export async function putSchedule(req, res, next) {
    try {
        const { courseIds } = req.body;

        if (!Array.isArray(courseIds) || courseIds.length === 0) {
            const error = new Error("Body must contain a non-empty array of courseIds");
            error.statusCode = 400;
            return next(error);
        }

        const result = await checkScheduleConflicts(courseIds);

        if (!result.valid) {
            return res.success(409, "Schedule conflicts detected", {
                conflicts: result.conflicts,
                message: "Some courses have overlapping schedules"
            });
        }

        return res.success(200, "Schedule is valid", {
            courses: result.courses,
            message: "All courses have compatible schedules"
        });

    } catch (error) {
        next(error);
    }
}