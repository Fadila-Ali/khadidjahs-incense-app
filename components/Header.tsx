"use client";

import { ClerkLoaded, SignInButton, UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import { PackageIcon, TrolleyIcon, HeartIcon } from "@sanity/icons";
import useBasketStore from "@/store/store";
import useWishlistStore from "@/store/wishlistStore";
import SearchBar from "./SearchBar";

type HeaderProps = {
  products: any[];
  categories: any[];
};

function Header({ products, categories }: HeaderProps) {
    const { user } = useUser();

    const itemCount = useBasketStore((state) => 
        state.items.reduce((total, item) => total + item.quantity, 0)
    );

    const wishlistCount = useWishlistStore((state) => state.items.length);

    return (
        <header className="flex flex-wrap justify-between items-center px-4 py-2">
            <div className="flex w-full flex-wrap justify-between items-center gap-4">
                <Link href={`/`} className="text-2xl font-bold italic text-yellow-600 hover:opacity-50 cursor-pointer mx-auto sm:mx-0">
                    Khadidjas Incense
                </Link>
                <SearchBar />
                <div className="flex items-center justify-end-safe space-x-4 mt-4 sm:mt-0 flex-1">
                    <Link href={`/basket`} className="flex flex-col flex-1 relative justify-center sm:justify-start sm:flex-none items-center space-x-2">
                        <TrolleyIcon className="w-8 h-8"/>
                        {itemCount >= 0 && (
                            <span className="absolute -top-1.5 -right-3 bg-yellow-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                                {itemCount}
                            </span>
                        )}
                        <span className="font-bold text-xs text-center hidden sm:inline">Cart</span>
                    </Link>
                    <ClerkLoaded>
                        {user && (
                            <Link href="/wishlist" className="flex flex-col flex-1 relative justify-center sm:justify-start sm:flex-none items-center space-x-2">
                                <HeartIcon className="w-8 h-8" />
                                {wishlistCount > 0 && (
                                    <span className="absolute -top-1.5 -right-2.5 bg-yellow-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                                        {wishlistCount}
                                    </span>
                                )}
                                <span className="font-bold text-xs text-center hidden sm:inline">Wishlist</span>
                            </Link>
                        )}
                        {user && (
                            <Link href={`/orders`} className="flex flex-col flex-1 relative justify-center sm:justify-start sm:flex-none items-center space-x-2 px-2">
                                <PackageIcon className="w-8 h-8" />
                                <span className="font-bold text-xs text-center hidden sm:inline">Orders</span>
                            </Link>
                        )}
                        {user ? (
                            <div className="flex items-center space-x-2">
                                <UserButton/>
                                <div className="hidden sm:block text-xs">
                                    <p className="text-gray-400">Welcome</p>
                                    <p className="font-bold">{user.fullName}</p>
                                </div>
                            </div>
                        ) : (
                            <div className="bg-[#B8860B] hover:bg-yellow-700 px-4 py-2 rounded-full transition-colors font-bold">
                                <SignInButton mode="modal" />
                            </div>
                        )}
                    </ClerkLoaded>
                </div>
            </div>
        </header>
    );
}

export default Header;