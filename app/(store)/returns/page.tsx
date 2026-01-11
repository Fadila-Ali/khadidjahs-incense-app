import { XCircle, AlertTriangle, Shield } from "lucide-react";

export default function ReturnsPage() {
    return (
        <div className="container mx-auto px-4 py-12 max-w-4xl">
            <h1 className="text-4xl font-bold text-gray-900 mb-6">Returns & Exchanges Policy</h1>
            
            <div className="bg-red-50 border-l-4 border-red-600 p-6 mb-8 rounded-lg">
                <div className="flex items-start gap-3">
                    <XCircle className="w-6 h-6 text-red-600 shrink-0 mt-1" />
                    <div>
                        <h2 className="font-bold text-xl text-red-900 mb-2">No Refunds, No Returns Policy</h2>
                        <p className="text-red-800">
                            All sales are final. We do not accept returns, exchanges, or offer refunds on any products 
                            purchased from Khadidjahs Incense.
                        </p>
                    </div>
                </div>
            </div>

            <div className="space-y-8">
                <section>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Why This Policy?</h2>
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <p className="text-gray-700 mb-4">
                            Due to the nature of our products (incense and aromatic items), we maintain a strict 
                            no return policy for the following reasons:
                        </p>
                        <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                            <li>Hygiene and safety standards for aromatic products</li>
                            <li>Product integrity and quality assurance</li>
                            <li>Prevention of contamination or tampering</li>
                            <li>Maintaining the authenticity of our products</li>
                        </ul>
                    </div>
                </section>

                <section>
                    <div className="flex items-center gap-3 mb-4">
                        <AlertTriangle className="w-8 h-8 text-yellow-600" />
                        <h2 className="text-2xl font-bold text-gray-900">Damaged or Defective Items</h2>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <p className="text-gray-700 mb-4">
                            While we do not accept returns, we stand behind the quality of our products. If you 
                            receive a damaged or defective item, please contact us within 48 hours of delivery.
                        </p>
                        <div className="bg-blue-50 p-4 rounded-lg">
                            <h3 className="font-semibold mb-2">To Report Damage or Defects:</h3>
                            <ol className="list-decimal list-inside space-y-2 text-gray-700 ml-4">
                                <li>Email us at khadidjahsincense@gmail.com with your order number</li>
                                <li>Include clear photos of the damaged or defective product</li>
                                <li>Provide a description of the issue</li>
                                <li>Include photos of the packaging if damaged</li>
                            </ol>
                        </div>
                        <p className="text-gray-700 mt-4">
                            We will review your claim and, if approved, may offer a replacement at our discretion. 
                            Claims submitted after 48 hours may not be honored.
                        </p>
                    </div>
                </section>

                <section>
                    <div className="flex items-center gap-3 mb-4">
                        <Shield className="w-8 h-8 text-green-600" />
                        <h2 className="text-2xl font-bold text-gray-900">Quality Guarantee</h2>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <p className="text-gray-700 mb-4">
                            Every product we sell is carefully inspected before shipping to ensure it meets our 
                            quality standards. We take pride in delivering premium products to our customers.
                        </p>
                        <p className="text-gray-700">
                            We encourage you to carefully review product descriptions, ingredients, and details 
                            before making a purchase to ensure the product meets your needs.
                        </p>
                    </div>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Order Accuracy</h2>
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <p className="text-gray-700 mb-4">
                            Please carefully review your order before completing your purchase. Make sure to verify:
                        </p>
                        <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                            <li>Product selection and quantities</li>
                            <li>Shipping address</li>
                            <li>Contact information</li>
                            <li>Total price and shipping costs</li>
                        </ul>
                        <p className="text-gray-700 mt-4">
                            Once an order is placed and payment is processed, we cannot make changes or cancel the order.
                        </p>
                    </div>
                </section>

                <section className="bg-gray-50 border-l-4 border-gray-600 p-6 rounded-lg">
                    <h3 className="font-semibold text-lg mb-3">Questions About Our Policy?</h3>
                    <p className="text-gray-700 mb-2">
                        If you have any questions about our returns and exchanges policy, please contact us before 
                        making a purchase:
                    </p>
                    <p className="text-gray-900 font-semibold">
                        Email: khadidjahsincense@gmail.com<br />
                        Phone: +1 (718) 427-3164
                    </p>
                </section>
            </div>
        </div>
    );
}