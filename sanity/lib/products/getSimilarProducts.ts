import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";

export const getSimilarProducts = async (productId: string, categories: string[]) => {
    // If no categories, return empty array
    if (!categories || categories.length === 0) {
        return [];
    }

    const SIMILAR_PRODUCTS_QUERY = defineQuery(`
        *[
            _type == "product" &&
            _id != $productId &&
            count((categories[]->_id)[@ in $categories]) > 0
        ] | order(_createdAt desc)[0...5]
    `);

    try {
        const products = await sanityFetch({
            query: SIMILAR_PRODUCTS_QUERY,
            params: {
                productId,
                categories,
            },
        });

        return products.data || [];
    } catch (error) {
        console.error("Error fetching similar products: ", error);
        return [];
    }
};