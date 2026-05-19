//Ejercicio 5: Generar reporte de inventario crítico
//Practicar el encadenamiento de funciones de orden superior como filter(), map() y sort().
//Tienes un arreglo de productos en inventario. 
// Cada producto tiene nombre, stock, stock mínimo y precio.
//La función debe devolver un arreglo con los productos cuyo stock 
// sea menor o igual al stock mínimo.

const products = [
  { name: "Laptop", stock: 2, stockMin: 5, price: 5000 },
  { name: "Mouse", stock: 10, stockMin: 5, price: 100 },
  { name: "Teclado", stock: 3, stockMin: 3, price: 200 },
  { name: "Monitor", stock: 1, stockMin: 4, price: 900 }
];

const generateReportInventoryCritic = (products) =>{
    return report = products
        .filter(product => product.stock <= product.stockMin)
        .map(product => {
            const missingValue = (product.stockMin - product.stock) * product.price;
            return {
                name: product.name,
                stock: product.stock,
                stockMin: product.stockMin,
                missingValue: missingValue
            }
        })
        .sort((a, b) => b.missingValue - a.missingValue);
};

console.log(generateReportInventoryCritic(products));