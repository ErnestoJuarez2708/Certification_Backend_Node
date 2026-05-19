//Ejercicio 6: Agrupar estudiantes por estado académico
//Practicar el uso de map() y reduce() para transformar y agrupar datos.
//Tienes un arreglo de estudiantes. Cada estudiante tiene nombre y un arreglo de notas.
//La función debe calcular el promedio de cada estudiante y agruparlos en tres categorías:
//    excelente
//    aprobado
//    reprobado

const students = [
  { name: "Ana", notes: [95, 90, 100] },
  { name: "Luis", notes: [50, 60, 55] },
  { name: "Carla", notes: [70, 80, 75] },
  { name: "Pedro", notes: [40, 45, 50] }
];

const groupByAcademicState = (students) =>{
    return academic = students
        .map(student => {
            const average = (student.notes[0] + student.notes[1] + student.notes[2]) / 3;
            return {
                name: student.name,
                average: average
            };
        })
        .reduce((acc, student) => {
            if(student.average >= 90){
                acc.excelent.push(student);
            } else if (student.average >= 60 && student.average < 90){
                acc.approved.push(student);
            } else {
                acc.fail.push(student);
            }
            return acc;
        },{
            excelent: [],
            approved: [],
            fail: []
        });
}

console.log(groupByAcademicState(students));