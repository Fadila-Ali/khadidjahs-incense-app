import { sendShippingUpdateEmail } from "@/lib/emailService";
import { client } from "@/sanity/lib/client";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { orderId, trackingNumber, carrier, trackingUrl } = body;

        if (!orderId || !trackingNumber || !carrier) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        // Fetch order details
        const order = await client.fetch(
            `*[_type == "order" && _id == $orderId][0]{
                orderNumber,
                customerName,
                email
            }`,
            { orderId }
        );

        if (!order) {
            return NextResponse.json(
                { error: "Order not found" },
                { status: 404 }
            );
        }

        // Send email
        const result = await sendShippingUpdateEmail({
            to: order.email,
            customerName: order.customerName,
            orderNumber: order.orderNumber,
            trackingNumber,
            carrier,
            trackingUrl,
        });

        if (result.success) {
            // Update order with tracking info and mark email as sent
            await client
                .patch(orderId)
                .set({
                    trackingNumber,
                    carrier,
                    trackingUrl: trackingUrl || "",
                    "emailsSent.shippingUpdate": true,
                    status: "shipped",
                })
                .commit();
        }

        return NextResponse.json(result);
    } catch (error) {
        console.error("Error sending shipping update email:", error);
        return NextResponse.json(
            { error: "Failed to send email" },
            { status: 500 }
        );
    }
}