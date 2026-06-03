import {
  getAllStudents,
  getStudentsByPassStatus,
  createStudent,
  getStudentByPosition,
  getStudentsBySite
} from "../services/studentService.js";

export function findStudents(req, res, next) {
  const { site, pass } = req.query;

  let students = getAllStudents().filter(s => s.active === 1);

  if (site) {
    if (!["LP", "CB", "SC"].includes(site)) {
      const error = Error("Query parameter 'site' must be 'LP', 'CB' or 'SC'");
      error.statusCode = 400;
      return next(error);
    }
    students = getStudentsBySite(site, students);
  }

  if (pass !== undefined) {
    if (pass !== "true" && pass !== "false") {
      const error = Error("Query parameter 'pass' must be 'true' or 'false'");
      error.statusCode = 400;
      return next(error);
    }
    const passAsBoolean = pass === "true";
    students = getStudentsByPassStatus(passAsBoolean, students);
    return res.success(200, `Get students that has pass equals to ${passAsBoolean}`,students);
  }

  return res.success(200, site ? `Get active students filtered by site ${site}` : "Get all active students", students);
}

export function saveStudent(req, res, next) {
  const { id, name, grade, site, active } = req.body;

  if (id === undefined || !name || grade === undefined || site === undefined || active === undefined) {
    const error = Error("Fields 'id', 'name', 'grade', 'site', 'active' are required");
    error.statusCode = 400;
    return next(error);
  }

  if (typeof id !== "number") {
    const error = Error("Field 'id' must be a number");
    error.statusCode = 400;
    return next(error);
  }

  if (typeof name !== "string" || name.trim().length === 0) {
    const error = Error("Field 'name' must be a non-empty string");
    error.statusCode = 400;
    return next(error);
  }

  if (typeof grade !== "number" || grade < 0 || grade > 100) {
    const error = Error("Field 'grade' must be a number between 0 and 100");
    error.statusCode = 400;
    return next(error);
  }

  if (!["LP", "CB", "SC"].includes(site)) {
    const error = Error("Field 'site' must be 'LP', 'CB' or 'SC'");
    error.statusCode = 400;
    return next(error);
  }

  if (typeof active !== "number" || ![0, 1].includes(active)) {
    const error = Error("Field 'active' must be 0 or 1");
    error.statusCode = 400;
    return next(error);
  }

  const newStudent = createStudent({
    id,
    name: name.trim(),
    grade,
    site,
    active
  });

  return res.success(201,"Student created succesfully", newStudent);
}

export function findStudentByPosition(req, res, next) {
  const position = Number(req.params.pos);

  console.log(`Retrieving information for student in position ${position}.`);

  if (!Number.isInteger(position) || position < 0) {
    const error = Error("Position must be a valid positive integer");
    error.statusCode = 400;
    return next(error);
  }

  const student = getStudentByPosition(position);

  if (!student) {
    const error = Error("Student not found");
    error.statusCode = 404;
    return next(error);
  }

  return res.success(200,`Student in pos ${position} succesfully retrieved`,student);
}