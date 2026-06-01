import { studentList } from "../data/student.js";

export function getAllStudents(){
    return studentList;
}

export function getStudentsByPassStatus(pass){
    return studentList.filter((student) => {
        const hasPassed = student.grade >= 60;
        return hasPassed === pass;
    });
}

export function createdStudent(student){
    studentList.push(student);
    return student;
}

export function getStudentByPosition(postion){
    return studentList[position] ?? null;
}