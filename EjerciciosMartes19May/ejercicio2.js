//Ejercicio 2: Obtener nombres de estudiantes aprobados
//Practicar el uso combinado de filter() y map().
//Tienes un arreglo de estudiantes. Cada estudiante tiene un nombre y una nota final.
//La función debe devolver un arreglo con los nombres de los estudiantes que aprobaron.

const students = [
  { name: "Ana", note: 85 },
  { name: "Luis", note: 45 },
  { name: "Carla", note: 70 },
  { name: "Pedro", note: 55 }
];

const getApproved = function(students){
    let approbed = students
        .filter(student => student.note >= 60)
        .map(student => student.name);
    return approbed;
};

console.log(getApproved(students));