//Ejercicio 4: Async/Await
//En un nuevo archivo exercise4.js, 
// crea una función asincrona printOrdersByUser y 
// replica el comportamiento del ejercicio 3, incluido el manejo de errores.

import { getUser, getOrders } from "./sandbox.js";

const printOrdersByUser = async (id) =>{
    console.log("Begin exercise 4...");
    try{
        const user = await getUser(id);
        console.log("User getted: ", user);
        const order = await getOrders(user.id);
        console.log("User orders: ", order);
    }catch(error){
        console.error("Error in process: ", error);
    }
}

printOrdersByUser(1);
//printOrdersByUser(-5);