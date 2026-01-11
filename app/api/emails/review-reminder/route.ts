import { sendReviewReminderEmail } from "@/lib/emailService";
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

        // Fetch order details with product info
        const order = await client.fetch(
            `*[_type == "order" && _id == $orderId][0]{
                orderNumber,
                customerName,
                email,
                products[]->{
                    _id,
                    name,
                    slug
                }
            }`,
            { orderId }
        );

        if (!order) {
            return NextResponse.json(
                { error: "Order not found" },
                { status: 404 }
            );
        }

        // Prepare items for email
        const items = order.products.map((product: any) => ({
            name: product.name,
            productId: product._id,
            slug: product.slug.current,
        }));

        // Send email
        const result = await sendReviewReminderEmail({
            to: order.email,
            customerName: order.customerName,
            orderNumber: order.orderNumber,
            items,
        });

        if (result.success) {
            // Mark email as sent
            await client
                .patch(orderId)
                .set({ "emailsSent.reviewReminder": true })
                .commit();
        }

        return NextResponse.json(result);
    } catch (error) {
        console.error("Error sending review reminder email:", error);
        return NextResponse.json(
            { error: "Failed to send email" },
            { status: 500 }
        );
    }
}