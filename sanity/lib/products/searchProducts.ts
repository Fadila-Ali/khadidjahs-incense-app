import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";

export const searchProducts = async (searchTerm: string) => {
    if (!searchTerm || searchTerm.trim().length === 0) {
        return [];
    }

    const SEARCH_PRODUCTS_QUERY = defineQuery(`
        *[
            _type == "product" &&
            (
                name match $searchTerm + "*" ||
                pt::text(description) match $searchTerm + "*"
            )
        ] | order(name asc)[0...10]
    `);

    try {
        const products = await sanityFetch({
            query: SEARCH_PRODUCTS_QUERY,
            params: {
                searchTerm: searchTerm.trim(),
            },
        });

        return products.data || [];
    } catch (error) {
        console.error("Error searching products: ", error);
        return [];
    }
};