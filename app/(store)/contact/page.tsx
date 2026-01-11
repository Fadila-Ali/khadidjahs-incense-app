"use client";

import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { useState } from "react";

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitMessage, setSubmitMessage] = useState("");
    const [isError, setIsError] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitMessage("");
        setIsError(false);

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                setSubmitMessage("Thank you for your message! We'll get back to you within 24-48 hours.");
                setFormData({ name: "", email: "", subject: "", message: "" });
            } else {
                setIsError(true);
                setSubmitMessage(data.error || "Failed to send message. Please try again.");
            }
        } catch (error) {
            setIsError(true);
            setSubmitMessage("An error occurred. Please try again later or contact us directly via email.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="container mx-auto px-4 py-12 max-w-6xl">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
            <p className="text-gray-600 mb-8">
                Have a question or need assistance? We're here to help!
            </p>

            <div className="grid md:grid-cols-2 gap-8">
                {/* Contact Form */}
                <div className="bg-white p-8 rounded-lg shadow-md">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Send Us a Message</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Name *
                            </label>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                                disabled={isSubmitting}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Email *
                            </label>
                            <input
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                                disabled={isSubmitting}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Subject *
                            </label>
                            <input
                                type="text"
                                value={formData.subject}
                                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                                disabled={isSubmitting}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Message *
                            </label>
                            <textarea
                                value={formData.message}
                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                rows={5}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                                disabled={isSubmitting}
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-yellow-600 text-white py-3 rounded-lg hover:bg-yellow-700 transition-colors disabled:bg-gray-400"
                        >
                            {isSubmitting ? "Sending..." : "Send Message"}
                        </button>

                        {submitMessage && (
                            <div className={`px-4 py-3 rounded-lg ${
                                isError 
                                    ? "bg-red-50 border border-red-200 text-red-800" 
                                    : "bg-green-50 border border-green-200 text-green-800"
                            }`}>
                                {submitMessage}
                            </div>
                        )}
                    </form>
                </div>

                {/* Contact Information */}
                <div className="space-y-6">
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <div className="flex items-start gap-4">
                            <Mail className="w-6 h-6 text-blue-600 shrink-0 mt-1" />
                            <div>
                                <h3 className="font-semibold text-lg mb-1">Email</h3>
                                <a 
                                    href="mailto:khadidjahsincense@gmail.com"
                                    className="text-gray-600 hover:text-blue-600 transition-colors"
                                >
                                    khadidjahsincense@gmail.com
                                </a>
                                <p className="text-sm text-gray-500 mt-2">
                                    We typically respond within 24-48 hours
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <div className="flex items-start gap-4">
                            <Phone className="w-6 h-6 text-green-600 shrink-0 mt-1" />
                            <div>
                                <h3 className="font-semibold text-lg mb-1">Phone</h3>
                                <a 
                                    href="tel:+17184273164"
                                    className="text-gray-600 hover:text-green-600 transition-colors"
                                >
                                    +1 (718) 427-3164
                                </a>
                                <p className="text-sm text-gray-500 mt-2">
                                    Monday - Friday: 9 AM - 5 PM EST
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <div className="flex items-start gap-4">
                            <MapPin className="w-6 h-6 text-red-600 shrink-0 mt-1" />
                            <div>
                                <h3 className="font-semibold text-lg mb-1">Address</h3>
                                <p className="text-gray-600">
                                    123 Incense Street<br />
                                    New York, NY 10001<br />
                                    United States
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <div className="flex items-start gap-4">
                            <Clock className="w-6 h-6 text-purple-600 shrink-0 mt-1" />
                            <div>
                                <h3 className="font-semibold text-lg mb-1">Business Hours</h3>
                                <div className="text-gray-600 space-y-1">
                                    <p>Monday - Friday: 9:00 AM - 5:00 PM EST</p>
                                    <p>Saturday: 10:00 AM - 3:00 PM EST</p>
                                    <p>Sunday: Closed</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-lg">
                        <h3 className="font-semibold text-lg mb-2 text-blue-900">Before You Contact Us</h3>
                        <p className="text-blue-800 text-sm">
                            Please check our FAQ page for quick answers to common questions. You may find 
                            the information you need right away!
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}