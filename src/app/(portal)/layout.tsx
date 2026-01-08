import { ClientHeader } from "@/components/client/layout/client-header";
import { ClientNavbar } from "@/components/client/layout/client-navbar";

export default function PortalLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-onyx flex flex-col">
            <ClientHeader />
            <main className="flex-1 pb-20">{children}</main>
            <ClientNavbar />
        </div>
    );
}
