import { EnvelopeIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const newsletterType = defineType({
    name: 'newsletter',
    title: 'Newsletter Subscribers',
    type: 'document',
    icon: EnvelopeIcon,
    fields: [
        defineField({
            name: "email",
            title: "Email Address",
            type: "string",
            validation: (Rule) => Rule.required().email(),
        }),
        defineField({
            name: "subscribedAt",
            title: "Subscribed At",
            type: "datetime",
            initialValue: () => new Date().toISOString(),
        }),
        defineField({
            name: "status",
            title: "Status",
            type: "string",
            options: {
                list: [
                    { title: "Active", value: "active" },
                    { title: "Unsubscribed", value: "unsubscribed" },
                ],
            },
            initialValue: "active",
        }),
        defineField({
            name: "source",
            title: "Subscription Source",
            type: "string",
            description: "Where the subscriber signed up from",
            initialValue: "website_footer",
        }),
    ],
    preview: {
        select: {
            email: "email",
            status: "status",
            date: "subscribedAt",
        },
        prepare(select) {
            return {
                title: select.email,
                subtitle: `${select.status} - ${new Date(select.date).toLocaleDateString()}`,
            };
        },
    },
});