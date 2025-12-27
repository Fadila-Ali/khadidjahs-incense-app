import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";

export const getNewArrivals = async () => {
    const NEW_ARRIVALS_QUERY = defineQuery(`
        *[
            _type == "product" && isNewArrival == true
        ] | order(_createdAt desc)[0...8]
    `);

    try {
        const products = await sanityFetch({
            query: NEW_ARRIVALS_QUERY,
        });

        return products.data || [];
    } catch (error) {
        console.error("Error fetching new arrivals: ", error);
        return [];
    }
};