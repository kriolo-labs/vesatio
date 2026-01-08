"use client";

import { Button } from "@/components/ui/button";
import { cn, formatBytes } from "@/lib/utils";
import { File, FileImage, Upload, X } from "lucide-react";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

interface FileUploadProps {
  onFilesSelected: (files: File[]) => void;
  maxFiles?: number;
  accept?: Record<string, string[]>;
  maxSize?: number; // bytes
  className?: string;
}

export function FileUpload({
  onFilesSelected,
  maxFiles = 5,
  accept,
  maxSize = 10 * 1024 * 1024, // 10MB
  className,
}: FileUploadProps) {
  const [files, setFiles] = useState<File[]>([]);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const newFiles = [...files, ...acceptedFiles].slice(0, maxFiles);
      setFiles(newFiles);
      onFilesSelected(newFiles);
    },
    [files, maxFiles, onFilesSelected]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles,
    accept,
    maxSize,
  });

  const removeFile = (fileToRemove: File) => {
    const newFiles = files.filter((f) => f !== fileToRemove);
    setFiles(newFiles);
    onFilesSelected(newFiles);
  };

  return (
    <div className={cn("space-y-4", className)}>
      <div
        {...getRootProps()}
        className={cn(
          "border-2 border-dashed border-white/10 rounded-lg p-8 transition-colors cursor-pointer text-center",
          isDragActive ? "border-gold bg-gold/5" : "hover:border-gold/50 hover:bg-white/5"
        )}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center justify-center gap-2">
          <Upload className="w-8 h-8 text-diamond-muted" />
          <p className="text-sm font-medium text-diamond">
            {isDragActive
              ? "Solte os ficheiros aqui"
              : "Arraste ficheiros ou clique para seleccionar"}
          </p>
          <p className="text-xs text-diamond-muted">
            Máx. {maxFiles} ficheiros, até {formatBytes(maxSize)} cada
          </p>
        </div>
      </div>

      {files.length > 0 && (
        <div className="space-y-2">
          {files.map((file, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 rounded-lg bg-onyx-100 border border-white/5"
            >
              <div className="flex items-center gap-3 overflow-hidden">
                <div className="flex-shrink-0 w-8 h-8 rounded bg-white/5 flex items-center justify-center">
                  {file.type.startsWith("image/") ? (
                    <FileImage className="w-4 h-4 text-gold" />
                  ) : (
                    <File className="w-4 h-4 text-diamond-muted" />
                  )}
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-sm font-medium text-diamond truncate">
                    {file.name}
                  </span>
                  <span className="text-xs text-diamond-muted">
                    {formatBytes(file.size)}
                  </span>
                </div>
              </div>
              <Button
                size="icon"
                variant="ghost"
                className="h-8 w-8 text-diamond-muted hover:text-status-error"
                onClick={() => removeFile(file)}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
