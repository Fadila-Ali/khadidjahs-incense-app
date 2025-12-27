import BlackFridayBanner from "@/components/BlackFridayBanner";
import NewArrivalsSection from "@/components/NewArrivalsSection";
import ProductsView from "@/components/ProductsView";
import { getAllCategories } from "@/sanity/lib/products/getAllCategories";
import { getAllProducts } from "@/sanity/lib/products/getAllProducts";
import { getNewArrivals } from "@/sanity/lib/products/getNewArrivals";

export const dynamic = "force-static";
export const revalidate = 60; 

export default async function Home() {
  const products = await getAllProducts();
  const categories = await getAllCategories();
  const newArrivals = await getNewArrivals();

  console.log(
    crypto.randomUUID().slice(0, 5) + 
      `>>> Rerendered the home page cache with ${products.length} products, ${categories.length} categories, and ${newArrivals.length} new arrivals`
  );

  return (
    <div>
      <BlackFridayBanner/> 
      <NewArrivalsSection products={newArrivals} />
      <div className="flex flex-col items-center justify-top min-h-screen bg-gray-100 p-4">
        <ProductsView products={products} categories={categories} />
      </div>
    </div>
  );
}