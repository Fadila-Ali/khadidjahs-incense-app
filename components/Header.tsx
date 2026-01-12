"use client";

import { ClerkLoaded, SignInButton, UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import { PackageIcon, TrolleyIcon, HeartIcon, HomeIcon } from "@sanity/icons";
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

    const capitalizeUserName = (name: string | null) => {
        if (!name) return "";
        return name.charAt(0).toUpperCase() + name.slice(1);
    }

    return (
        <header className="">
            <div className="container mx-auto px-4 py-3">
                {/* Desktop Layout */}
                <div className="hidden md:flex items-center justify-between gap-6">
                    {/* Logo */}
                    <Link 
                        href="/" 
                        className="text-2xl font-bold italic text-yellow-600 hover:opacity-75 transition-opacity whitespace-nowrap"
                    >
                        Khadidjahs Incense
                    </Link>

                    {/* Search Bar */}
                    <div className="flex-1 max-w-2xl">
                        <SearchBar />
                    </div>

                    {/* Navigation Icons */}
                    <div className="flex items-center gap-6">
                        <Link href="/" className="flex flex-col items-center hover:text-yellow-600 transition-colors">
                            <HomeIcon className="w-6 h-6" />
                            <span className="text-xs font-semibold mt-1">Shop</span>
                        </Link>

                        <ClerkLoaded>
                            {user && (
                                <Link href="/orders" className="flex flex-col items-center hover:text-yellow-600 transition-colors">
                                    <PackageIcon className="w-6 h-6" />
                                    <span className="text-xs font-semibold mt-1">Orders</span>
                                </Link>
                            )}

                            {user && (
                                <Link href="/wishlist" className="relative flex flex-col items-center hover:text-yellow-600 transition-colors">
                                    <HeartIcon className="w-6 h-6" />
                                    {wishlistCount > 0 && (
                                        <span className="absolute -top-1 -right-2 bg-yellow-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                                            {wishlistCount}
                                        </span>
                                    )}
                                    <span className="text-xs font-semibold mt-1">Wishlist</span>
                                </Link>
                            )}

                            <Link href="/basket" className="relative flex flex-col items-center hover:text-yellow-600 transition-colors">
                                <TrolleyIcon className="w-6 h-6" />
                                {user ? (
                                    <span className="absolute -top-1 -right-2 bg-yellow-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                                        {itemCount}
                                    </span>
                                ): (
                                    <span className="absolute -top-1 -right-4 bg-yellow-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                                        0
                                    </span>
                                )}
                                <span className="text-xs font-semibold mt-1">Cart</span>
                            </Link>

                            {user ? (
                                <div className="flex items-center gap-2">
                                    <UserButton />
                                    <div className="hidden lg:block text-xs">
                                        <p className="text-gray-400">Welcome</p>
                                        <p className="font-bold text-gray-900">{user.fullName}</p>
                                    </div>
                                </div>
                            ) : (
                                <div className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-full transition-colors">
                                    <SignInButton mode="modal" />
                                </div>
                            )}
                        </ClerkLoaded>
                    </div>
                </div>

                {/* Mobile Layout */}
                <div className="md:hidden">
                    {/* Top Row: Logo and User */}
                    <div className="flex items-center justify-between mb-3">
                        <Link 
                            href="/" 
                            className="text-xl font-bold italic text-yellow-600 hover:opacity-75 transition-opacity"
                        >
                            Khadidjahs Incense
                        </Link>

                        <div className="flex items-center gap-3">
                            <ClerkLoaded>
                                {user ? (
                                    <div className="flex items-center gap-2">
                                        <UserButton />
                                        <div className="hidden lg:block text-xs">
                                            <p className="text-gray-400">Welcome</p>
                                            <p className="font-bold text-gray-900">{user.fullName}</p>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="bg-yellow-600 hover:bg-yellow-700 text-white px-3 py-1.5 rounded-full text-sm">
                                        <SignInButton mode="modal" />
                                    </div>
                                )}
                            </ClerkLoaded>
                        </div>
                    </div>

                    {/* Bottom Row: Search */}
                    <div className="w-full">
                        <SearchBar />
                    </div>
                </div>
            </div>

            {/* Mobile Bottom Navigation */}
            <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-2 px-4 z-50 shadow-lg">
                <ClerkLoaded>
                    <div className="flex justify-around items-center">
                        <Link href="/" className="flex flex-col items-center text-gray-600 hover:text-yellow-600 transition-colors">
                            <HomeIcon className="w-6 h-6" />
                            <span className="text-xs font-semibold mt-1">Shop</span>
                        </Link>

                        {user && (
                            <Link href="/orders" className="flex flex-col items-center text-gray-600 hover:text-yellow-600 transition-colors">
                                <PackageIcon className="w-6 h-6" />
                                <span className="text-xs font-semibold mt-1">Orders</span>
                            </Link>
                        )}

                        {user && (
                            <Link href="/wishlist" className="relative flex flex-col items-center text-gray-600 hover:text-yellow-600 transition-colors">
                                <HeartIcon className="w-6 h-6" />
                                {wishlistCount > 0 && (
                                    <span className="absolute -top-1 right-0 bg-yellow-600 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs font-bold">
                                        {wishlistCount}
                                    </span>
                                )}
                                <span className="text-xs font-semibold mt-1">Wishlist</span>
                            </Link>
                        )}

                        <Link href="/basket" className="relative flex flex-col items-center hover:text-yellow-600 transition-colors">
                            <TrolleyIcon className="w-6 h-6" />
                                {user ? (
                                    <span className="absolute -top-1 -right-2 bg-yellow-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                                        {itemCount}
                                    </span>
                                ): (
                                    <span className="absolute -top-1 -right-3.5 bg-yellow-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                                        0
                                    </span>
                                )}
                            <span className="text-xs font-semibold mt-1">Cart</span>
                        </Link>
                    </div>
                </ClerkLoaded>
            </nav>
        </header>
    );
}

export default Header;