"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";
import useWishlistStore from "@/store/wishlistStore";

function WishlistSync() {
    const { isSignedIn, user } = useUser();
    const { addItem, clearWishlist } = useWishlistStore();

    useEffect(() => {
        const syncWishlist = async () => {
            if (!isSignedIn || !user) {
                clearWishlist();
                return;
            }

            try {
                const response = await fetch(`/api/wishlist/user`);
                const data = await response.json();
                
                // Clear and repopulate wishlist
                clearWishlist();
                if (data.wishlist && Array.isArray(data.wishlist)) {
                    data.wishlist.forEach((item: any) => {
                        if (item.product?._ref) {
                            addItem(item.product._ref);
                        }
                    });
                }
            } catch (error) {
                console.error("Error syncing wishlist:", error);
            }
        };

        syncWishlist();
    }, [isSignedIn, user, addItem, clearWishlist]);

    return null; // This component doesn't render anything
}

export default WishlistSync;