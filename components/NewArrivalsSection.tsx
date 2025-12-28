import { Product } from "@/sanity.types";
import ProductGrid from "./ProductGrid";

interface NewArrivalsSectionProps {
    products: Product[];
}

function NewArrivalsSection({ products }: NewArrivalsSectionProps) {
    if (products.length === 0) return null;

    return (
        <div className="flex flex-col items-center justify-top bg-gray-100 p-4">
            <div className="">
                <div className="mb-6">
                    <h2 className="text-3xl font-bold text-gray-900">New Arrivals</h2>
                    <p className="text-gray-600 mt-2">Check out our latest products</p>
                </div>
                <ProductGrid products={products} />
            </div>
        </div>
    );
}

export default NewArrivalsSection;