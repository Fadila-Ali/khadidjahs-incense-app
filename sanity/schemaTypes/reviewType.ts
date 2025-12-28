import { StarIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const reviewType = defineType({
    name: 'review',
    title: 'Reviews',
    type: 'document',
    icon: StarIcon,
    fields: [
        defineField({
            name: "product",
            title: "Product",
            type: "reference",
            to: [{ type: "product" }],
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "userId",
            title: "User ID",
            type: "string",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "customerName",
            title: "Customer Name",
            type: "string",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "customerImage",
            title: "Customer Image",
            type: "url",
        }),
        defineField({
            name: "rating",
            title: "Rating",
            type: "number",
            validation: (Rule) => Rule.required().min(1).max(5),
        }),
        defineField({
            name: "comment",
            title: "Comment",
            type: "text",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "createdAt",
            title: "Created At",
            type: "datetime",
            initialValue: () => new Date().toISOString(),
        }),
        defineField({
            name: "verified",
            title: "Verified Purchase",
            type: "boolean",
            initialValue: false,
        }),
    ],
    preview: {
        select: {
            title: "customerName",
            subtitle: "rating",
            product: "product.name",
            media: "customerImage",
        },
        prepare(select) {
            return {
                title: select.title,
                subtitle: `${select.subtitle} stars - ${select.product}`,
            };
        },
    },
});