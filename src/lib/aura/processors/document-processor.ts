import { auraClient } from "../client";

export interface ProcessedDocument {
  text: string;
  metadata: Record<string, any>;
  type: "pdf" | "image" | "csv" | "excel" | "unknown";
}

export class DocumentProcessor {
  async processFile(file: File): Promise<ProcessedDocument> {
    const fileType = this.detectType(file);

    switch (fileType) {
      case "pdf":
        // Integration note: In a real environment, we'd use 'pdf-parse' or similar on server side
        // or sending to an OCR service. Here we mock content extraction.
        return {
          text: "CONTRATO DE PRESTAÇÃO DE SERVIÇOS\nENTRE: Vesatio Lda e Cliente Final...",
          metadata: { pages: 3 },
          type: "pdf",
        };
      case "image":
        return await this.processImage(file);
      case "csv":
      case "excel":
        // Mock CSV parsing
        return {
          text: "Product,SKU,Quantity\nChair,CH-001,50\nTable,TB-001,10",
          metadata: { rows: 3 },
          type: fileType,
        };
      default:
        throw new Error("Unsupported file type");
    }
  }

  private detectType(file: File): "pdf" | "image" | "csv" | "excel" | "unknown" {
    if (file.type.includes("pdf")) return "pdf";
    if (file.type.includes("image")) return "image";
    if (file.type.includes("csv")) return "csv";
    if (file.type.includes("spreadsheet") || file.name.endsWith(".xlsx")) return "excel";
    return "unknown";
  }

  private async processImage(file: File): Promise<ProcessedDocument> {
    // Convert File to Base64
    const base64 = await this.fileToBase64(file);

    // Analyze with Vision Model
    const analysis = await auraClient.generateVision(
      "Descreva detalhadamente o que vê nesta imagem técnica de obra ou material.",
      base64.split(",")[1], // Remove data URL prefix
      file.type
    );

    return {
      text: analysis.text,
      metadata: { width: 0, height: 0 }, // Would get from Image object
      type: "image",
    };
  }

  private fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  }
}

export const documentProcessor = new DocumentProcessor();
