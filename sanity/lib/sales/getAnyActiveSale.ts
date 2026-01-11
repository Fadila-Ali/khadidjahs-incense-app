import { defineQuery } from "next-sanity";
import { sanityFetch } from "@/sanity/lib/live";

export const getAnyActiveSale = async () => {
    const ANY_ACTIVE_SALE_QUERY = defineQuery(`
        *[
            _type == "sale" &&
            isActive == true &&
            validFrom <= now() &&
            validUntil >= now()
        ] | order(discountAmount desc)[0]
    `);

    try {
        const activeSale = await sanityFetch({
            query: ANY_ACTIVE_SALE_QUERY,
        });

        return activeSale.data || null;
    } catch (error) {
        console.error("Error fetching active sale: ", error);
        return null;
    }
};