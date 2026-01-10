import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";

export const checkProductInWishlist = async (userId: string, productId: string) => {
    const CHECK_WISHLIST_QUERY = defineQuery(`
        *[
            _type == "wishlist" &&
            userId == $userId &&
            product._ref == $productId
        ][0]
    `);

    try {
        const wishlistItem = await sanityFetch({
            query: CHECK_WISHLIST_QUERY,
            params: {
                userId,
                productId,
            },
        });

        return wishlistItem.data || null;
    } catch (error) {
        console.error("Error checking wishlist: ", error);
        return null;
    }
};