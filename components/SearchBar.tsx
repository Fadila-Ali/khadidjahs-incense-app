"use client";

import { Product } from "@/sanity.types";
import { imageUrl } from "@/lib/imageUrl";
import { Search, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

function SearchBar() {
    const [searchTerm, setSearchTerm] = useState("");
    const [results, setResults] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [showResults, setShowResults] = useState(false);
    const searchRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const router = useRouter();

    // Debounced search
    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            if (searchTerm.trim().length > 0) {
                performSearch(searchTerm);
            } else {
                setResults([]);
                setShowResults(false);
            }
        }, 300);

        return () => clearTimeout(delayDebounceFn);
    }, [searchTerm]);

    // Close results when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setShowResults(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const performSearch = async (query: string) => {
        setIsLoading(true);
        try {
            const response = await fetch(`/search?q=${encodeURIComponent(query)}`);
            const data = await response.json();
            setResults(data.products || []);
            setShowResults(true);
        } catch (error) {
            console.error("Search error:", error);
            setResults([]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            router.push(`/?search=${encodeURIComponent(searchTerm.trim())}`);
            setShowResults(false);
            inputRef.current?.blur();
        }
    };

    const handleClear = () => {
        setSearchTerm("");
        setResults([]);
        setShowResults(false);
        inputRef.current?.focus();
    };

    const handleResultClick = () => {
        setShowResults(false);
        setSearchTerm("");
    };

    return (
        <div ref={searchRef} className="relative w-full max-w-2xl mx-auto">
            <form onSubmit={handleSubmit} className="relative">
                <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                        ref={inputRef}
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onFocus={() => {
                            if (results.length > 0) {
                                setShowResults(true);
                            }
                        }}
                        placeholder="Search for products..."
                        className="w-full pl-12 pr-12 py-3 border-2 border-gray-200 rounded-full focus:outline-none focus:border-blue-500 transition-colors"
                    />
                    {searchTerm && (
                        <button
                            type="button"
                            onClick={handleClear}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    )}
                </div>
            </form>

            {/* Search Results Dropdown */}
            {showResults && (
                <div className="absolute top-full mt-2 w-full bg-white rounded-lg shadow-2xl border border-gray-200 max-h-[500px] overflow-y-auto z-50">
                    {isLoading ? (
                        <div className="p-8 text-center">
                            <div className="inline-block w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                            <p className="mt-2 text-gray-600">Searching...</p>
                        </div>
                    ) : results.length > 0 ? (
                        <div>
                            <div className="p-3 border-b bg-gray-50">
                                <p className="text-sm text-gray-600">
                                    Found {results.length} result{results.length !== 1 ? "s" : ""}
                                </p>
                            </div>
                            <div className="py-2">
                                {results.map((product) => (
                                    <Link
                                        key={product._id}
                                        href={`/product/${product.slug?.current}`}
                                        onClick={handleResultClick}
                                        className="flex items-center gap-4 p-3 hover:bg-gray-50 transition-colors"
                                    >
                                        <div className="relative w-16 h-16 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden">
                                            {product.image ? (
                                                <Image
                                                    src={imageUrl(product.image).url()}
                                                    alt={product.name || "Product"}
                                                    fill
                                                    className="object-contain"
                                                    sizes="64px"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-gray-400">
                                                    No image
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-semibold text-gray-900 truncate">
                                                {product.name}
                                            </h3>
                                            <p className="text-sm text-gray-600 line-clamp-1">
                                                {product.description
                                                    ?.map((block) =>
                                                        block._type === "block"
                                                            ? block.children?.map((child) => child.text).join("")
                                                            : ""
                                                    )
                                                    .join(" ") || "No description"}
                                            </p>
                                            <p className="text-sm font-bold text-blue-600 mt-1">
                                                ${product.price?.toFixed(2)}
                                            </p>
                                        </div>
                                        {product.stock != null && product.stock <= 0 && (
                                            <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded">
                                                Out of Stock
                                            </span>
                                        )}
                                    </Link>
                                ))}
                            </div>
                            <button
                                onClick={handleSubmit}
                                className="w-full p-3 text-center text-blue-600 hover:bg-blue-50 border-t font-medium transition-colors"
                            >
                                See all results for "{searchTerm}"
                            </button>
                        </div>
                    ) : searchTerm.trim().length > 0 ? (
                        <div className="p-8 text-center">
                            <p className="text-gray-600">No products found for "{searchTerm}"</p>
                            <p className="text-sm text-gray-500 mt-2">Try searching with different keywords</p>
                        </div>
                    ) : null}
                </div>
            )}
        </div>
    );
}

export default SearchBar;