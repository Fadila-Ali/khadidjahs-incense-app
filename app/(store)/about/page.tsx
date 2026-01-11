import { Package, Heart, Star, Users } from "lucide-react";

export default function AboutPage() {
    return (
        <div className="container mx-auto px-4 py-12 max-w-4xl">
            <h1 className="text-4xl font-bold text-gray-900 mb-6">About Khadidjahs Incense</h1>
            
            <div className="prose prose-lg max-w-none">
                <p className="text-lg text-gray-700 mb-6">
                    Welcome to Khadidjahs Incense, your trusted source for premium quality incense and aromatic products. 
                    We are dedicated to bringing you the finest handcrafted incense to elevate your space and spirit.
                </p>

                <div className="grid md:grid-cols-2 gap-8 my-12">
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <Package className="w-12 h-12 text-blue-600 mb-4" />
                        <h3 className="text-xl font-semibold mb-3">Premium Quality</h3>
                        <p className="text-gray-600">
                            Every product is carefully selected and crafted to ensure the highest quality standards. 
                            We source our materials from trusted suppliers committed to excellence.
                        </p>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <Heart className="w-12 h-12 text-red-600 mb-4" />
                        <h3 className="text-xl font-semibold mb-3">Handcrafted with Care</h3>
                        <p className="text-gray-600">
                            Our incense is handcrafted with love and attention to detail, honoring traditional 
                            methods while embracing modern quality control.
                        </p>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <Star className="w-12 h-12 text-yellow-600 mb-4" />
                        <h3 className="text-xl font-semibold mb-3">Customer Satisfaction</h3>
                        <p className="text-gray-600">
                            Your satisfaction is our priority. We strive to provide exceptional products and 
                            customer service with every order.
                        </p>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <Users className="w-12 h-12 text-green-600 mb-4" />
                        <h3 className="text-xl font-semibold mb-3">Community Focused</h3>
                        <p className="text-gray-600">
                            We believe in building a community of incense enthusiasts who appreciate quality, 
                            tradition, and the art of aromatics.
                        </p>
                    </div>
                </div>

                <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">Our Story</h2>
                <p className="text-gray-700 mb-4">
                    Founded with a passion for bringing authentic, high-quality incense to homes everywhere, 
                    Khadidjahs Incense has grown from a small family operation to a trusted name in aromatics.
                </p>
                <p className="text-gray-700 mb-4">
                    We believe that the right scent can transform a space, enhance meditation, create ambiance, 
                    or simply bring joy to everyday moments. Each product in our collection is chosen with care 
                    to ensure it meets our exacting standards.
                </p>

                <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">Our Commitment</h2>
                <p className="text-gray-700 mb-4">
                    We are committed to providing you with authentic products, transparent practices, and 
                    exceptional customer service. When you shop with us, you can be confident you're getting 
                    genuine, high-quality incense and aromatics.
                </p>
            </div>
        </div>
    );
}