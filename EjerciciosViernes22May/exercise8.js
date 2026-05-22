//Ejercicio 8: Obtener detalles de productos de forma paralela
import { getProductList, getProductDetail } from "./sandbox.js";

const printAvailableProductDetails = async () => {
    console.log("Begin exercise 8...");
    try {
        const productName = await getProductList();
        const detail = productName.map(name => getProductDetail(name));
        const productsDetails = await Promise.all(detail);
        const availableProducts = productsDetails.filter(product => product.stock > 0);
        console.log("Available products:");
        availableProducts.forEach(product => {
            console.log(`${product.name} - ${product.category} - stock: ${product.stock}`);
        });
    } catch (error) {
        console.error("Error in process:", error);
    }
}
printAvailableProductDetails();