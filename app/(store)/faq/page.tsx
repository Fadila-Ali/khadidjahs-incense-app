"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface FAQItemProps {
    question: string;
    answer: string;
}

function FAQItem({ question, answer }: FAQItemProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border-b border-gray-200">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full py-4 px-6 flex justify-between items-center text-left hover:bg-gray-50 transition-colors"
            >
                <span className="font-semibold text-gray-900">{question}</span>
                {isOpen ? (
                    <ChevronUp className="w-5 h-5 text-gray-600 shrink-0" />
                ) : (
                    <ChevronDown className="w-5 h-5 text-gray-600 shrink-0" />
                )}
            </button>
            {isOpen && (
                <div className="px-6 pb-4">
                    <p className="text-gray-700">{answer}</p>
                </div>
            )}
        </div>
    );
}

export default function FAQPage() {
    const faqs = [
        {
            question: "Do you accept returns or offer refunds?",
            answer: "No, all sales are final. We do not accept returns, exchanges, or offer refunds on any products. Please review product details carefully before purchasing. If you receive a damaged or defective item, contact us within 48 hours of delivery."
        },
        {
            question: "How long does shipping take?",
            answer: "Standard shipping takes 5-7 business days, while express shipping takes 2-3 business days. Orders are processed within 1-2 business days. Free shipping is available on orders over $50."
        },
        {
            question: "Do you ship internationally?",
            answer: "Currently, we only ship within the United States. International shipping is not available at this time."
        },
        {
            question: "How can I track my order?",
            answer: "Once your order ships, you'll receive a tracking number via email. You can also view your order status by logging into your account and visiting the 'My Orders' page."
        },
        {
            question: "What payment methods do you accept?",
            answer: "We accept all major credit cards including Visa, Mastercard, and American Express through our secure payment processor Stripe."
        },
        {
            question: "How do I use incense safely?",
            answer: "Always burn incense in a well-ventilated area. Use a proper incense holder on a heat-resistant surface. Never leave burning incense unattended. Keep away from children, pets, and flammable materials."
        },
        {
            question: "How should I store my incense?",
            answer: "Store incense in a cool, dry place away from direct sunlight and moisture. Keep it in an airtight container to preserve its fragrance and quality."
        },
        {
            question: "Can I cancel my order after placing it?",
            answer: "Unfortunately, once an order is placed and payment is processed, we cannot cancel or make changes to your order. Please review your cart carefully before completing your purchase."
        },
        {
            question: "What if I receive the wrong item?",
            answer: "If you receive an incorrect item, please contact us immediately at khadidjasincense@gmail.com with your order number and photos of the item received. We'll work to resolve the issue as quickly as possible."
        },
        {
            question: "Do your products contain natural ingredients?",
            answer: "Yes, we prioritize natural, high-quality ingredients in our incense products. Each product listing includes detailed information about ingredients and materials used."
        },
        {
            question: "How long does incense typically burn?",
            answer: "Burn time varies by product type and size. Stick incense typically burns for 30-45 minutes, while cone incense burns for 15-20 minutes. Specific burn times are listed in each product description."
        },
        {
            question: "Can I leave a review for products I've purchased?",
            answer: "Yes! We encourage customers to leave reviews. After your purchase is delivered, you'll receive an email invitation to review the products you bought."
        },
    ];

    return (
        <div className="container mx-auto px-4 py-12 max-w-4xl">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h1>
            <p className="text-gray-600 mb-8">
                Find answers to common questions about our products, shipping, and policies.
            </p>

            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                {faqs.map((faq, index) => (
                    <FAQItem key={index} question={faq.question} answer={faq.answer} />
                ))}
            </div>

            <div className="mt-12 bg-blue-50 border-l-4 border-blue-600 p-6 rounded-lg">
                <h2 className="font-bold text-xl text-blue-900 mb-2">Still Have Questions?</h2>
                <p className="text-blue-800 mb-4">
                    Can't find the answer you're looking for? We're here to help!
                </p>
                <div className="space-y-2">
                    <p className="text-blue-900">
                        <strong>Email:</strong> khadidjahsincense@gmail.com
                    </p>
                    <p className="text-blue-900">
                        <strong>Phone:</strong> +1 (718) 427-3164
                    </p>
                </div>
            </div>
        </div>
    );
}