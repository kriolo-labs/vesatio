"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const CATEGORIES = ["ALL", "KITCHEN", "LIVING", "SMART HOME"];

// Mock Portfolio Data
const PORTFOLIO = [
    { id: 1, category: "KITCHEN", title: "Obsidian Island", image: "/portfolio/kitchen1.jpg", span: "row-span-2" },
    { id: 2, category: "LIVING", title: "Void Lounge", image: "/portfolio/living1.jpg", span: "row-span-1" },
    { id: 3, category: "SMART HOME", title: "AURA Interface", image: "/portfolio/smart1.jpg", span: "row-span-1" },
    { id: 4, category: "KITCHEN", title: "Gold Vein Marble", image: "/portfolio/kitchen2.jpg", span: "row-span-1" },
    { id: 5, category: "LIVING", title: "Cinematic Suite", image: "/portfolio/living2.jpg", span: "row-span-2" },
];

export default function CollectionPage() {
    const [filter, setFilter] = useState("ALL");

    const filteredItems = filter === "ALL"
        ? PORTFOLIO
        : PORTFOLIO.filter(item => item.category === filter);

    return (
        <div className="min-h-screen bg-onyx text-diamond-white p-6 pt-24 font-sans">
            <header className="mb-12 text-center">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="font-serif text-4xl md:text-6xl tracking-[0.2em] mb-4 text-gradient-gold"
                >
                    THE COLLECTION
                </motion.h1>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="flex justify-center gap-6 text-xs tracking-widest text-white/40"
                >
                    {CATEGORIES.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setFilter(cat)}
                            className={`hover:text-gold transition-colors ${filter === cat ? 'text-gold' : ''}`}
                        >
                            {cat}
                        </button>
                    ))}
                </motion.div>
            </header>

            {/* Masonry Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto">
                {filteredItems.map((item, index) => (
                    <motion.div
                        key={item.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className={`relative group overflow-hidden rounded-sm glass-panel-gold ${item.span} min-h-[300px]`}
                    >
                        {/* Placeholder Image */}
                        <div className="absolute inset-0 bg-stone-900 group-hover:scale-105 transition-transform duration-700 ease-out" />

                        {/* Content Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                            <p className="text-gold text-[10px] tracking-widest mb-1">{item.category}</p>
                            <h3 className="font-serif text-xl">{item.title}</h3>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
