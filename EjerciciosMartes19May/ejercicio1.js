//Ejercicio 1: Filtrar productos disponibles
// Practicar el uso de arrays, objetos y el método filter()
// Tienes un arreglo de productos. Cada producto tiene nombre, precio y disponibilidad.
//La función debe devolver un nuevo arreglo que contenga únicamente los productos disponibles.

const products = [
  { name: "Laptop", price: 4500, isAvailable: true },
  { name: "Mouse", price: 80, isAvailable: false },
  { name: "Teclado", price: 150, isAvailable: true }
];

const filterAvailable = (products) => {
    let productsAvailable = products.filter(
        product => product.isAvailable
    );
    return productsAvailable;
}

console.log(filterAvailable(products));