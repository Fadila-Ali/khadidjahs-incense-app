import { client } from "@/sanity/lib/client";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { productId, customerName, rating, comment } = body;

        // Validate input
        if (!productId || !customerName || !rating || !comment) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        if (rating < 1 || rating > 5) {
            return NextResponse.json(
                { error: "Rating must be between 1 and 5" },
                { status: 400 }
            );
        }

        // Create review in Sanity
        const review = await client.create({
            _type: "review",
            product: {
                _type: "reference",
                _ref: productId,
            },
            customerName,
            rating,
            comment,
            createdAt: new Date().toISOString(),
            verified: false,
        });

        return NextResponse.json({ success: true, review }, { status: 201 });
    } catch (error) {
        console.error("Error creating review:", error);
        return NextResponse.json(
            { error: "Failed to create review" },
            { status: 500 }
        );
    }
}