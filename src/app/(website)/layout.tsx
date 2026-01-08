import { PublicHeader } from "@/components/website/layout/public-header";
import { PublicFooter } from "@/components/website/layout/public-footer";

export default function WebsiteLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-onyx">
            <PublicHeader />
            <main>{children}</main>
            <PublicFooter />
        </div>
    );
}
