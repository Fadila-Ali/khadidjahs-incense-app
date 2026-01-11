export default function CookiePolicyPage() {
    return (
        <div className="container mx-auto px-4 py-12 max-w-4xl">
            <h1 className="text-4xl font-bold text-gray-900 mb-6">Cookie Policy</h1>
            <p className="text-gray-600 mb-8">
                <strong>Last Updated:</strong> January 11, 2026
            </p>

            <div className="prose prose-lg max-w-none space-y-8">
                <section>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">What Are Cookies?</h2>
                    <p className="text-gray-700">
                        Cookies are small text files that are placed on your device when you visit our website. 
                        They help us provide you with a better experience by remembering your preferences and 
                        understanding how you use our site.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Types of Cookies We Use</h2>

                    <div className="space-y-6">
                        <div className="bg-white p-6 rounded-lg border border-gray-200">
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">Essential Cookies</h3>
                            <p className="text-gray-700 mb-3">
                                These cookies are necessary for the website to function properly. They enable basic 
                                features like page navigation, shopping cart functionality, and secure access to your account.
                            </p>
                            <p className="text-sm text-gray-600 italic">
                                These cookies cannot be disabled as they are essential for the site to work.
                            </p>
                        </div>

                        <div className="bg-white p-6 rounded-lg border border-gray-200">
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">Functional Cookies</h3>
                            <p className="text-gray-700 mb-3">
                                These cookies remember your preferences and choices, such as your language preference, 
                                login details, and items in your shopping cart.
                            </p>
                            <p className="text-sm text-gray-600">
                                <strong>Examples:</strong> Session cookies, authentication cookies, shopping cart cookies
                            </p>
                        </div>

                        <div className="bg-white p-6 rounded-lg border border-gray-200">
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">Analytics Cookies</h3>
                            <p className="text-gray-700 mb-3">
                                These cookies help us understand how visitors interact with our website by collecting 
                                and reporting information anonymously. This helps us improve our website and services.
                            </p>
                            <p className="text-sm text-gray-600">
                                <strong>Examples:</strong> Google Analytics, visitor statistics
                            </p>
                        </div>

                        <div className="bg-white p-6 rounded-lg border border-gray-200">
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">Marketing Cookies</h3>
                            <p className="text-gray-700 mb-3">
                                These cookies track your browsing habits and are used to deliver personalized 
                                advertisements relevant to you and your interests.
                            </p>
                            <p className="text-sm text-gray-600">
                                <strong>Examples:</strong> Social media cookies, advertising network cookies
                            </p>
                        </div>
                    </div>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Third-Party Cookies</h2>
                    <p className="text-gray-700 mb-4">
                        We use third-party services that may place cookies on your device:
                    </p>
                    <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                        <li><strong>Stripe:</strong> For secure payment processing</li>
                        <li><strong>Clerk:</strong> For authentication and user management</li>
                        <li><strong>Google Analytics:</strong> For website analytics (if applicable)</li>
                        <li><strong>Social Media Platforms:</strong> For social sharing features</li>
                    </ul>
                    <p className="text-gray-700 mt-4">
                        These third parties have their own privacy policies and cookie policies, which we 
                        encourage you to review.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">How We Use Cookies</h2>
                    <p className="text-gray-700 mb-4">We use cookies to:</p>
                    <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                        <li>Keep you signed in to your account</li>
                        <li>Remember items in your shopping cart</li>
                        <li>Remember your preferences and settings</li>
                        <li>Understand how you use our website</li>
                        <li>Improve website performance and user experience</li>
                        <li>Provide personalized content and recommendations</li>
                        <li>Measure the effectiveness of our marketing campaigns</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Managing Cookies</h2>
                    
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Browser Settings</h3>
                    <p className="text-gray-700 mb-4">
                        Most web browsers allow you to control cookies through their settings. You can:
                    </p>
                    <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                        <li>View and delete cookies</li>
                        <li>Block third-party cookies</li>
                        <li>Block all cookies</li>
                        <li>Delete cookies when you close your browser</li>
                    </ul>

                    <div className="bg-yellow-50 border-l-4 border-yellow-600 p-4 rounded-lg mt-4">
                        <p className="text-yellow-900">
                            <strong>Important:</strong> Blocking or deleting cookies may affect your experience 
                            on our website and prevent certain features from working properly, such as staying 
                            logged in or maintaining items in your shopping cart.
                        </p>
                    </div>

                    <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">Browser-Specific Instructions</h3>
                    <div className="bg-gray-50 p-6 rounded-lg">
                        <ul className="space-y-2 text-gray-700">
                            <li><strong>Chrome:</strong> Settings → Privacy and Security → Cookies</li>
                            <li><strong>Firefox:</strong> Settings → Privacy & Security → Cookies and Site Data</li>
                            <li><strong>Safari:</strong> Preferences → Privacy → Cookies and website data</li>
                            <li><strong>Edge:</strong> Settings → Cookies and site permissions → Cookies</li>
                        </ul>
                    </div>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Cookie Duration</h2>
                    <p className="text-gray-700 mb-4">Cookies may be temporary or persistent:</p>
                    <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                        <li><strong>Session Cookies:</strong> Temporary cookies that expire when you close 
                            your browser</li>
                        <li><strong>Persistent Cookies:</strong> Remain on your device for a set period or 
                            until you delete them</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Updates to This Policy</h2>
                    <p className="text-gray-700">
                        We may update this Cookie Policy from time to time to reflect changes in our practices 
                        or for legal or regulatory reasons. Please review this page periodically for updates.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Us</h2>
                    <p className="text-gray-700 mb-4">
                        If you have questions about our use of cookies, please contact us:
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