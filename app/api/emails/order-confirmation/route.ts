import { sendOrderConfirmationEmail } from "@/lib/emailService";
import { client } from "@/sanity/lib/client";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { orderId } = body;

        if (!orderId) {
            return NextResponse.json(
                { error: "Order ID is required" },
                { status: 400 }
            );
        }

        // Fetch order details from Sanity
        const order = await client.fetch(
            `*[_type == "order" && _id == $orderId][0]{
                _id,
                orderNumber,
                customerName,
                email,
                totalPrice,
                orderDate,
                products[]->{
                    name,
                    price
                },
                "quantities": products[].quantity
            }`,
            { orderId }
        );

        if (!order) {
            return NextResponse.json(
                { error: "Order not found" },
                { status: 404 }
            );
        }

        // Prepare email data
        const items = order.products.map((product: any, index: number) => ({
            name: product.name,
            quantity: order.quantities[index],
            price: product.price,
        }));

        // Send email
        const result = await sendOrderConfirmationEmail({
            to: order.email,
            customerName: order.customerName,
            orderNumber: order.orderNumber,
            orderDate: new Date(order.orderDate).toLocaleDateString(),
            items,
            total: order.totalPrice,
        });

        if (result.success) {
            // Update order to mark email as sent
            await client
                .patch(orderId)
                .set({ "emailsSent.orderConfirmation": true })
                .commit();
        }

        return NextResponse.json(result);
    } catch (error) {
        console.error("Error sending order confirmation email:", error);
        return NextResponse.json(
            { error: "Failed to send email" },
            { status: 500 }
        );
    }
}