//Ejercicio 3: Sistema de Calificaciones con funciones
//Crear varias funciones pequeñas que trabajem junstas para generar un reporte de estudiantes

const estudiantes = [
  { nombre: "Ana", notas: [80, 90, 75] },
  { nombre: "Luis", notas: [50, 60, 58] },
  { nombre: "Carla", notas: [95, 92, 98] },
  { nombre: "Pedro", notas: [40, 45, 50] }
];


function calcularPromedio(notas){
    const suma = (notas[0] + notas[1] + notas [2]) / 3;
    return Number(suma.toFixed(2))
}

const obtenerEstado = function(promedio){
    let estado;
    if(promedio >= 60){
        estado = "Aprobado";
    } else if (promedio < 60){
        estado = "Reprobado";
    }
    return estado;
};

const generarReporte = (estudiantes) => {
    return estudiantes.map(estudiante => {
        const promedio = calcularPromedio(estudiante.notas);
        const estado = obtenerEstado(promedio);

        return {
            nombre: estudiante.nombre,
            promedio: promedio,
            estado: estado
        };
    });
}

console.log(generarReporte(estudiantes));