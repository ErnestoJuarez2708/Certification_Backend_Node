import express from "express";
import studentsRouter from "./routes/student.routes.js";

const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/",(req, res) => {
    res.send("<h1>Hello from Express</h1>") 
});

app.use("/api/students", studentsRouter);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})