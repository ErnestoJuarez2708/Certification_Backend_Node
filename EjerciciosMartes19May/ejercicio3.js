//Ejercicio 3: Aplicar descuento a productos de una categoría
//Practicar la transformacion de arrays de objetos usando map
//Tienes un arreglo de productos. Cada producto tiene nombre, precio y categoría.
//La función debe devolver un nuevo arreglo donde los productos de la categoría 
// indicada tengan aplicado el descuento.

const products = [
  { name: "Laptop", price: 5000, category: "tecnologia" },
  { name: "Camisa", price: 200, category: "ropa" },
  { name: "Mouse", price: 100, category: "tecnologia" }
];

function doDiscountByCategory(products, category, discount){
    return newPrice = products.map(product => {
        if(product.category === "tecnologia"){
            product.price -= (product.price * (discount/100))
        }
        return {
            name: product.name,
            price: product.price,
            category: product.category
        }
    });
};

console.log(doDiscountByCategory(products, "tecnologia", 10));
