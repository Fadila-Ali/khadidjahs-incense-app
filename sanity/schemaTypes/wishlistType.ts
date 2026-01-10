import { HeartIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const wishlistType = defineType({
    name: 'wishlist',
    title: 'Wishlist',
    type: 'document',
    icon: HeartIcon,
    fields: [
        defineField({
            name: "userId",
            title: "User ID",
            type: "string",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "product",
            title: "Product",
            type: "reference",
            to: [{ type: "product" }],
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "addedAt",
            title: "Added At",
            type: "datetime",
            initialValue: () => new Date().toISOString(),
        }),
    ],
    preview: {
        select: {
            product: "product.name",
            userId: "userId",
        },
        prepare(select) {
            return {
                title: select.product,
                subtitle: `User: ${select.userId}`,
            };
        },
    },
});