import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";

export const getProductReviews = async (productId: string) => {
    const PRODUCT_REVIEWS_QUERY = defineQuery(`
        *[
            _type == "review" &&
            product._ref == $productId
        ] | order(createdAt desc)
    `);

    try {
        const reviews = await sanityFetch({
            query: PRODUCT_REVIEWS_QUERY,
            params: {
                productId,
            },
        });

        return reviews.data || [];
    } catch (error) {
        console.error("Error fetching product reviews: ", error);
        return [];
    }
};