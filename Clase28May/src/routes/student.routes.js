import express from "express";
import { studentList } from '../data/students.js';

const router = express.Router();

router.get("/", (req,res) => {
    if(req.query.pass){
        const pass = req.query.pass == 'true' ? true : false;
        const filteredStudentList = studentList.filter(student => (student.grade >= 60)==pass);
        res.status(200).json(filteredStudentList);
    }
    else{
        res.status(200).json(studentList);
    }
});

router.post("/", (req, res) => {
    const body = req.body;
    if(body.hasOwnProperty("name") && body.hasOwnProperty("grade")){
        studentList.push(body);
        res.status(201).json({student: body});
    }else{
        res.status(400).json({error : "Body not supported"});
    }
});

router.get("/:pos", (req, res) => {
    const pos = req.params.pos;
    if(pos >= 0 && pos < studentList.length){
        res.status(200).json({student: studentList[pos]});
    } else {
        res.status(404).json({error : "Student not found"});
    }
});

export default router;