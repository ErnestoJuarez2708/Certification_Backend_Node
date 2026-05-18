//Ejercicio 4: Resumen de ventas por vendedor
//Practicar el uso de reduce() para acumular información a partir de un arreglo de objetos.
//Tienes un arreglo de ventas. Cada venta tiene vendedor, producto y monto.
//La función debe devolver un objeto donde cada propiedad sea el nombre de un vendedor 
// y su valor sea el total vendido.

const sales = [
  { seller: "Ana", product: "Laptop", amount: 5000 },
  { seller: "Luis", product: "Mouse", amount: 100 },
  { seller: "Ana", product: "Teclado", amount: 200 },
  { seller: "Luis", product: "Monitor", amount: 900 }
];

const calculateSalesBySeller = (sales) => {
    return sales.reduce((total, sale) => {
        if (total[sale.seller]) {
            total[sale.seller] += sale.amount;
        } else {
            total[sale.seller] = sale.amount;
        }
        return total;
    }, {});
};

console.log(calculateSalesBySeller(sales));