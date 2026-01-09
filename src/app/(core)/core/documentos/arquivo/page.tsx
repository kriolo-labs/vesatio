"use client";

import { CoreLayout } from "@/components/layout/core-layout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { PageHeader } from "@/components/ui/page-header";
import { ArchiveItem } from "@/types/documents";
import {
  ChevronRight,
  File,
  FileText,
  Folder,
  FolderPlus,
  Grid,
  Home,
  Image as ImageIcon,
  List as ListIcon,
  MoreVertical,
  Search,
  Upload,
} from "lucide-react";
import { useState } from "react";

// Mock Data
const mockItems: ArchiveItem[] = [
  {
    id: "1",
    name: "Clientes",
    type: "folder",
    parent_id: null,
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
    owner_id: "user1",
  },
  {
    id: "2",
    name: "Fornecedores",
    type: "folder",
    parent_id: null,
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
    owner_id: "user1",
  },
  {
    id: "3",
    name: "Projetos 2024",
    type: "folder",
    parent_id: "1",
    created_at: "2024-01-02T00:00:00Z",
    updated_at: "2024-01-02T00:00:00Z",
    owner_id: "user1",
  },
  {
    id: "4",
    name: "Manual de Marca.pdf",
    type: "file",
    parent_id: null,
    size: 2500000,
    mime_type: "application/pdf",
    created_at: "2023-12-25T00:00:00Z",
    updated_at: "2023-12-25T00:00:00Z",
    owner_id: "user1",
  },
  {
    id: "5",
    name: "Logo_Vesatio.png",
    type: "file",
    parent_id: null,
    size: 150000,
    mime_type: "image/png",
    created_at: "2023-12-25T00:00:00Z",
    updated_at: "2023-12-25T00:00:00Z",
    owner_id: "user1",
  },
];

export default function ArchivePage() {
  const [currentPath, setCurrentPath] = useState<ArchiveItem[]>([]);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchTerm, setSearchTerm] = useState("");

  const currentFolderId = currentPath.length > 0 ? currentPath[currentPath.length - 1].id : null;

  // Filter items based on current folder OR search term (global search logic usually, but here simple local)
  const itemsToShow = mockItems.filter((item) => {
    if (searchTerm) {
      return item.name.toLowerCase().includes(searchTerm.toLowerCase());
    }
    return item.parent_id === currentFolderId;
  });

  const handleNavigate = (folder: ArchiveItem) => {
    setCurrentPath([...currentPath, folder]);
  };

  const handleNavigateUp = (index: number) => {
    if (index === -1) {
      setCurrentPath([]);
    } else {
      setCurrentPath(currentPath.slice(0, index + 1));
    }
  };

  const formatSize = (bytes?: number) => {
    if (!bytes) return "-";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
  };

  const getIcon = (type: string, mime?: string) => {
    if (type === "folder")
      return <Folder size={32} className="text-gold" fill="currentColor" fillOpacity={0.2} />;
    if (mime?.includes("image")) return <ImageIcon size={32} className="text-purple-400" />;
    if (mime?.includes("pdf")) return <FileText size={32} className="text-red-400" />;
    return <File size={32} className="text-blue-400" />;
  };

  return (
    <CoreLayout>
      <PageHeader title="Arquivo Geral" description="Repositório central de documentos da empresa.">
        <div className="flex gap-2">
          <div className="mr-2 flex rounded-lg border border-white/5 bg-onyx-900 p-1">
            <Button
              variant="ghost"
              size="sm"
              className={`h-7 px-2 ${viewMode === "grid" ? "bg-white/10 text-white" : "text-diamond-muted"}`}
              onClick={() => setViewMode("grid")}
            >
              <Grid size={16} />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className={`h-7 px-2 ${viewMode === "list" ? "bg-white/10 text-white" : "text-diamond-muted"}`}
              onClick={() => setViewMode("list")}
            >
              <ListIcon size={16} />
            </Button>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="gap-2 border-white/10 text-diamond-muted hover:text-white"
          >
            <FolderPlus size={16} /> Nova Pasta
          </Button>
          <Button size="sm" className="btn-primary gap-2">
            <Upload size={16} /> Upload
          </Button>
        </div>
      </PageHeader>

      {/* Breadcrumbs & Search */}
      <div className="mb-6 flex flex-col items-center justify-between gap-4 md:flex-row">
        <div className="flex w-full items-center gap-1 overflow-x-auto rounded-lg border border-white/5 bg-onyx-900 px-3 py-2 text-sm md:w-auto">
          <Button
            variant="ghost"
            size="sm"
            className="h-6 px-1 text-diamond-muted hover:text-white"
            onClick={() => handleNavigateUp(-1)}
          >
            <Home size={14} />
          </Button>
          {currentPath.map((folder, index) => (
            <div key={folder.id} className="flex items-center">
              <ChevronRight size={12} className="mx-1 text-diamond-muted" />
              <Button
                variant="ghost"
                size="sm"
                className={`h-6 px-2 ${index === currentPath.length - 1 ? "font-medium text-white" : "text-diamond-muted hover:text-white"}`}
                onClick={() => handleNavigateUp(index)}
              >
                {folder.name}
              </Button>
            </div>
          ))}
        </div>

        <div className="relative w-full md:w-64">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-diamond-muted"
            size={14}
          />
          <Input
            placeholder="Pesquisar arquivos..."
            className="h-9 border-white/5 bg-onyx-900 pl-9 text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Folder Content */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-6">
          {itemsToShow.length > 0 ? (
            itemsToShow.map((item) => (
              <Card
                key={item.id}
                className="group cursor-pointer border-transparent bg-onyx-900 transition-all hover:border-gold/30 hover:bg-onyx-800"
                onClick={() => item.type === "folder" && handleNavigate(item)}
              >
                <div className="flex h-full flex-col items-center justify-center p-4 text-center">
                  <div className="mb-3 transition-transform duration-300 group-hover:scale-110">
                    {getIcon(item.type, item.mime_type)}
                  </div>
                  <p className="line-clamp-2 break-all text-sm font-medium text-white">
                    {item.name}
                  </p>
                  <p className="mt-1 text-[10px] text-diamond-muted">
                    {item.type === "folder" ? "Pasta" : formatSize(item.size)}
                  </p>
                </div>
              </Card>
            ))
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-white/5 py-12 text-diamond-muted">
              <Folder size={48} className="mb-4 opacity-20" />
              <p>Esta pasta está vazia</p>
            </div>
          )}
        </div>
      ) : (
        <div className="overflow-hidden rounded-lg border border-white/5 bg-onyx-900">
          <table className="w-full text-sm">
            <thead className="bg-white/5">
              <tr className="text-left text-xs uppercase text-diamond-muted">
                <th className="px-4 py-3 font-medium">Nome</th>
                <th className="px-4 py-3 font-medium">Tamanho</th>
                <th className="px-4 py-3 font-medium">Modificado</th>
                <th className="w-10 px-4 py-3 font-medium"></th>
              </tr>
            </thead>
            <tbody>
              {itemsToShow.length > 0 ? (
                itemsToShow.map((item) => (
                  <tr
                    key={item.id}
                    className="cursor-pointer border-t border-white/5 hover:bg-white/5"
                    onClick={() => item.type === "folder" && handleNavigate(item)}
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        {item.type === "folder" ? (
                          <Folder size={18} className="text-gold" />
                        ) : (
                          <File size={18} className="text-blue-400" />
                        )}
                        <span className="text-white">{item.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-diamond-muted">{formatSize(item.size)}</td>
                    <td className="px-4 py-3 text-diamond-muted">
                      {new Date(item.updated_at).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3">
                      <Button size="icon" variant="ghost" className="h-6 w-6 text-diamond-muted">
                        <MoreVertical size={14} />
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="px-4 py-8 text-center italic text-diamond-muted">
                    Pasta vazia
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </CoreLayout>
  );
}
