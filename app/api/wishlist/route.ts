import { client } from "@/sanity/lib/client";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Add to wishlist
export async function POST(request: Request) {
    try {
        const { userId } = await auth();
        
        if (!userId) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }

        const body = await request.json();
        const { productId } = body;

        if (!productId) {
            return NextResponse.json(
                { error: "Product ID is required" },
                { status: 400 }
            );
        }

        // Check if already in wishlist
        const existing = await client.fetch(
            `*[_type == "wishlist" && userId == $userId && product._ref == $productId][0]`,
            { userId, productId }
        );

        if (existing) {
            return NextResponse.json(
                { error: "Product already in wishlist" },
                { status: 400 }
            );
        }

        // Add to wishlist
        const wishlistItem = await client.create({
            _type: "wishlist",
            userId,
            product: {
                _type: "reference",
                _ref: productId,
            },
            addedAt: new Date().toISOString(),
        });

        return NextResponse.json({ success: true, wishlistItem }, { status: 201 });
    } catch (error) {
        console.error("Error adding to wishlist:", error);
        return NextResponse.json(
            { error: "Failed to add to wishlist" },
            { status: 500 }
        );
    }
}

// Remove from wishlist
export async function DELETE(request: Request) {
    try {
        const { userId } = await auth();
        
        if (!userId) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }

        const { searchParams } = new URL(request.url);
        const productId = searchParams.get("productId");

        if (!productId) {
            return NextResponse.json(
                { error: "Product ID is required" },
                { status: 400 }
            );
        }

        // Find the wishlist item
        const wishlistItem = await client.fetch(
            `*[_type == "wishlist" && userId == $userId && product._ref == $productId][0]`,
            { userId, productId }
        );

        if (!wishlistItem) {
            return NextResponse.json(
                { error: "Product not in wishlist" },
                { status: 404 }
            );
        }

        // Delete the wishlist item
        await client.delete(wishlistItem._id);

        return NextResponse.json({ success: true }, { status: 200 });
    } catch (error) {
        console.error("Error removing from wishlist:", error);
        return NextResponse.json(
            { error: "Failed to remove from wishlist" },
            { status: 500 }
        );
    }
}