import { Product } from "@/sanity.types";
import ProductGrid from "./ProductGrid";

interface SimilarProductsSectionProps {
    products: Product[];
}

function SimilarProductsSection({ products }: SimilarProductsSectionProps) {
    if (products.length === 0) return null;

    return (
        <div className="mt-16 border-t pt-8">
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900">You May Also Like</h2>
                <p className="text-gray-600 mt-2">Similar products you might be interested in</p>
            </div>
            <ProductGrid products={products} />
        </div>
    );
}

export default SimilarProductsSection;