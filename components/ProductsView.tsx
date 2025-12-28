"use client";

import { Category, Product } from "@/sanity.types";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import ProductGrid from "./ProductGrid";
import { CategorySelectorComponent } from "./ui/category-selector";

interface ProductsViewProps {
    products: Product[];
    categories: Category[];
}

function ProductsView({ products, categories }: ProductsViewProps) {
    const searchParams = useSearchParams();
    const searchQuery = searchParams.get("search");
    const [filteredProducts, setFilteredProducts] = useState(products);

    useEffect(() => {
        if (searchQuery) {
            const filtered = products.filter((product) => {
                const searchLower = searchQuery.toLowerCase();
                const nameMatch = product.name?.toLowerCase().includes(searchLower);
                const descriptionMatch = product.description
                    ?.map((block) =>
                        block._type === "block"
                            ? block.children?.map((child) => child.text).join("")
                            : ""
                    )
                    .join(" ")
                    .toLowerCase()
                    .includes(searchLower);

                return nameMatch || descriptionMatch;
            });
            setFilteredProducts(filtered);
        } else {
            setFilteredProducts(products);
        }
    }, [searchQuery, products]);

    return (
        <div className="flex flex-col">
            {searchQuery && (
                <div className="mb-4 p-4 bg-blue-50 rounded-lg">
                    <p className="text-gray-700">
                        Showing {filteredProducts.length} result{filteredProducts.length !== 1 ? "s" : ""} for{" "}
                        <span className="font-semibold">"{searchQuery}"</span>
                    </p>
                </div>
            )}
            <section className="w-full sm:w-50">
                <CategorySelectorComponent categories={categories} />
            </section>
            <section className="flex-1">
                <div>
                    {filteredProducts.length > 0 ? (
                        <ProductGrid products={filteredProducts} />
                    ) : (
                        <div className="text-center py-12">
                            <p className="text-gray-600 text-lg">No products found</p>
                            <p className="text-gray-500 mt-2">Try adjusting your search or filters</p>
                        </div>
                    )}
                    <hr className="w-1/2 sm:w-3/4" />
                </div>
            </section>
        </div>
    );
}

export default ProductsView;