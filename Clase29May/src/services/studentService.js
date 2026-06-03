import { studentList } from "../data/student.js";

export function getAllStudents(){
    return studentList;
}

export function getStudentsByPassStatus(pass){
    return studentList.filter( (student) => {
        const hasPassed = student.grade >= 60;
        return hasPassed === pass;
    })
}

export function getStudentsBySite(site, students = null) {
    const list = students || getAllStudents().filter(s => s.active === 1);
    return list.filter(student => student.site === site);
}

export function createStudent(student){
    studentList.push(student);
    return student;
}

export function getStudentById(id){
    return studentList.find(student => student.id === id) ?? null;
}