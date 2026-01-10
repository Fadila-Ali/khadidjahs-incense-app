import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface WishlistState {
    items: string[]; // Array of product IDs
    addItem: (productId: string) => void;
    removeItem: (productId: string) => void;
    clearWishlist: () => void;
    isInWishlist: (productId: string) => boolean;
    getItemCount: () => number;
}

const useWishlistStore = create<WishlistState>()(
    persist(
        (set, get) => ({
            items: [],
            addItem: (productId) =>
                set((state) => {
                    if (state.items.includes(productId)) {
                        return state;
                    }
                    return { items: [...state.items, productId] };
                }),
            removeItem: (productId) =>
                set((state) => ({
                    items: state.items.filter((id) => id !== productId),
                })),
            clearWishlist: () => set({ items: [] }),
            isInWishlist: (productId) => get().items.includes(productId),
            getItemCount: () => get().items.length,
        }),
        {
            name: "wishlist-storage",
        }
    )
);

export default useWishlistStore;