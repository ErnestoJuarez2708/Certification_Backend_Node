//Ejercicio 4: Generador de ID's para registros de usuarios
//Crear una función que use closures para generar IDs únicos, simulando un caso común en backend.

const crearGeneradorDeIds = (prefijo, contador = 0) =>{
    let count = contador;
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

const generarIdProductoConID = crearGeneradorDeIds("USR", 100);

console.log(generarIdProductoConID());
console.log(generarIdProductoConID());
console.log(generarIdProductoConID());