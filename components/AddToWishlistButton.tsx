"use client";

import { useUser } from "@clerk/nextjs";
import { Heart } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import useWishlistStore from "@/store/wishlistStore";

interface AddToWishlistButtonProps {
    productId: string;
    isInWishlist?: boolean;
}

function AddToWishlistButton({ productId, isInWishlist = false }: AddToWishlistButtonProps) {
    const { isSignedIn } = useUser();
    const [inWishlist, setInWishlist] = useState(isInWishlist);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const { addItem, removeItem } = useWishlistStore();

    const handleToggleWishlist = async (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        if (!isSignedIn) {
            router.push("/sign-in");
            return;
        }

        setIsLoading(true);

        try {
            if (inWishlist) {
                // Remove from wishlist
                const response = await fetch(`/api/wishlist?productId=${productId}`, {
                    method: "DELETE",
                });

                if (response.ok) {
                    setInWishlist(false);
                    removeItem(productId); // Update store
                }
            } else {
                // Add to wishlist
                const response = await fetch("/api/wishlist", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ productId }),
                });

                if (response.ok) {
                    setInWishlist(true);
                    addItem(productId); // Update store
                }
            }
        } catch (error) {
            console.error("Error toggling wishlist:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <button
            onClick={handleToggleWishlist}
            disabled={isLoading}
            className={`p-2 rounded-full transition-all ${
                inWishlist
                    ? "bg-red-500 text-white hover:bg-red-600"
                    : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-300"
            } disabled:opacity-50 disabled:cursor-not-allowed`}
            title={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
        >
            <Heart
                className={`w-5 h-5 ${inWishlist ? "fill-current" : ""}`}
            />
        </button>
    );
}

export default AddToWishlistButton;