//Ejercicio 6: Menejo de errores
//Analiza el código en sandbox.js y modifica la función getOrders 
// para manejar el error cuando un userId negativo es enviado a la función.

//Crea una funcioni test1 donde captures el error usando .catch 
//y luego otra funcion asincrona test2 donde captures el error usando try/catch.
import { getOrders } from "./sandbox.js";

function test1(id){
    console.log("Begin exercise 6...");
    getOrders(id)
        .then(order => {
            console.log("Orders of user: " , order);
        })
        .catch(error => {
            console.error("Error in proccess with catch: ", error," with id: ", id);
        });
};

test1(1);
test1(-1);

const test2 = async (id) => {
    try{
        const order = await getOrders(id);
        console.log("Getting Orders: ", order);
    }catch(error){
        console.error("Error in proccess with catch 2: ", error ," with id: ", id);
    }
}

test2(2);
test2(-2);