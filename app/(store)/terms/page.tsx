export default function TermsOfServicePage() {
    return (
        <div className="container mx-auto px-4 py-12 max-w-4xl">
            <h1 className="text-4xl font-bold text-gray-900 mb-6">Terms of Service</h1>
            <p className="text-gray-600 mb-8">
                <strong>Last Updated:</strong> January 11, 2026
            </p>

            <div className="prose prose-lg max-w-none space-y-8">
                <section>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Agreement to Terms</h2>
                    <p className="text-gray-700">
                        By accessing or using Khadidjahs Incense's website and services, you agree to be bound 
                        by these Terms of Service. If you do not agree to these terms, please do not use our services.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Use of Our Services</h2>
                    
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Eligibility</h3>
                    <p className="text-gray-700 mb-4">
                        You must be at least 18 years old to make purchases on our website. By making a purchase, 
                        you represent that you are at least 18 years of age.
                    </p>

                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Account Responsibility</h3>
                    <p className="text-gray-700 mb-4">
                        If you create an account, you are responsible for:
                    </p>
                    <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                        <li>Maintaining the confidentiality of your account credentials</li>
                        <li>All activities that occur under your account</li>
                        <li>Notifying us immediately of any unauthorized use</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Products and Pricing</h2>
                    <p className="text-gray-700 mb-4">
                        We strive to provide accurate product descriptions and pricing. However:
                    </p>
                    <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                        <li>We do not warrant that product descriptions or pricing are error-free</li>
                        <li>We reserve the right to correct any errors or inaccuracies</li>
                        <li>Prices are subject to change without notice</li>
                        <li>We reserve the right to limit quantities or refuse orders</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Orders and Payment</h2>
                    
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Order Acceptance</h3>
                    <p className="text-gray-700 mb-4">
                        Your order is an offer to purchase products from us. We reserve the right to accept or 
                        decline your order for any reason. All orders are subject to product availability.
                    </p>

                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Payment</h3>
                    <p className="text-gray-700 mb-4">
                        Payment is processed through Stripe, our secure payment processor. By providing payment 
                        information, you represent that you are authorized to use the payment method provided.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Shipping and Delivery</h2>
                    <p className="text-gray-700 mb-4">
                        We ship to addresses within the United States. Shipping times are estimates and not 
                        guaranteed. We are not responsible for delays caused by carriers or circumstances beyond 
                        our control.
                    </p>
                    <p className="text-gray-700">
                        Risk of loss and title for purchased items pass to you upon delivery to the carrier.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Returns and Refunds</h2>
                    <div className="bg-red-50 border-l-4 border-red-600 p-4 rounded-lg">
                        <p className="text-red-900 font-semibold mb-2">No Returns or Refunds Policy</p>
                        <p className="text-red-800">
                            All sales are final. We do not accept returns, exchanges, or provide refunds on any 
                            products. Due to the nature of our products (incense and aromatic items), we cannot 
                            accept returns for hygiene and safety reasons.
                        </p>
                    </div>
                    <p className="text-gray-700 mt-4">
                        If you receive a damaged or defective product, please contact us within 48 hours of 
                        delivery with photographic evidence. We may offer a replacement at our discretion.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Product Safety and Use</h2>
                    <p className="text-gray-700 mb-4">
                        Our incense products should be used according to safety guidelines:
                    </p>
                    <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                        <li>Burn in well-ventilated areas only</li>
                        <li>Never leave burning incense unattended</li>
                        <li>Keep away from children, pets, and flammable materials</li>
                        <li>Use appropriate incense holders on heat-resistant surfaces</li>
                        <li>Discontinue use if you experience any adverse reactions</li>
                    </ul>
                    <p className="text-gray-700 mt-4">
                        We are not liable for misuse of our products or failure to follow safety instructions.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Intellectual Property</h2>
                    <p className="text-gray-700">
                        All content on our website, including text, graphics, logos, images, and software, is 
                        the property of Khadidjahs Incense and protected by intellectual property laws. You may 
                        not reproduce, distribute, or create derivative works without our express written permission.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Limitation of Liability</h2>
                    <p className="text-gray-700">
                        To the fullest extent permitted by law, Khadidjahs Incense shall not be liable for any 
                        indirect, incidental, special, consequential, or punitive damages arising from your use 
                        of our website or products. Our total liability shall not exceed the amount you paid for 
                        the product.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Indemnification</h2>
                    <p className="text-gray-700">
                        You agree to indemnify and hold harmless Khadidjahs Incense from any claims, damages, 
                        losses, or expenses arising from your violation of these Terms or misuse of our products.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Governing Law</h2>
                    <p className="text-gray-700">
                        These Terms shall be governed by and construed in accordance with the laws of the State 
                        of New York, without regard to its conflict of law provisions.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Changes to Terms</h2>
                    <p className="text-gray-700">
                        We reserve the right to modify these Terms at any time. Changes will be effective 
                        immediately upon posting. Your continued use of our services after changes constitutes 
                        acceptance of the modified Terms.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Information</h2>
                    <p className="text-gray-700 mb-4">
                        For questions about these Terms of Service, contact us:
                    </p>
                    <div className="bg-gray-50 p-6 rounded-lg">
                        <p className="text-gray-700">
                            <strong>Email:</strong> khadidjahsincense@gmail.com<br />
                            <strong>Phone:</strong> +1 (718) 427-3164<br />
                            <strong>Address:</strong> 123 Incense Street, New York, NY 10001
                        </p>
                    </div>
                </section>
            </div>
        </div>
    );
}