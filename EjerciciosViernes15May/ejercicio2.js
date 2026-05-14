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