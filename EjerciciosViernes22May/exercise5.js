//Ejercicio 5: Usa Promise.all
//En un nuevo archivo exercise5.js, crea una función getData 
// y usando Promise.all obten un usuario y la lista de productos, 
// despues de obtener ambos, imprime la información obtenida.

import { getUser, getProductList } from "./sandbox.js";

async function getData(id){
    console.log("Begin exercise 5...");
    try{
        const [user, listProduct] = await Promise.all([
            getUser(id),
            getProductList()
        ]);
        
        console.log("User getted: ", user);
        console.log("User orders: ", listProduct);
    }catch(error){
        console.error("Error in process: ", error);
    }
}

getData(1);