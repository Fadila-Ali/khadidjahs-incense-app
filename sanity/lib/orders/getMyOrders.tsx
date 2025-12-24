import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";
// import { MY_ORDERS_QUERY_RESULT } from "@/sanity.types";
import { MY_ORDERS_QUERY_RESULT, Order } from "@/sanity.types";

export async function getMyOrders(userId: string): Promise<MY_ORDERS_QUERY_RESULT> {
    if (!userId) {
        throw new Error("User ID is required");
    }

    // Define the query to get orders based on user ID, sorted by ordersDate descending
    const MY_ORDERS_QUERY = defineQuery(`
        *[_type == "order" && clerkUserId == $userId] | order(orderDate desc) {
            ...,
            products[]{
                ...,
                product->
            }
        }
    `);

    try {
        // Use sanityFetch to send the query
        const orders = await sanityFetch({
            query: MY_ORDERS_QUERY,
            params: { userId },
        });

        // Return the list of orders, or an empty array if none is found
        return orders.data || [];
    } catch (error) {
        console.error("Error fetching orders: ", error);
        throw new Error("Error fetching orders");
    }
    
}