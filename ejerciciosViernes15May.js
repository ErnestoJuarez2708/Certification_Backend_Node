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
