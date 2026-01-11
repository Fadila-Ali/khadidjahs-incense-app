"use client";

import { useState } from "react";

export default function ShippingUpdatePage() {
    const [orderId, setOrderId] = useState("");
    const [trackingNumber, setTrackingNumber] = useState("");
    const [carrier, setCarrier] = useState("");
    const [trackingUrl, setTrackingUrl] = useState("");
    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setMessage("");

        try {
            const response = await fetch("/api/emails/shipping-update", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    orderId,
                    trackingNumber,
                    carrier,
                    trackingUrl,
                }),
            });

            const data = await response.json();

            if (data.success) {
                setMessage("Shipping update email sent successfully!");
                setOrderId("");
                setTrackingNumber("");
                setCarrier("");
                setTrackingUrl("");
            } else {
                setMessage("Failed to send email. Please try again.");
            }
        } catch (error) {
            setMessage("An error occurred. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-2xl">
            <h1 className="text-3xl font-bold mb-8">Send Shipping Update</h1>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-sm font-medium mb-2">
                        Order ID
                    </label>
                    <input
                        type="text"
                        value={orderId}
                        onChange={(e) => setOrderId(e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2">
                        Tracking Number
                    </label>
                    <input
                        type="text"
                        value={trackingNumber}
                        onChange={(e) => setTrackingNumber(e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2">
                        Carrier
                    </label>
                    <select
                        value={carrier}
                        onChange={(e) => setCarrier(e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    >
                        <option value="">Select carrier</option>
                        <option value="USPS">USPS</option>
                        <option value="UPS">UPS</option>
                        <option value="FedEx">FedEx</option>
                        <option value="DHL">DHL</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2">
                        Tracking URL (optional)
                    </label>
                    <input
                        type="url"
                        value={trackingUrl}
                        onChange={(e) => setTrackingUrl(e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="https://..."
                    />
                </div>

                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400"
                >
                    {isLoading ? "Sending..." : "Send Shipping Update"}
                </button>

                {message && (
                    <div
                        className={`p-4 rounded-lg ${
                            message.includes("success")
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                        }`}
                    >
                        {message}
                    </div>
                )}
            </form>
        </div>
    );
}