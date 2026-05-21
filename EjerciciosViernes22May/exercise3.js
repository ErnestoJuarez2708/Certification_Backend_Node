//Ejercicio 3: Encadenar Promises
//En un nuevo archivo exercise3.js, 
//crea una función printOrdersByUser que reciba un id y 
//que imprima tanto los datos del usuario, 
//como los datos de las ordenes de ese usuario, 
//para esto debes usar un .then encadenado.

//Escribe un handler de erroes, 
// y pruebalo enviando un id negativo a la función printOrdersByUser.
import { getUser, getOrders } from "./sandbox.js";

const printOrdersByUser = (id) =>{
    console.log("Begin exercise 3...");
    getUser(id)
        .then(user => {
            console.log("User getted: ", user);
            return getOrders(user.id);
        })
        .then(orders => {
            console.log("User orders: ", orders);
        })
        .catch(error => {
            console.error("Error in process: ", error);
        });
}

printOrdersByUser(1);
//printOrdersByUser(-5);