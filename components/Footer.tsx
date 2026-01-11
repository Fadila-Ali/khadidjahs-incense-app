"use client";

import Link from "next/link";
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react";
import { useState } from "react";

// Custom TikTok Icon Component
function TikTokIcon({ className }: { className?: string }) {
    return (
        <svg
            className={className}
            viewBox="0 0 24 24"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
        </svg>
    );
}


function Footer() {
    const currentYear = new Date().getFullYear();
    const [email, setEmail] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState("");
    const [isError, setIsError] = useState(false);


    const handleNewsletterSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setMessage("");
        setIsError(false);

        try {
            const response = await fetch("/api/newsletter/subscribe", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();

            if (response.ok) {
                setMessage(data.message || "Thank you for subscribing!");
                setEmail("");
            } else {
                setIsError(true);
                setMessage(data.error || "Failed to subscribe. Please try again.");
            }
        } catch (error) {
            setIsError(true);
            setMessage("An error occurred. Please try again later.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <footer className="bg-gray-900 text-gray-300">
            {/* Main Footer */}
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* About Section */}
                    <div>
                        <h3 className="text-yellow-500 text-xl font-bold mb-4">Khadidjahs Incense</h3>
                        <p className="text-sm mb-4">
                            Premium quality incense and aromatic products to elevate your space and spirit.
                            Handcrafted with care and tradition.
                        </p>
                        <div className="flex space-x-4">
                            <a
                                href="https://facebook.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-white transition-colors"
                                aria-label="Facebook"
                            >
                                <Facebook className="w-5 h-5" />
                            </a>
                            <a
                                href="https://instagram.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-white transition-colors"
                                aria-label="Instagram"
                            >
                                <Instagram className="w-5 h-5" />
                            </a>
                            <a
                                href="https://twitter.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-white transition-colors"
                                aria-label="Twitter"
                            >
                                <Twitter className="w-5 h-5" />
                            </a>
                            <a
                                href="https://tiktok.com/@yourusername"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-white transition-colors"
                                aria-label="TikTok"
                            >
                                <TikTokIcon className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-white text-lg font-semibold mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/" className="hover:text-white transition-colors text-sm">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link href="/#products" className="hover:text-white transition-colors text-sm">
                                    Shop All Products
                                </Link>
                            </li>
                            <li>
                                <Link href="/wishlist" className="hover:text-white transition-colors text-sm">
                                    My Wishlist
                                </Link>
                            </li>
                            <li>
                                <Link href="/orders" className="hover:text-white transition-colors text-sm">
                                    My Orders
                                </Link>
                            </li>
                            <li>
                                <Link href="/basket" className="hover:text-white transition-colors text-sm">
                                    Shopping Cart
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Customer Service */}
                    <div>
                        <h3 className="text-white text-lg font-semibold mb-4">Customer Service</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/about" className="hover:text-white transition-colors text-sm">
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link href="/shipping" className="hover:text-white transition-colors text-sm">
                                    Shipping Information
                                </Link>
                            </li>
                            <li>
                                <Link href="/returns" className="hover:text-white transition-colors text-sm">
                                    Returns & Exchanges
                                </Link>
                            </li>
                            <li>
                                <Link href="/faq" className="hover:text-white transition-colors text-sm">
                                    FAQ
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="hover:text-white transition-colors text-sm">
                                    Contact Us
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-white text-lg font-semibold mb-4">Contact Us</h3>
                        <ul className="space-y-3">
                            <li className="flex items-start space-x-3">
                                <MapPin className="w-5 h-5 mt-0.5 shrink-0" />
                                <span className="text-sm">
                                    123 Incense Street<br />
                                    New York, NY 10001<br />
                                    United States
                                </span>
                            </li>
                            <li className="flex items-center space-x-3">
                                <Phone className="w-5 h-5 shrink-0" />
                                <a href="tel:+17184273164" className="text-sm hover:text-white transition-colors">
                                    +1 (718) 427-3164
                                </a>
                            </li>
                            <li className="flex items-center space-x-3">
                                <Mail className="w-5 h-5 shrink-0" />
                                <a href="mailto:khadidjahsincense@gmail.com" className="text-sm hover:text-white transition-colors">
                                    khadidjahsincense@gmail.com
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Newsletter Section */}
                <div className="mt-12 pt-8 border-t border-gray-800">
                    <div className="max-w-2xl mx-auto text-center">
                        <h3 className="text-white text-xl font-semibold mb-2">Subscribe to Our Newsletter</h3>
                        <p className="text-sm mb-4">
                            Get exclusive offers, new product updates, and incense care tips delivered to your inbox.
                        </p>
                        <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                                className="flex-1 px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:border-yellow-500 text-white placeholder-gray-500"
                                required
                                disabled={isSubmitting}
                            />
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="px-6 py-2 bg-yellow-600 hover:bg-yellow-700 text-white font-semibold rounded-lg transition-colors disabled:bg-gray-400"
                            >
                                {isSubmitting ? "Subscribing..." : "Subscribe"}
                            </button>
                        </form>
                        {message && (
                            <p className={`mt-3 text-sm ${isError ? "text-red-400" : "text-green-400"}`}>
                                {message}
                            </p>
                        )}
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="bg-gray-950 py-6">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                        <p className="text-sm text-gray-400">
                            © {currentYear} Khadidjahs Incense. All rights reserved.
                        </p>
                        <div className="flex flex-wrap justify-center gap-6 text-sm">
                            <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">
                                Privacy Policy
                            </Link>
                            <Link href="/terms" className="text-gray-400 hover:text-white transition-colors">
                                Terms of Service
                            </Link>
                            <Link href="/cookies" className="text-gray-400 hover:text-white transition-colors">
                                Cookie Policy
                            </Link>
                        </div>
                        <div className="flex items-center space-x-2">
                            <span className="text-sm text-gray-400">We accept:</span>
                            <div className="flex space-x-2">
                                <div className="bg-white px-2 py-1 rounded text-xs font-semibold text-gray-900">
                                    VISA
                                </div>
                                <div className="bg-white px-2 py-1 rounded text-xs font-semibold text-gray-900">
                                    MC
                                </div>
                                <div className="bg-white px-2 py-1 rounded text-xs font-semibold text-gray-900">
                                    AMEX
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;