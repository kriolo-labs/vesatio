import { PublicAuraWidget } from "@/components/aura/PublicAuraWidget";
import { PublicFooter } from "@/components/website/layout/public-footer";
import { PublicHeader } from "@/components/website/layout/public-header";

export default function WebsiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-onyx">
      <PublicHeader />
      <main>{children}</main>
      <PublicFooter />
      <PublicAuraWidget />
    </div>
  );
}
