//Ejercicio 7: Analizador de pedidos de clientes
//Practicar el procesamiento avanzado de arrays y objetos usando 
// filter(), map(), reduce() y some().
//Tienes un arreglo de pedidos. Cada pedido pertenece a un cliente 
// y contiene una lista de productos comprados.
//La función debe devolver un objeto con la siguiente información:
// clientesConPedidosGrandes
// totalVendido
// productosVendidos
// pedidosConDescuento

const pedidos = [
  {
    cliente: "Ana",
    tieneDescuento: true,
    productos: [
      { nombre: "Laptop", precio: 5000, cantidad: 1 },
      { nombre: "Mouse", precio: 100, cantidad: 2 }
    ]
  },
  {
    cliente: "Luis",
    tieneDescuento: false,
    productos: [
      { nombre: "Teclado", precio: 200, cantidad: 1 }
    ]
  },
  {
    cliente: "Carla",
    tieneDescuento: true,
    productos: [
      { nombre: "Monitor", precio: 900, cantidad: 2 },
      { nombre: "Mouse", precio: 100, cantidad: 1 }
    ]
  }
];

const analizeOrders = (orders) => {
  const clientsWithBigOrders = orders
    .filter(order => {
      const total = order.productos.reduce((acc, prod) =>
        acc + (prod.precio * prod.cantidad)
      ,0);
      return total > 1000;        
    })
    .map(order => order.cliente);

  const totalSold = orders.reduce((totalGlobal, order) => {
    const totalOrder = order.productos.reduce((sum, prod) => 
      sum + (prod.precio * prod.cantidad), 0);
    return totalGlobal + totalOrder;
  }, 0);

  const productsSelled = orders.reduce((acc, order) => {
        order.productos.forEach(product => {
            const name = product.nombre;
            acc[name] = (acc[name] || 0) + product.cantidad;
        });
        return acc;
  }, {});

  const orderWithDiscount = orders.filter(order => order.tieneDescuento);
  return {
    clientsWithBigOrders : clientsWithBigOrders,
    totalSold : totalSold,
    productsSelled : productsSelled,
    orderWithDiscount : orderWithDiscount
  };
};

console.log(analizeOrders(pedidos));