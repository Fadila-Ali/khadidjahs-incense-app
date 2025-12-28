import { searchProducts } from "@/sanity/lib/products/searchProducts";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const query = searchParams.get("q");

        if (!query) {
            return NextResponse.json({ products: [] });
        }

        const products = await searchProducts(query);
        return NextResponse.json({ products });
    } catch (error) {
        console.error("Error in search API:", error);
        return NextResponse.json(
            { error: "Failed to search products" },
            { status: 500 }
        );
    }
}