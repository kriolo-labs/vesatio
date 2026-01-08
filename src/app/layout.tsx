import { AuthProvider } from "@/components/auth/auth-provider";
import { Toaster } from "@/components/ui/toaster";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Vesatio | Acabamentos de Ultra-Luxo & Smart Homes",
  description: "A Vesatio transforma espaços em símbolos de status. Acabamentos de alta performance, marcenaria bespoke e integração inteligente para a elite.",
  keywords: ["acabamentos luxo", "smart home", "cabo verde", "marcenaria", "interiores premium"],
  authors: [{ name: "Vesatio" }],
  openGraph: {
    title: "Vesatio | Acabamentos de Ultra-Luxo & Smart Homes",
    description: "A Vesatio transforma espaços em símbolos de status.",
    type: "website",
    locale: "pt_PT",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@400;700;900&family=Inter:wght@400;500;600;700&family=Manrope:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-onyx font-sans antialiased">
        <AuthProvider>
          {children}
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
