import { Truck, Clock, MapPin, Package } from "lucide-react";

export default function ShippingPage() {
    return (
        <div className="container mx-auto px-4 py-12 max-w-4xl">
            <h1 className="text-4xl font-bold text-gray-900 mb-6">Shipping Information</h1>
            
            <div className="bg-blue-50 border-l-4 border-blue-600 p-4 mb-8">
                <p className="text-blue-900">
                    We ship to addresses within the United States. International shipping is currently not available.
                </p>
            </div>

            <div className="space-y-8">
                <section>
                    <div className="flex items-center gap-3 mb-4">
                        <Truck className="w-8 h-8 text-blue-600" />
                        <h2 className="text-2xl font-bold text-gray-900">Shipping Methods</h2>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <div className="space-y-4">
                            <div className="border-b pb-4">
                                <h3 className="font-semibold text-lg mb-2">Standard Shipping</h3>
                                <p className="text-gray-600">Delivery in 5-7 business days</p>
                                <p className="text-gray-900 font-semibold mt-1">$5.99 flat rate</p>
                            </div>
                            <div className="border-b pb-4">
                                <h3 className="font-semibold text-lg mb-2">Express Shipping</h3>
                                <p className="text-gray-600">Delivery in 2-3 business days</p>
                                <p className="text-gray-900 font-semibold mt-1">$12.99 flat rate</p>
                            </div>
                            <div>
                                <h3 className="font-semibold text-lg mb-2">Free Shipping</h3>
                                <p className="text-gray-600">On orders over $50</p>
                                <p className="text-gray-900 font-semibold mt-1">Standard shipping (5-7 business days)</p>
                            </div>
                        </div>
                    </div>
                </section>

                <section>
                    <div className="flex items-center gap-3 mb-4">
                        <Clock className="w-8 h-8 text-green-600" />
                        <h2 className="text-2xl font-bold text-gray-900">Processing Time</h2>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <p className="text-gray-700 mb-4">
                            Orders are typically processed within 1-2 business days after payment confirmation.
                        </p>
                        <p className="text-gray-700">
                            Orders placed on weekends or holidays will be processed on the next business day.
                        </p>
                    </div>
                </section>

                <section>
                    <div className="flex items-center gap-3 mb-4">
                        <Package className="w-8 h-8 text-purple-600" />
                        <h2 className="text-2xl font-bold text-gray-900">Order Tracking</h2>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <p className="text-gray-700 mb-4">
                            Once your order ships, you'll receive a tracking number via email. You can use this 
                            number to track your package's progress.
                        </p>
                        <p className="text-gray-700">
                            You can also view your order status anytime by visiting the "My Orders" page in your account.
                        </p>
                    </div>
                </section>

                <section>
                    <div className="flex items-center gap-3 mb-4">
                        <MapPin className="w-8 h-8 text-red-600" />
                        <h2 className="text-2xl font-bold text-gray-900">Shipping Restrictions</h2>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <ul className="list-disc list-inside space-y-2 text-gray-700">
                            <li>We currently ship only within the United States</li>
                            <li>We do not ship to P.O. boxes for expedited shipping</li>
                            <li>Please ensure your shipping address is correct before completing your order</li>
                            <li>We are not responsible for delays caused by weather or carrier issues</li>
                        </ul>
                    </div>
                </section>

                <section className="bg-yellow-50 border-l-4 border-yellow-600 p-6 rounded-lg">
                    <h3 className="font-semibold text-lg mb-2 text-yellow-900">Important Note</h3>
                    <p className="text-yellow-800">
                        Please review our Returns & Exchanges policy before placing your order. We have a strict 
                        no refund, no return policy on all products.
                    </p>
                </section>
            </div>
        </div>
    );
}