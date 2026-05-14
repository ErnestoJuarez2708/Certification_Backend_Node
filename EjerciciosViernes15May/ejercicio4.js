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