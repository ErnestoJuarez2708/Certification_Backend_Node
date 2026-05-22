//Ejercicio 7: Consultar información completa de una orden
import { getUser, getOrders, getPaymentStatus, getShippingInfo } from "./sandbox.js"

const printOrderSummary = async (userId, orderId) => {
    console.log("Begin exercise 7...");
    try {
        const [user, orders] = await Promise.all([
            getUser(userId),
            getOrders(userId)
        ]);
        const order = orders.find(o => o.id === orderId);
        if (!order) {
            throw new Error(`Order with id ${orderId} not found for user ${userId}`);
        }
        const [payment, shipping] = await Promise.all([
            getPaymentStatus(orderId),
            getShippingInfo(orderId)
        ]);
        console.log("User:", user.name);
        console.log(`Order: ${order.product} - ${order.price}`);
        console.log("Payment status:", payment.status);
        console.log("Shipping status:", shipping.status);
        console.log("Shipping company:", shipping.company);
    } catch (error) {
       console.error("Error in process:", error);
    }
}

printOrderSummary(1,1);
//printOrderSummary(1, 99);
//printOrderSummary(-1, 1);