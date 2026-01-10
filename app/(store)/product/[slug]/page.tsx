import AddToBasketButton from "@/components/AddToBasketButton";
import WishlistButtonWithCheck from "@/components/WishlistButtonWithCheck";
import ReviewsSection from "@/components/ReviewsSection";
import SimilarProductsSection from "@/components/SimilarProductsSection";
import { imageUrl } from "@/lib/imageUrl";
import { getProductBySlug } from "@/sanity/lib/products/getProductBySlug";
import { getProductReviews } from "@/sanity/lib/reviews/getProductReviews";
import { getSimilarProducts } from "@/sanity/lib/products/getSimilarProducts";
import { PortableText } from "next-sanity";
import Image from "next/image";
import { notFound } from "next/navigation";

export const dynamic = "force-static"; // Keep this as force-static
export const revalidate = 60; 

async function productPage({
     params,
 }: { 
    params: Promise<{ 
        slug: string;
    }>;
 }) {
    const { slug } = await params;
    const product = await getProductBySlug(slug);

    console.log(
        crypto.randomUUID().slice(0, 5) + 
        `>>> Rerendered the product page cache for ${slug}`
    );

    if (!product) {
        return notFound();
    }

    const isOutOfStock = product.stock != null && product.stock <= 0;

    // Get similar products based on categories
    const categoryIds = (product.categories
        ?.map((cat: any) => cat?._ref)
        .filter((id: any) => Boolean(id)) as string[]) || [];
    const similarProducts = await getSimilarProducts(product._id, categoryIds);
    
    // Get product reviews
    const reviews = await getProductReviews(product._id);

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className={`relative aspect-square overflow-hidden rounded-lg shadow-lg ${isOutOfStock ? "opacity-50" : ""}`}>
                    {product.image && (
                        <Image
                            src={imageUrl(product.image).url()}
                            alt={product.name ?? "Product image"}
                            fill
                            className="object-contain transition-transform duration-300 hover:scale-105"
                        />
                    )}
                    {isOutOfStock && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                            <span className="text-white font-bold text-lg">Out of Stock</span>
                        </div>
                    )}
                </div>
                <div className="flex flex-col justify-between">
                    <div>
                        <div className="flex items-start justify-between mb-4">
                            <h1 className="text-3xl font-bold">{product.name}</h1>
                            <WishlistButtonWithCheck productId={product._id} />
                        </div>
                        <div className="text-xl font-semibold mb-4">${product.price?.toFixed(2)}</div>
                        <div className="flex items-start justify-between mt-6">
                            <AddToBasketButton product={product} disabled={isOutOfStock} />
                        </div>
                        <div className="prose max-w-none my-6">
                            {Array.isArray(product.description) && (
                                <PortableText value={product.description}/>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <SimilarProductsSection products={similarProducts} />
            <ReviewsSection reviews={reviews} productId={product._id} productName={product.name || "this product"} />

        </div>
    );
}

export default productPage;