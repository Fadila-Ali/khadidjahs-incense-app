import { client } from "@/sanity/lib/client";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    try {
        const { userId } = await auth();
        
        if (!userId) {
            return NextResponse.json({ isInWishlist: false });
        }

        const { searchParams } = new URL(request.url);
        const productId = searchParams.get("productId");

        if (!productId) {
            return NextResponse.json(
                { error: "Product ID is required" },
                { status: 400 }
            );
        }

        // Check if product is in wishlist
        const wishlistItem = await client.fetch(
            `*[_type == "wishlist" && userId == $userId && product._ref == $productId][0]`,
            { userId, productId }
        );

        return NextResponse.json({ isInWishlist: !!wishlistItem });
    } catch (error) {
        console.error("Error checking wishlist:", error);
        return NextResponse.json(
            { error: "Failed to check wishlist" },
            { status: 500 }
        );
    }
}