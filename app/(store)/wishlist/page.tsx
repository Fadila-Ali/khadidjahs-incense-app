import { getUserWishlist } from "@/sanity/lib/wishlist/getUserWishlist";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import ProductGrid from "@/components/ProductGrid";
import { HeartIcon } from "@sanity/icons";

export const dynamic = "force-dynamic";

export default async function WishlistPage() {
    const { userId } = await auth();

    if (!userId) {
        redirect("/sign-in");
    }

    const wishlistItems = await getUserWishlist(userId);
    const products = wishlistItems
        .map((item: any) => item.product)
        .filter(Boolean);

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-8">
                <div className="flex items-center gap-3 mb-2">
                    <HeartIcon className="w-8 h-8 text-red-500 fill-current" />
                    <h1 className="text-3xl font-bold">My Wishlist</h1>
                </div>
                <p className="text-gray-600">
                    {products.length} {products.length === 1 ? "item" : "items"} saved
                </p>
            </div>

            {products.length > 0 ? (
                <ProductGrid products={products} />
            ) : (
                <div className="text-center py-16">
                    <HeartIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h2 className="text-2xl font-semibold text-gray-700 mb-2">
                        Your wishlist is empty
                    </h2>
                    <p className="text-gray-600 mb-6">
                        Start adding products you love to your wishlist!
                    </p>
                    <a
                        href="/"
                        className="inline-block bg-yellow-600 text-white px-6 py-3 rounded-lg hover:bg-yellow-700 transition-colors"
                    >
                        Browse Products
                    </a>
                </div>
            )}
        </div>
    );
}