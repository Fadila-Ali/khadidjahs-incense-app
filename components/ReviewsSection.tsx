"use client";

import { Review } from "@/sanity.types";
import { useUser } from "@clerk/nextjs";
import { Star } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface ReviewsSectionProps {
    reviews: Review[];
    productId: string;
    productName: string;
}

function ReviewsSection({ reviews, productId, productName }: ReviewsSectionProps) {
    const { user, isSignedIn } = useUser();
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        rating: 5,
        comment: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitMessage, setSubmitMessage] = useState("");

    const averageRating = reviews.length > 0
        ? (reviews.reduce((sum, review) => sum + (review.rating || 0), 0) / reviews.length).toFixed(1)
        : "0.0";

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!isSignedIn || !user) {
            setSubmitMessage("You must be signed in to submit a review.");
            return;
        }

        setIsSubmitting(true);
        setSubmitMessage("");

        try {
            const response = await fetch("/reviews", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    productId,
                    userId: user.id,
                    customerName: user.fullName || user.firstName || "Anonymous",
                    customerImage: user.imageUrl,
                    ...formData,
                }),
            });

            if (response.ok) {
                setSubmitMessage("Review submitted successfully!");
                setFormData({ rating: 5, comment: "" });
                setShowForm(false);
                // Refresh the page to show the new review
                setTimeout(() => {
                    window.location.reload();
                }, 1500);
            } else {
                setSubmitMessage("Failed to submit review. Please try again.");
            }
        } catch (error) {
            console.error("Error submitting review:", error);
            setSubmitMessage("An error occurred. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const renderStars = (rating: number, interactive = false, onRate?: (rating: number) => void) => {
        return (
            <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                        key={star}
                        className={`w-5 h-5 ${
                            star <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                        } ${interactive ? "cursor-pointer hover:fill-yellow-300" : ""}`}
                        onClick={() => interactive && onRate && onRate(star)}
                    />
                ))}
            </div>
        );
    };

    return (
        <div className="mt-16 border-t pt-8">
            <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">Customer Reviews</h2>
                        <div className="flex items-center gap-2 mt-2">
                            {renderStars(Number(averageRating))}
                            <span className="text-lg font-semibold">{averageRating}</span>
                            <span className="text-gray-600">({reviews.length} reviews)</span>
                        </div>
                    </div>
                    {isSignedIn ? (
                        <button
                            onClick={() => setShowForm(!showForm)}
                            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            {showForm ? "Cancel" : "Write a Review"}
                        </button>
                    ) : (
                        <p className="text-gray-600">Sign in to write a review</p>
                    )}
                </div>

                {submitMessage && (
                    <div className={`p-4 rounded-lg mb-4 ${
                        submitMessage.includes("success") ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                    }`}>
                        {submitMessage}
                    </div>
                )}

                {showForm && isSignedIn && user && (
                    <form onSubmit={handleSubmit} className="bg-gray-50 p-6 rounded-lg mb-8">
                        <h3 className="text-xl font-semibold mb-4">Write a Review for {productName}</h3>
                        
                        <div className="mb-4 flex items-center gap-3">
                            <Image
                                src={user.imageUrl}
                                alt={user.fullName || "User"}
                                width={48}
                                height={48}
                                className="rounded-full"
                            />
                            <div>
                                <p className="font-semibold">{user.fullName || user.firstName}</p>
                                <p className="text-sm text-gray-600">Posting as</p>
                            </div>
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-2">Rating</label>
                            {renderStars(formData.rating, true, (rating) => setFormData({ ...formData, rating }))}
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-2">Your Review</label>
                            <textarea
                                value={formData.comment}
                                onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-32"
                                placeholder="Share your experience with this product..."
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400"
                        >
                            {isSubmitting ? "Submitting..." : "Submit Review"}
                        </button>
                    </form>
                )}
            </div>

            <div className="space-y-6">
                {reviews.length === 0 ? (
                    <p className="text-gray-600 text-center py-8">No reviews yet. Be the first to review this product!</p>
                ) : (
                    reviews.map((review) => (
                        <div key={review._id} className="border-b pb-6">
                            <div className="flex items-start gap-4 mb-2">
                                {review.customerImage ? (
                                    <Image
                                        src={review.customerImage}
                                        alt={review.customerName || "Customer"}
                                        width={48}
                                        height={48}
                                        className="rounded-full"
                                    />
                                ) : (
                                    <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
                                        <span className="text-gray-600 font-semibold">
                                            {review.customerName?.charAt(0) || "?"}
                                        </span>
                                    </div>
                                )}
                                <div className="flex-1">
                                    <div className="flex items-start justify-between mb-1">
                                        <div>
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="font-semibold">{review.customerName}</span>
                                                {review.verified && (
                                                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                                                        Verified Purchase
                                                    </span>
                                                )}
                                            </div>
                                            {renderStars(review.rating || 0)}
                                        </div>
                                        <span className="text-sm text-gray-500">
                                            {review.createdAt && new Date(review.createdAt).toLocaleDateString()}
                                        </span>
                                    </div>
                                    <p className="text-gray-700 mt-2">{review.comment}</p>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default ReviewsSection;