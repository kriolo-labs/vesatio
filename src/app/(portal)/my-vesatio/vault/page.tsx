"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Book, ChevronRight, Download, FileText, Folder, Shield, Sparkles, X } from "lucide-react";
import { useState } from "react";

interface DocumentFolder {
  id: string;
  name: string;
  icon: React.ReactNode;
  count: number;
}

interface Document {
  id: string;
  name: string;
  type: string;
  size: string;
  date: string;
}

const folders: DocumentFolder[] = [
  { id: "f1", name: "Contrato", icon: <FileText size={20} />, count: 2 },
  { id: "f2", name: "Orçamento & Proposta", icon: <FileText size={20} />, count: 3 },
  { id: "f3", name: "Plantas e Projetos", icon: <FileText size={20} />, count: 8 },
  { id: "f4", name: "Renders", icon: <Sparkles size={20} />, count: 12 },
  { id: "f5", name: "Especificações Técnicas", icon: <FileText size={20} />, count: 5 },
  { id: "f6", name: "Manuais de Equipamentos", icon: <Book size={20} />, count: 4 },
  { id: "f7", name: "Garantias", icon: <Shield size={20} />, count: 6 },
];

const documents: Document[] = [
  { id: "d1", name: "Contrato_VES-2026-001.pdf", type: "PDF", size: "2.4 MB", date: "2025-05-15" },
  { id: "d2", name: "Aditivo_Alterações.pdf", type: "PDF", size: "890 KB", date: "2025-08-20" },
];

const materialPassport = [
  {
    id: "m1",
    name: "Mármore Carrara",
    origin: "Itália",
    supplier: "MarmorTech",
    warranty: "10 anos",
    care: "Limpeza com pH neutro",
  },
  {
    id: "m2",
    name: "Carvalho Europeu",
    origin: "França",
    supplier: "Bois Noble",
    warranty: "5 anos",
    care: "Óleo de manutenção anual",
  },
  {
    id: "m3",
    name: "Sistema Lutron",
    origin: "EUA",
    supplier: "Lutron Electronics",
    warranty: "5 anos",
    care: "Não requer manutenção",
  },
];

export default function VaultPage() {
  const [selectedFolder, setSelectedFolder] = useState<DocumentFolder | null>(null);
  const [showHeritage, setShowHeritage] = useState(false);
  const [showPassport, setShowPassport] = useState(false);

  return (
    <div className="space-y-6 p-4 pb-24">
      <h1 className="font-serif text-xl text-diamond">The Vault</h1>
      <p className="text-sm text-diamond-muted">Todos os documentos do seu projeto num só lugar.</p>

      {/* Heritage Timeline Card */}
      <Card
        className="cursor-pointer border-gold/20 bg-gradient-to-br from-gold/10 to-transparent p-5 transition-colors hover:border-gold/40"
        onClick={() => setShowHeritage(true)}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gold/20">
              <Book size={24} className="text-gold" />
            </div>
            <div>
              <h3 className="font-serif text-diamond">Heritage Timeline™</h3>
              <p className="text-xs text-diamond-muted">A história da sua casa</p>
            </div>
          </div>
          <ChevronRight size={18} className="text-gold" />
        </div>
      </Card>

      {/* Material Passport */}
      <Card
        className="cursor-pointer border-white/5 bg-onyx-900 p-5 transition-colors hover:border-gold/30"
        onClick={() => setShowPassport(true)}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/5">
              <Shield size={24} className="text-diamond-muted" />
            </div>
            <div>
              <h3 className="font-medium text-diamond">Material Passport</h3>
              <p className="text-xs text-diamond-muted">Origens e garantias dos materiais</p>
            </div>
          </div>
          <ChevronRight size={18} className="text-diamond-muted" />
        </div>
      </Card>

      {/* Folders Grid */}
      <div className="grid grid-cols-2 gap-3">
        {folders.map((folder, index) => (
          <motion.div
            key={folder.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Card
              className="cursor-pointer border-white/5 bg-onyx-900 p-4 transition-colors hover:border-gold/30"
              onClick={() => setSelectedFolder(folder)}
            >
              <div className="mb-2 flex items-center gap-3">
                <div className="text-gold">{folder.icon}</div>
                <span className="truncate text-sm font-medium text-diamond">{folder.name}</span>
              </div>
              <p className="text-[10px] text-diamond-muted">{folder.count} documentos</p>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Folder Contents Modal */}
      {selectedFolder && (
        <div
          className="fixed inset-0 z-50 flex flex-col bg-onyx/95 p-4"
          onClick={() => setSelectedFolder(null)}
        >
          <div
            className="mb-6 flex items-center justify-between"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3">
              <Folder size={20} className="text-gold" />
              <span className="font-medium text-diamond">{selectedFolder.name}</span>
            </div>
            <Button variant="ghost" size="icon" onClick={() => setSelectedFolder(null)}>
              <X size={18} className="text-diamond-muted" />
            </Button>
          </div>
          <div className="space-y-3" onClick={(e) => e.stopPropagation()}>
            {documents.map((doc) => (
              <Card
                key={doc.id}
                className="flex items-center justify-between border-white/5 bg-onyx-900 p-4"
              >
                <div className="flex items-center gap-3">
                  <FileText size={20} className="text-diamond-muted" />
                  <div>
                    <p className="text-sm text-diamond">{doc.name}</p>
                    <p className="text-[10px] text-diamond-muted">
                      {doc.size} • {new Date(doc.date).toLocaleDateString("pt-PT")}
                    </p>
                  </div>
                </div>
                <Button variant="ghost" size="icon" className="text-diamond-muted">
                  <Download size={16} />
                </Button>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Heritage Timeline Modal */}
      {showHeritage && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-onyx">
          <div className="p-4">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="font-serif text-xl text-diamond">Heritage Timeline™</h2>
              <Button variant="ghost" size="icon" onClick={() => setShowHeritage(false)}>
                <X size={18} className="text-diamond-muted" />
              </Button>
            </div>
            <div className="space-y-6">
              <Card className="border-white/5 bg-onyx-900 p-6 text-center">
                <Book size={48} className="mx-auto mb-4 text-gold" />
                <h3 className="mb-2 font-serif text-lg text-diamond">Villa Sal Rei</h3>
                <p className="mb-4 text-sm text-diamond-muted">
                  Uma crónica visual da criação da sua residência.
                </p>
                <Button className="text-onyx-950 gap-2 bg-gold">
                  <Download size={16} /> Exportar como PDF
                </Button>
              </Card>
              <p className="text-center text-xs text-diamond-muted">
                Este documento será gerado automaticamente com a história completa do seu projeto,
                fotos principais, materiais utilizados e datas importantes.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Material Passport Modal */}
      {showPassport && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-onyx">
          <div className="p-4">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="font-serif text-xl text-diamond">Material Passport</h2>
              <Button variant="ghost" size="icon" onClick={() => setShowPassport(false)}>
                <X size={18} className="text-diamond-muted" />
              </Button>
            </div>
            <div className="space-y-4">
              {materialPassport.map((mat) => (
                <Card key={mat.id} className="border-white/5 bg-onyx-900 p-4">
                  <h4 className="mb-2 font-medium text-diamond">{mat.name}</h4>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-diamond-muted">Origem:</span>{" "}
                      <span className="text-diamond">{mat.origin}</span>
                    </div>
                    <div>
                      <span className="text-diamond-muted">Fornecedor:</span>{" "}
                      <span className="text-diamond">{mat.supplier}</span>
                    </div>
                    <div>
                      <span className="text-diamond-muted">Garantia:</span>{" "}
                      <span className="text-diamond">{mat.warranty}</span>
                    </div>
                    <div>
                      <span className="text-diamond-muted">Manutenção:</span>{" "}
                      <span className="text-diamond">{mat.care}</span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
