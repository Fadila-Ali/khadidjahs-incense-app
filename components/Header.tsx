"use client";

import { ClerkLoaded, SignInButton, UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import Form from "next/form";
import { PackageIcon, TrolleyIcon } from "@sanity/icons";
import useBasketStore from "@/store/store";
import { motion, AnimatePresence } from "framer-motion";

function Header() {

    const { user } = useUser();

    const itemCount = useBasketStore((state) => 
        state.items.reduce((total, item) => total + item.quantity, 0)
    );

  return (
    <header className="flex flex-wrap justify-between items-center px-4 py-2">
        <div className="flex w-full flex-wrap justify-between items-center">
            <Link href={`/`} className="text-2xl font-bold italic text-gray-900 hover:opacity-50 cursor-pointer mx-auto sm:mx-0">Khadidjas Incense</Link>
            <Form
                action={`/search`}
                className="w-full sm:w-auto sm:flex-1 sm:mx-4 mt-2 sm:mt-0"
            >
                <div className="relative group">
                    <svg 
                                className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-gray-900 transition-colors duration-200"
                                fill="none" 
                                stroke="currentColor" 
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                    <input 
                        type="text"
                        name="query"
                        placeholder="Search for products"
                        className="w-full pl-12 pr-4 border-2 border-transparent focus:outline-none focus:bg-white transition-all duration-300 text-sm bg-gray-100 text-gray-800 px-4 py-2 rounded-full focus:ring-2 focus:ring-gray-900 focus:ring-opacity-50 max-w-4xl"
                    />
                </div>
            </Form>
            <div className="flex items-center justify-end-safe space-x-4 mt-4 sm:mt-0 flex-1">
                <Link href={`/basket`} className="flex flex-col flex-1 relative justify-center sm:justify-start sm:flex-none items-center space-x-2">
                    <TrolleyIcon className="w-8 h-8"/>
                    <span className="absolute -top-1.5 -right-3 bg-gray-900 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">{itemCount}</span>
                    <span className="font-bold text-xs text-center">Cart</span>
                </Link>
                <ClerkLoaded>
                    { user && (
                        <Link href={`/orders`} className="flex flex-col flex-1 relative justify-center sm:justify-start sm:flex-none items-center space-x-2 px-2">
                            <PackageIcon className="w-8 h-8" />
                            <span className="font-bold text-xs text-center">Orders</span>
                        </Link>
                    )}
                    { user ? (
                        <div className="flex items-center space-x-2">
                            <UserButton/>
                            <div className="hidden sm:block text-xs">
                                <p className="text-gray-400">Welcome</p>
                                <p className="font-bold">{user.fullName}</p>
                            </div>
                        </div>
                    ) : (
                        <SignInButton mode="modal"/>
                    )}
                </ClerkLoaded>
            </div>
        </div>
    </header>
  )
}

export default Header