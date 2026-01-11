import AddToBasketButton from "@/components/AddToBasketButton";
import WishlistButtonWithCheck from "@/components/WishlistButtonWithCheck";
import ReviewsSection from "@/components/ReviewsSection";
import SimilarProductsSection from "@/components/SimilarProductsSection";
import { imageUrl } from "@/lib/imageUrl";
import { getProductBySlug } from "@/sanity/lib/products/getProductBySlug";
import { getProductReviews } from "@/sanity/lib/reviews/getProductReviews";
import { getSimilarProducts } from "@/sanity/lib/products/getSimilarProducts";
import { getActiveSaleByCouponCode } from "@/sanity/lib/sales/getActiveSaleByCouponCode";
import { COUPON_CODES } from "@/sanity/lib/sales/couponCodes";
import { PortableText } from "next-sanity";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Tag } from "lucide-react";

export const dynamic = "force-static";
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

    // Get active sale
    const activeSale = await getActiveSaleByCouponCode(COUPON_CODES.RAMADAN26);
    
    // Debug logging
    console.log("Active Sale Data:", activeSale);
    console.log("Is Active:", activeSale?.isActive);
    console.log("Discount Amount:", activeSale?.discountAmount);

    const hasActiveSale = activeSale && activeSale.isActive === true && (activeSale.discountAmount ?? 0) > 0;

    // Calculate discounted price if sale is active
    const originalPrice = product.price ?? 0;
    const discountedPrice = hasActiveSale && activeSale 
        ? originalPrice * (1 - (activeSale.discountAmount ?? 0) / 100)
        : originalPrice;
    const savings = originalPrice - discountedPrice;

    console.log("Has Active Sale:", hasActiveSale);
    console.log("Original Price:", originalPrice);
    console.log("Discounted Price:", discountedPrice);

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
                    {hasActiveSale && activeSale && !isOutOfStock && (
                        <div className="absolute top-4 left-4 bg-linear-to-r from-yellow-500 to-orange-500 text-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2 animate-pulse">
                            <Tag className="w-5 h-5" />
                            <span className="font-bold text-base">{activeSale.discountAmount}% OFF</span>
                        </div>
                    )}
                </div>
                <div className="flex flex-col justify-between">
                    <div>
                        <div className="flex items-start justify-between mb-4">
                            <h1 className="text-3xl font-bold">{product.name}</h1>
                            <WishlistButtonWithCheck productId={product._id} />
                        </div>
                        
                        {/* Price Section with Sale Display */}
                        <div className="mb-6">
                            {hasActiveSale && activeSale ? (
                                <div className="space-y-3">
                                    <div className="flex items-baseline gap-3 flex-wrap">
                                        <span className="text-4xl font-bold text-green-600">
                                            ${discountedPrice.toFixed(2)}
                                        </span>
                                        <span className="text-2xl text-gray-400 line-through">
                                            ${originalPrice.toFixed(2)}
                                        </span>
                                    </div>
                                    <div className="bg-linear-to-r from-amber-50 to-yellow-50 border-2 border-yellow-500 px-4 py-4 rounded-lg shadow-md">
                                        <div className="flex items-start gap-3">
                                            <Tag className="w-6 h-6 text-yellow-600 mt-1 shrink-0" />
                                            <div className="space-y-2 flex-1">
                                                <p className="text-base font-bold text-gray-900">
                                                    {activeSale.title}
                                                </p>
                                                {activeSale.description && (
                                                    <p className="text-sm text-gray-700">
                                                        {activeSale.description}
                                                    </p>
                                                )}
                                                <div className="bg-white px-3 py-2 rounded-md border border-yellow-400 inline-block">
                                                    <p className="text-sm font-semibold text-gray-800">
                                                        Use code:{" "}
                                                        <span className="text-yellow-600 font-bold font-mono text-base">
                                                            {activeSale.couponCode}
                                                        </span>
                                                        {" "}for {activeSale.discountAmount}% OFF
                                                    </p>
                                                </div>
                                                <p className="text-sm text-green-700 font-bold">
                                                    🎉 You save ${savings.toFixed(2)}!
                                                </p>
                                                {activeSale.validUntil && (
                                                    <p className="text-xs text-gray-500">
                                                        Valid until {new Date(activeSale.validUntil).toLocaleDateString('en-US', { 
                                                            month: 'long', 
                                                            day: 'numeric', 
                                                            year: 'numeric' 
                                                        })}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="text-4xl font-bold text-gray-900">
                                    ${originalPrice.toFixed(2)}
                                </div>
                            )}
                        </div>

                        <div className="mb-6">
                            <AddToBasketButton product={product} disabled={isOutOfStock} />
                            <p className="font-bold text-xs text-center py-2">Add To Cart</p>
                        </div>

                        <div className="prose max-w-none">
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