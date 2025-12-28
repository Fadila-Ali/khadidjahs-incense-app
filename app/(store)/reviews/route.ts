import { client } from "@/sanity/lib/client";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        // Check if user is authenticated
        const { userId } = await auth();
        
        if (!userId) {
            return NextResponse.json(
                { error: "Unauthorized. Please sign in to submit a review." },
                { status: 401 }
            );
        }

        const body = await request.json();
        const { productId, customerName, customerImage, rating, comment } = body;

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

        // Check if user already reviewed this product
        const existingReview = await client.fetch(
            `*[_type == "review" && userId == $userId && product._ref == $productId][0]`,
            { userId, productId }
        );

        if (existingReview) {
            return NextResponse.json(
                { error: "You have already reviewed this product" },
                { status: 400 }
            );
        }

        // Create review in Sanity
        const review = await client.create({
            _type: "review",
            userId,
            product: {
                _type: "reference",
                _ref: productId,
            },
            customerName,
            customerImage: customerImage || null,
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