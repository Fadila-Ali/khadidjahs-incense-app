import { Category, Product } from "@/sanity.types";
import ProductGrid from "./ProductGrid";
import { CategorySelectorComponent } from "./ui/category-selector";

interface ProductsViewProps {
    products: Product[];
    categories: Category[];
}

function ProductsView({products, categories}: ProductsViewProps) {
  return (
    <div className="flex flex-col">
        <section className="w-full sm:w-50">
            <CategorySelectorComponent categories={categories} />
        </section>
        <section className="flex-1">
            <div>
                <ProductGrid products={products} />
                <hr className="w-1/2 sm:w-3/4"/>
            </div>
        </section>
    </div>
  )
}

export default ProductsView