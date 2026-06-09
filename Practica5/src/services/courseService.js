import { courseList } from "../data/course.js";

export function getAllCourses(){
    return courseList;
}

export function getFilteredCourses(schedule, credits, active){
    let filteredCourses = getAllCourses();
    if (schedule !== undefined) {
        filteredCourses = filteredCourses.filter(c => c.schedule === schedule);
    }
    if (credits !== undefined) {
        const creditNum = Number(credits);
        filteredCourses = filteredCourses.filter(c => c.credits === creditNum);
    }
    if (active !== undefined) {
        const isActive = active === 'true' || active === true;
        filteredCourses = filteredCourses.filter(c => c.active === isActive);
    }
    return filteredCourses;
}

export function addCourse(course){
    courseList.push(course);
    return course;
}

export function getCourseById(id){
    const findCourse = courseList.filter(c => c._id === Number(id));
    if(findCourse.length == 0){
        return null;
    } else {
        return findCourse[0];
    }
}