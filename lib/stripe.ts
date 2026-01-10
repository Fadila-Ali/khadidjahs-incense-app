import Stripe from 'stripe';

if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error("Stripe Secret Key is not set");
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2025-12-15.clover",
});

// 2024-12-02 
// 2024-11-20.acacia
// 2025-12-15.clover

export default stripe;