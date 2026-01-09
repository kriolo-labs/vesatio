"use client";

import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronLeft,
  Download,
  Image as ImageIcon,
  Share2,
  Sparkles,
  Video,
  X,
  ZoomIn,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface MediaItem {
  id: string;
  type: "photo" | "video" | "render";
  phase: string;
  url: string;
  date: string;
  isNew?: boolean;
}

const mediaItems: MediaItem[] = [
  {
    id: "1",
    type: "photo",
    phase: "Acabamentos",
    url: "/placeholder.jpg",
    date: "2026-01-07",
    isNew: true,
  },
  {
    id: "2",
    type: "photo",
    phase: "Acabamentos",
    url: "/placeholder.jpg",
    date: "2026-01-06",
    isNew: true,
  },
  { id: "3", type: "render", phase: "Projeto", url: "/placeholder.jpg", date: "2025-05-01" },
  { id: "4", type: "photo", phase: "Instalações", url: "/placeholder.jpg", date: "2025-12-15" },
  { id: "5", type: "video", phase: "Estrutura", url: "/placeholder.jpg", date: "2025-09-20" },
  { id: "6", type: "photo", phase: "Fundações", url: "/placeholder.jpg", date: "2025-07-01" },
];

const beforeAfterPairs = [
  { id: "ba1", before: "/placeholder.jpg", after: "/placeholder.jpg", label: "Sala de Estar" },
  { id: "ba2", before: "/placeholder.jpg", after: "/placeholder.jpg", label: "Cozinha" },
];

export default function GalleryPage() {
  const [filter, setFilter] = useState<"all" | "photo" | "video" | "render">("all");
  const [selectedItem, setSelectedItem] = useState<MediaItem | null>(null);
  const [sliderPosition, setSliderPosition] = useState(50);

  const filteredItems = filter === "all" ? mediaItems : mediaItems.filter((m) => m.type === filter);

  const getTypeIcon = (type: MediaItem["type"]) => {
    switch (type) {
      case "photo":
        return <ImageIcon size={12} />;
      case "video":
        return <Video size={12} />;
      case "render":
        return <Sparkles size={12} />;
    }
  };

  return (
    <div className="p-4 pb-24">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/my-vesatio/projeto">
            <Button variant="ghost" size="icon" className="text-diamond-muted">
              <ChevronLeft size={20} />
            </Button>
          </Link>
          <h1 className="font-serif text-xl text-diamond">Galeria</h1>
        </div>
        <span className="text-xs text-diamond-muted">{mediaItems.length} itens</span>
      </div>

      {/* Filters */}
      <div className="mb-6 flex gap-2 overflow-x-auto pb-2">
        {[
          { value: "all", label: "Todos" },
          { value: "photo", label: "Fotos" },
          { value: "video", label: "Vídeos" },
          { value: "render", label: "Renders" },
        ].map((f) => (
          <Button
            key={f.value}
            variant={filter === f.value ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter(f.value as typeof filter)}
            className={
              filter === f.value ? "text-onyx-950 bg-gold" : "border-white/10 text-diamond-muted"
            }
          >
            {f.label}
          </Button>
        ))}
      </div>

      {/* Grid */}
      <div className="mb-8 grid grid-cols-3 gap-2">
        {filteredItems.map((item, index) => (
          <motion.button
            key={item.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            onClick={() => setSelectedItem(item)}
            className="group relative aspect-square overflow-hidden rounded-lg bg-onyx-800"
          >
            <div className="absolute inset-0 flex items-center justify-center text-diamond-muted">
              {getTypeIcon(item.type)}
            </div>
            {item.isNew && (
              <span className="text-onyx-950 absolute right-1 top-1 rounded bg-gold px-1.5 py-0.5 text-[8px] font-bold">
                NOVO
              </span>
            )}
            <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
              <ZoomIn size={20} className="text-white" />
            </div>
          </motion.button>
        ))}
      </div>

      {/* Before/After Section */}
      <div className="mb-8">
        <h2 className="mb-4 flex items-center gap-2 text-sm font-medium text-diamond">
          <Sparkles size={14} className="text-gold" /> Antes & Depois
        </h2>
        <div className="space-y-4">
          {beforeAfterPairs.map((pair) => (
            <div key={pair.id} className="overflow-hidden rounded-xl bg-onyx-800">
              <p className="border-b border-white/5 p-3 text-xs text-diamond-muted">{pair.label}</p>
              <div className="relative aspect-video">
                {/* Before Image (full) */}
                <div className="absolute inset-0 flex items-center justify-center bg-onyx-700">
                  <span className="text-xs text-diamond-muted">Antes</span>
                </div>
                {/* After Image (clipped) */}
                <div
                  className="absolute inset-0 flex items-center justify-center overflow-hidden bg-onyx-600"
                  style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
                >
                  <span className="text-xs text-diamond-muted">Depois</span>
                </div>
                {/* Slider Handle */}
                <div
                  className="absolute bottom-0 top-0 w-1 cursor-ew-resize bg-gold"
                  style={{ left: `${sliderPosition}%` }}
                >
                  <div className="absolute top-1/2 flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-gold">
                    <span className="text-onyx-950 text-xs">↔</span>
                  </div>
                </div>
                {/* Invisible slider input */}
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={sliderPosition}
                  onChange={(e) => setSliderPosition(Number(e.target.value))}
                  className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex flex-col bg-black/95"
            onClick={() => setSelectedItem(null)}
          >
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-2 text-diamond-muted">
                {getTypeIcon(selectedItem.type)}
                <span className="text-xs">{selectedItem.phase}</span>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" className="text-diamond-muted">
                  <Download size={18} />
                </Button>
                <Button variant="ghost" size="icon" className="text-diamond-muted">
                  <Share2 size={18} />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => setSelectedItem(null)}>
                  <X size={18} className="text-diamond-muted" />
                </Button>
              </div>
            </div>
            <div
              className="flex flex-1 items-center justify-center p-8"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex aspect-video w-full max-w-2xl items-center justify-center rounded-xl bg-onyx-800">
                <ImageIcon size={48} className="text-diamond-muted" />
              </div>
            </div>
            <div className="p-4 text-center text-xs text-diamond-muted">
              {new Date(selectedItem.date).toLocaleDateString("pt-PT", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
