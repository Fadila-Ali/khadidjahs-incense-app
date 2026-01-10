"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import AddToWishlistButton from "./AddToWishlistButton";
import useWishlistStore from "@/store/wishlistStore";

interface WishlistButtonWithCheckProps {
    productId: string;
}

function WishlistButtonWithCheck({ productId }: WishlistButtonWithCheckProps) {
    const [isInWishlist, setIsInWishlist] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const { addItem, removeItem, isInWishlist: isInStoreWishlist } = useWishlistStore();
    
    // Use try-catch to handle cases where ClerkProvider might not be available
    let isSignedIn = false;
    let user = null;
    
    try {
        const clerkData = useUser();
        isSignedIn = clerkData.isSignedIn || false;
        user = clerkData.user;
    } catch (error) {
        // ClerkProvider not available, user is not signed in
        console.log("Clerk not available");
    }

    useEffect(() => {
        const checkWishlist = async () => {
            if (!isSignedIn || !user) {
                setIsLoading(false);
                return;
            }

            try {
                const response = await fetch(`/api/wishlist/check?productId=${productId}`);
                const data = await response.json();
                const inWishlist = data.isInWishlist || false;
                setIsInWishlist(inWishlist);
                
                // Sync with store
                if (inWishlist && !isInStoreWishlist(productId)) {
                    addItem(productId);
                } else if (!inWishlist && isInStoreWishlist(productId)) {
                    removeItem(productId);
                }
            } catch (error) {
                console.error("Error checking wishlist:", error);
            } finally {
                setIsLoading(false);
            }
        };

        checkWishlist();
    }, [isSignedIn, user, productId, addItem, removeItem, isInStoreWishlist]);

    if (isLoading) {
        return (
            <div className="p-2 rounded-full bg-gray-100 animate-pulse">
                <div className="w-5 h-5"></div>
            </div>
        );
    }

    return <AddToWishlistButton productId={productId} isInWishlist={isInWishlist} />;
}

export default WishlistButtonWithCheck;