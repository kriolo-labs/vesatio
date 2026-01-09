import { ClientAuraChat } from "@/components/aura/ClientAuraChat";
import { ClientHeader } from "@/components/client/layout/client-header";
import { ClientNavbar } from "@/components/client/layout/client-navbar";

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-onyx">
      <ClientHeader />
      <main className="flex-1 pb-20">{children}</main>
      <ClientNavbar />
      <ClientAuraChat />
    </div>
  );
}
