import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";

export const getUserWishlist = async (userId: string) => {
    const USER_WISHLIST_QUERY = defineQuery(`
        *[
            _type == "wishlist" &&
            userId == $userId
        ] {
            _id,
            addedAt,
            product-> {
                _id,
                name,
                slug,
                image,
                price,
                stock,
                description
            }
        } | order(addedAt desc)
    `);

    try {
        const wishlist = await sanityFetch({
            query: USER_WISHLIST_QUERY,
            params: {
                userId,
            },
        });

        return wishlist.data || [];
    } catch (error) {
        console.error("Error fetching user wishlist: ", error);
        return [];
    }
};