"use client";

import useEmblaCarousel from 'embla-carousel-react';
import { motion } from 'framer-motion';

const STORIES = [
    { id: 1, title: 'Foundations', img: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=150&h=150&fit=crop' },
    { id: 2, title: 'Structure', img: 'https://images.unsplash.com/photo-1590644365607-1c5a38fc4303?w=150&h=150&fit=crop' },
    { id: 3, title: 'Interiors', img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=150&h=150&fit=crop' },
    { id: 4, title: 'Lighting', img: 'https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=150&h=150&fit=crop' },
    { id: 5, title: 'Landscape', img: 'https://images.unsplash.com/photo-1628744876497-eb30460be9f6?w=150&h=150&fit=crop' },
];

export default function StoriesHeader() {
    const [emblaRef] = useEmblaCarousel({ dragFree: true, containScroll: 'trimSnaps' });

    return (
        <div className="w-full overflow-hidden pt-6 pb-4" ref={emblaRef}>
            <div className="flex gap-4 px-4 min-w-0">
                {STORIES.map((story) => (
                    <motion.div
                        key={story.id}
                        className="flex-shrink-0 flex flex-col items-center gap-2 cursor-pointer"
                        whileTap={{ scale: 0.95 }}
                    >
                        <div className="w-16 h-16 rounded-full p-[2px] bg-gradient-to-tr from-gold via-white/50 to-transparent">
                            <div className="w-full h-full rounded-full border-2 border-black overflow-hidden relative">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src={story.img} alt={story.title} className="w-full h-full object-cover" />
                            </div>
                        </div>
                        <span className="text-[10px] text-white/60 tracking-wide uppercase">{story.title}</span>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
