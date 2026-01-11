import { client } from "@/sanity/lib/client";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { email } = body;

        if (!email) {
            return NextResponse.json(
                { error: "Email is required" },
                { status: 400 }
            );
        }

        const subscriber = await client.fetch(
            `*[_type == "newsletter" && email == $email][0]`,
            { email: email.toLowerCase() }
        );

        if (!subscriber) {
            return NextResponse.json(
                { error: "Email not found in our newsletter list" },
                { status: 404 }
            );
        }

        await client
            .patch(subscriber._id)
            .set({ status: "unsubscribed" })
            .commit();

        return NextResponse.json(
            { success: true, message: "You have been unsubscribed from our newsletter." },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error unsubscribing:", error);
        return NextResponse.json(
            { error: "Failed to unsubscribe" },
            { status: 500 }
        );
    }
}