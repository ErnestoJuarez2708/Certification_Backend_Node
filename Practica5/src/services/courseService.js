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

export function replaceCourse(id, body){
    let pos = -1;
    for(let i=0;i<courseList.length;i++){
        if(courseList[i]._id === id){
            pos = i;
            break;
        }
    }
    if(pos == -1){
        return {
            success: false,
            message: `Not found student with id ${id} to update`
        };
    }
    let newCourseInfo = {
        _id: id,
        name: body.name ?? courseList[pos].name,
        degree: body.degree ?? courseList[pos].degree,
        lecturer: body.lecturer ?? courseList[pos].lecturer,
        schedule: body.schedule ?? courseList[pos].schedule,
        credits: body.credits ?? courseList[pos].credits,
        active: body.active ?? courseList[pos].active
    };
    courseList[pos] = newCourseInfo;
    return {
        success: true,
        data: newCourseInfo
    };
}