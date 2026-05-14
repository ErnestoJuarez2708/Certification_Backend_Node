//Ejercicio 1: Calculadora de descuentos inteligentes
// Crear una función que calcule el precio final de un producto aplicando descuentos según distintas reglas.

//precio = Number, categoria = String, esClienteFrecuente = boolean
const calcularPrecioFinal = (precio, categoria, esClienteFrecuente) => {
    let finalPrice = precio;
    if(categoria === "tecnologia"){
        finalPrice -= (finalPrice * 0.10);
    } else if(categoria === "ropa"){
        finalPrice -= (finalPrice * 0.15);
    } else if (categoria === "alimentos"){
        finalPrice -= (finalPrice * 0.05);
    }
    if(esClienteFrecuente){
        finalPrice -= (finalPrice * 0.05);
    }
    if(finalPrice > 1000){
        finalPrice -= 50;
    }
    return finalPrice;
}

console.log(calcularPrecioFinal(1200, "tecnologia", true));

//Ejercicio 2: Evaluador de contraseñas seguras
//Crear funciones que analicen si una contraseña es segura

const evaluarPassword = function(password){
    let errores = [];
    if(password.length < 8){
        errores.push("falta longitud minima");
    }
    if (!/[A-Z]/.test(password)) {
        errores.push("falta mayuscula");
    }
    if (!/[a-z]/.test(password)) {
        errores.push("falta minuscula");
    }
    if (!/[0-9]/.test(password)) {
        errores.push("falta numero");
    }
    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
        errores.push("falta simbolo");
    }
    if (errores.length === 0) {
        return "Contraseña segura";
    } else {
        return `Contraseña debil: ${errores.join(", ")}`;
    }
};

console.log(evaluarPassword("hola123"));

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


//Ejercicio 4: Generador de ID's para registros de usuarios
//Crear una función que use closures para generar IDs únicos, simulando un caso común en backend.

const crearGeneradorDeIds = (prefijo) =>{
    let contador = 0;
    return () => {
        contador++;
        return `${prefijo}-${contador}`;
    }
}

const generarIdUsuario = crearGeneradorDeIds("USR");

console.log(generarIdUsuario());
console.log(generarIdUsuario());
console.log(generarIdUsuario());

const generarIdProducto = crearGeneradorDeIds("PROD");

console.log(generarIdProducto());
console.log(generarIdProducto());

//Reto

const crearGeneradorDeIds2 = function(prefijo, contador){
    let count = contador;
    return () => {
        count++;
        return `${prefijo}-${count}`;
    }
};

const generarIdUsuario2 = crearGeneradorDeIds2("USR", 100);

console.log(generarIdUsuario2());
console.log(generarIdUsuario2());
console.log(generarIdUsuario2());
