import express from "express";

const app = express();

const PORT = 3000;

app.use(express.json());

let studentList = [
    {
        "name": "Ernesto Juarez",
        "grade" : 100
    },
    {
        "name": "Matias Meneses",
        "grade" : 78
    },
    {
        "name": "Wendy Caceres",
        "grade" : 49
    }
];

app.get("/",(req, res) => {
    res.send("<h1>Hello from Express</h1>") 
});

app.get("/api/students", (req, res) => {
    if(req.query.hasOwnProperty("pass")){
        const pass = req.query.pass;
        const filteredStudentList = studentList.filter(student => (student.grade >= 60) == pass);
        res.status(200).json(filteredStudentList);
    } else {
        res.status(200).json(studentList);
    }
});

app.post("/api/students", (req, res) => {
    const body = req.body;
    if(body.hasOwnProperty("name") && body.hasOwnProperty("grade")){
        studentList.push(body);
        res.status(201).json({student: body});
    }else{
        res.status(400).json({error : "Body not supported"});
    }
});

app.get("/api/students/:pos", (req, res) => {
    const pos = req.params.pos;
    if(pos >= 0 && pos < studentList.length){
        res.status(200).json({student: studentList[pos]});
    } else {
        res.status(404).json({error : "Student not found"});
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})