import { Course } from "../data/course.js";

export async function getAllCourses(){
    return await Course.find({});
}

export async function getFilteredCourses(schedule, credits, active){
    let query = {};

        if (schedule !== undefined) {
            //No pude solucionar A+ o B+, en postman, en params, 
            // utilizar B%2B o A%2B para ver horarios A+ o B+
            query.schedule = schedule;
        }

        if (credits !== undefined) {
            query.credits = Number(credits);
        }

        if (active !== undefined) {
            query.active = active === 'true' || active === true;
        }

        return await Course.find(query);
}

export async function addCourse(course){
    const newCourse = await Course.create(course);
    return newCourse;
}

export async function getCourseById(id){
    try {
        return await Course.findById(id);
    } catch (error) {
        return null;
    }
}

export async function replaceCourse(id, body){
    try {
        const updateData = {};
        if (!id) {
            return {
                success: false,
                message: `Course with id ${id} not found`
            };
        }

        if (body.name !== undefined) updateData.name = body.name;
        if (body.degree !== undefined) updateData.degree = body.degree;
        if (body.lecturer !== undefined) updateData.lecturer = body.lecturer;
        if (body.schedule !== undefined) updateData.schedule = body.schedule;
        if (body.credits !== undefined) updateData.credits = Number(body.credits);
        if (body.active !== undefined) updateData.active = Boolean(body.active);

        const updatedCourse = await Course.findByIdAndUpdate(
            id,
            updateData,
            { returnDocument: 'after'}
        );

        return {
            success: true,
            data: updatedCourse
        };
    } catch(error) {
        return null;
    }
}

export async function deleteCourseById(id){
    const deletedCourse = await Course.findByIdAndDelete(id);
    if (!deletedCourse) {
        return {
            success: false,
            message: `Course with id ${id} not found`
        };
    }
    return {
        success: true,
        data: deletedCourse
    };
}

export async function checkScheduleConflicts(courseIds) {
    try {
        const courses = await Course.find({ _id: { $in: courseIds } });

        if (courses.length !== courseIds.length) {
            return {
                valid: false,
                conflicts: ["Some course IDs were not found"],
                courses: []
            };
        }

        const scheduleMap = new Map();
        const conflicts = [];

        for (const course of courses) {
            const schedule = course.schedule;
            const baseSchedule = schedule.replace('+', '');

            if (scheduleMap.has(baseSchedule)) {
                const existing = scheduleMap.get(baseSchedule);
                conflicts.push({
                    schedule: baseSchedule,
                    courses: [...existing, course.name]
                });
            } else {
                scheduleMap.set(baseSchedule, [course.name]);
            }

            if (!scheduleMap.has(schedule)) {
                scheduleMap.set(schedule, []);
            }
        }

        const valid = conflicts.length === 0;

        return {
            valid,
            conflicts: valid ? [] : conflicts,
            courses: valid ? courses : []
        };

    } catch (error) {
        console.error("Error checking schedule conflicts:", error);
        throw error;
    }
}