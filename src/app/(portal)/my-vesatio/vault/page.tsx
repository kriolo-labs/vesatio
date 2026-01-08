"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
    Search,
    FileText,
    Image as ImageIcon,
    File,
    Download,
    Eye,
    FolderOpen,
    Filter,
} from "lucide-react";
import { cn, formatDate } from "@/lib/utils";

// Mock documents
const mockDocuments = [
    { id: "1", name: "Contrato Vesatio", type: "pdf", category: "contract", size: 2500000, date: "2025-06-01" },
    { id: "2", name: "Planta Arquitectónica", type: "pdf", category: "plan", size: 15000000, date: "2025-06-15" },
    { id: "3", name: "Render 3D - Exterior", type: "image", category: "render", size: 8500000, date: "2025-07-01" },
    { id: "4", name: "Render 3D - Interior", type: "image", category: "render", size: 7200000, date: "2025-07-01" },
    { id: "5", name: "Orçamento Final", type: "pdf", category: "invoice", size: 450000, date: "2025-06-20" },
    { id: "6", name: "Foto Progresso - Jan", type: "image", category: "photo", size: 3500000, date: "2026-01-05" },
    { id: "7", name: "Factura #127", type: "pdf", category: "invoice", size: 125000, date: "2026-01-02" },
    { id: "8", name: "Especificações Técnicas", type: "pdf", category: "other", size: 1200000, date: "2025-08-15" },
];

const categories = [
    { id: "all", label: "Todos" },
    { id: "contract", label: "Contratos" },
    { id: "invoice", label: "Faturas" },
    { id: "plan", label: "Plantas" },
    { id: "render", label: "Renders" },
    { id: "photo", label: "Fotos" },
    { id: "other", label: "Outros" },
];

export default function VaultPage() {
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("all");

    const filtered = mockDocuments.filter((doc) => {
        const matchesSearch = doc.name.toLowerCase().includes(search.toLowerCase());
        const matchesCategory = category === "all" || doc.category === category;
        return matchesSearch && matchesCategory;
    });

    const getIcon = (type: string) => {
        if (type === "image") return ImageIcon;
        if (type === "pdf") return FileText;
        return File;
    };

    const formatSize = (bytes: number) => {
        if (bytes < 1024) return `${bytes} B`;
        if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
        return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
    };

    return (
        <div className="p-4 space-y-6">
            {/* Header */}
            <div>
                <h1 className="font-serif text-2xl text-diamond">O Cofre</h1>
                <p className="text-diamond-muted text-sm">Documentos do seu projeto</p>
            </div>

            {/* Search */}
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-diamond-muted" />
                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Pesquisar documentos..."
                    className="input-field pl-10"
                />
            </div>

            {/* Category Filters */}
            <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4">
                {categories.map((cat) => (
                    <button
                        key={cat.id}
                        onClick={() => setCategory(cat.id)}
                        className={cn(
                            "px-4 py-2 rounded-full text-sm whitespace-nowrap transition-colors",
                            category === cat.id
                                ? "bg-gold text-onyx"
                                : "bg-onyx-100 text-diamond-muted"
                        )}
                    >
                        {cat.label}
                    </button>
                ))}
            </div>

            {/* Documents Grid */}
            <div className="grid grid-cols-2 gap-4">
                {filtered.map((doc, index) => {
                    const Icon = getIcon(doc.type);
                    const isImage = doc.type === "image";

                    return (
                        <motion.button
                            key={doc.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="glass-panel overflow-hidden text-left group"
                        >
                            {/* Preview */}
                            <div className="aspect-square relative bg-onyx-100 flex items-center justify-center">
                                {isImage ? (
                                    <div className="w-full h-full bg-onyx-200 flex items-center justify-center">
                                        <ImageIcon className="w-12 h-12 text-diamond-muted" />
                                    </div>
                                ) : (
                                    <Icon className="w-12 h-12 text-diamond-muted" />
                                )}

                                {/* Overlay */}
                                <div className="absolute inset-0 bg-onyx/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                                    <div className="p-2 bg-gold rounded-full">
                                        <Eye className="w-4 h-4 text-onyx" />
                                    </div>
                                    <div className="p-2 bg-white/20 rounded-full">
                                        <Download className="w-4 h-4 text-white" />
                                    </div>
                                </div>
                            </div>

                            {/* Info */}
                            <div className="p-3">
                                <p className="text-sm text-diamond truncate">{doc.name}</p>
                                <div className="flex items-center justify-between mt-1">
                                    <span className="text-xs text-diamond-muted">{formatSize(doc.size)}</span>
                                    <span className="text-xs text-diamond-muted">{formatDate(doc.date)}</span>
                                </div>
                            </div>
                        </motion.button>
                    );
                })}
            </div>

            {filtered.length === 0 && (
                <div className="text-center py-12">
                    <FolderOpen className="w-12 h-12 mx-auto text-diamond-muted mb-4" />
                    <p className="text-diamond-muted">Nenhum documento encontrado</p>
                </div>
            )}
        </div>
    );
}
