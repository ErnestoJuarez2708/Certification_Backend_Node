//Ejercicio 5: Middleware simple para contar peticiones por usuario
//Crear una función que use closures para contar cuántas veces un usuario 
// realiza una acción, simulando un control básico de peticiones en backend.
const crearContadorDePeticiones = function (nombre = null, limite) {
    let contador = 0;
    return () => {
        contador++;
        const mensajeBase = nombre ? `${nombre}: ` : "";
        if (contador <= limite) {
            return `${mensajeBase}Petición permitida. Intento ${contador} de ${limite}`;
        } else {
            return `${mensajeBase}Límite excedido. Intenta más tarde.`;
        }
    };
};

const verificarPeticion = crearContadorDePeticiones(null,3);

console.log(verificarPeticion());
console.log(verificarPeticion());
console.log(verificarPeticion());
console.log(verificarPeticion());
console.log("------------------------------------------------");

const peticionesAna = crearContadorDePeticiones("Ana", 3);
console.log(peticionesAna());
console.log(peticionesAna());
console.log(peticionesAna());
console.log(peticionesAna());
console.log("------------------------------------------------");

const ana = crearContadorDePeticiones("Ana", 3);
const luis = crearContadorDePeticiones("Luis", 2);

console.log(ana());
console.log(ana());
console.log(luis());
console.log(ana());
console.log(luis());
console.log(luis());