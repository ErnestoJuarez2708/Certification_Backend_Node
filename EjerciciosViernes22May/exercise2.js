//Ejercicio 2: Consumir una Promise
//En un nuevo archivo exercise2.js, 
// debes invocar a la función getUser y consumir su resultado con .then, 
// puedes simplemente imprimir el usuario obtenido.



import { getUser } from "./sandbox.js";

console.log("Begin exercise 2...");

getUser(1)
    .then(user => {
        console.log("User getted: ", user);
    })
    .catch(error => {
        console.error("Error to get user: ", error);
    });

console.log("Finish process");