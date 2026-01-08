"use client";

import { FileText, Download, ArrowLeft, Image as ImageIcon } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

const DOCUMENTS = [
    { id: 1, title: 'Architectural Plans v1.0', type: 'PDF', date: 'Oct 12, 2025', size: '24 MB' },
    { id: 2, title: 'Project Contract', type: 'PDF', date: 'Sep 01, 2025', size: '2 MB' },
    { id: 3, title: 'Material Board - Living Room', type: 'IMG', date: 'Nov 05, 2025', size: '15 MB' },
    { id: 4, title: 'Structural Analysis', type: 'PDF', date: 'Oct 20, 2025', size: '8 MB' },
    { id: 5, title: 'Financial Forecast 2026', type: 'PDF', date: 'Dec 15, 2025', size: '1.2 MB' },
];

export default function TheVault() {
    return (
        <div className="min-h-screen bg-onyx p-6 pb-20">

            {/* Header */}
            <div className="flex items-center gap-4 mb-8 pt-4">
                <Link href="/client/dashboard" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/50 hover:bg-white/10 hover:text-white transition-colors">
                    <ArrowLeft size={20} />
                </Link>
                <div>
                    <h1 className="text-2xl font-serif text-white">The Vault</h1>
                    <p className="text-white/40 text-xs uppercase tracking-widest">Confidential Documents</p>
                </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {DOCUMENTS.map((doc, index) => (
                    <motion.div
                        key={doc.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="glass-panel p-5 group hover:bg-white/5 transition-all cursor-pointer border-white/5 hover:border-gold/30"
                    >
                        <div className="flex justify-between items-start mb-4">
                            <div className="w-10 h-10 rounded-lg bg-onyx flex items-center justify-center border border-white/10 group-hover:border-gold/20">
                                {doc.type === 'PDF' ? <FileText className="text-white/60 w-5 h-5" /> : <ImageIcon className="text-white/60 w-5 h-5" />}
                            </div>
                            <button className="text-white/20 hover:text-gold transition-colors">
                                <Download size={18} />
                            </button>
                        </div>

                        <h3 className="text-white font-medium text-sm mb-1 group-hover:text-gold transition-colors truncate">
                            {doc.title}
                        </h3>
                        <div className="flex justify-between items-center text-[10px] text-white/40 uppercase tracking-wider">
                            <span>{doc.date}</span>
                            <span>{doc.size}</span>
                        </div>
                    </motion.div>
                ))}
            </div>

        </div>
    );
}
