import { client } from "@/sanity/lib/client";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const { userId } = await auth();
        
        if (!userId) {
            return NextResponse.json({ wishlist: [] });
        }

        const wishlist = await client.fetch(
            `*[_type == "wishlist" && userId == $userId] { _id, product }`,
            { userId }
        );

        return NextResponse.json({ wishlist: wishlist || [] });
    } catch (error) {
        console.error("Error fetching user wishlist:", error);
        return NextResponse.json(
            { error: "Failed to fetch wishlist" },
            { status: 500 }
        );
    }
}