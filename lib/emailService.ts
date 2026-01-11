import { Resend } from 'resend';
import { OrderConfirmationEmail, ShippingUpdateEmail, ReviewReminderEmail } from './email-templates';
import { render } from '@react-email/render';

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM_EMAIL = 'onboarding@resend.dev'; // Change to your verified domain

const SITE_URL = process.env.NODE_ENV === 'production'
            ? `https://${process.env.VERCEL_URL}`
            : `${process.env.NEXT_PUBLIC_BASE_URL}`;

export async function sendOrderConfirmationEmail(data: {
    to: string;
    customerName: string;
    orderNumber: string;
    orderDate: string;
    items: Array<{
        name: string;
        quantity: number;
        price: number;
    }>;
    total: number;
    shippingAddress?: string;
}) {
    try {
        const emailHtml = await render(
            OrderConfirmationEmail({
                customerName: data.customerName,
                orderNumber: data.orderNumber,
                orderDate: data.orderDate,
                items: data.items,
                total: data.total,
                shippingAddress: data.shippingAddress,
            })
        );

        const { data: result, error } = await resend.emails.send({
            from: FROM_EMAIL,
            to: data.to,
            subject: `Order Confirmation - ${data.orderNumber}`,
            html: emailHtml,
        });

        if (error) {
            console.error('Error sending order confirmation email:', error);
            return { success: false, error };
        }

        console.log('Order confirmation email sent:', result);
        return { success: true, data: result };
    } catch (error) {
        console.error('Error sending order confirmation email:', error);
        return { success: false, error };
    }
}

export async function sendShippingUpdateEmail(data: {
    to: string;
    customerName: string;
    orderNumber: string;
    trackingNumber: string;
    carrier: string;
    trackingUrl?: string;
}) {
    try {
        const emailHtml = await render(
            ShippingUpdateEmail({
                customerName: data.customerName,
                orderNumber: data.orderNumber,
                trackingNumber: data.trackingNumber,
                carrier: data.carrier,
                trackingUrl: data.trackingUrl,
            })
        );

        const { data: result, error } = await resend.emails.send({
            from: FROM_EMAIL,
            to: data.to,
            subject: `Your Order Has Shipped - ${data.orderNumber}`,
            html: emailHtml,
        });

        if (error) {
            console.error('Error sending shipping update email:', error);
            return { success: false, error };
        }

        console.log('Shipping update email sent:', result);
        return { success: true, data: result };
    } catch (error) {
        console.error('Error sending shipping update email:', error);
        return { success: false, error };
    }
}

export async function sendReviewReminderEmail(data: {
    to: string;
    customerName: string;
    orderNumber: string;
    items: Array<{
        name: string;
        productId: string;
        slug: string;
    }>;
}) {
    try {
        const emailHtml = await render(
            ReviewReminderEmail({
                customerName: data.customerName,
                orderNumber: data.orderNumber,
                items: data.items,
                reviewUrl: SITE_URL,
            })
        );

        const { data: result, error } = await resend.emails.send({
            from: FROM_EMAIL,
            to: data.to,
            subject: `We'd Love Your Feedback - Order ${data.orderNumber}`,
            html: emailHtml,
        });

        if (error) {
            console.error('Error sending review reminder email:', error);
            return { success: false, error };
        }

        console.log('Review reminder email sent:', result);
        return { success: true, data: result };
    } catch (error) {
        console.error('Error sending review reminder email:', error);
        return { success: false, error };
    }
}