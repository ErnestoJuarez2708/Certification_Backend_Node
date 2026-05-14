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