import { client } from "@/sanity/lib/client";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    try {
        // Verify cron secret to prevent unauthorized access
        const authHeader = request.headers.get("authorization");
        if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // Find orders from 7 days ago that haven't received review reminder
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

        const orders = await client.fetch(
            `*[
                _type == "order" && 
                orderDate < $sevenDaysAgo &&
                emailsSent.reviewReminder != true &&
                status == "delivered"
            ][0...50]`,
            { sevenDaysAgo: sevenDaysAgo.toISOString() }
        );

        console.log(`Found ${orders.length} orders to send review reminders`);

        // Send review reminder emails
        for (const order of orders) {
            try {
                await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/emails/review-reminder`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ orderId: order._id }),
                });
            } catch (error) {
                console.error(`Error sending review reminder for order ${order._id}:`, error);
            }
        }

        return NextResponse.json({ 
            success: true, 
            remindersSent: orders.length 
        });
    } catch (error) {
        console.error("Error in review reminders cron:", error);
        return NextResponse.json(
            { error: "Failed to process review reminders" },
            { status: 500 }
        );
    }
}
