import { SessionManager } from "@/components/security/session-manager";
import { TrustedDevices } from "@/components/security/trusted-devices";
import { TwoFactorSetup } from "@/components/security/two-factor-setup";
import { Separator } from "@/components/ui/separator";

export default function SecuritySettingsPage() {
    return (
        <div className="max-w-4xl mx-auto space-y-8 p-8">
            <div className="space-y-2">
                <h1 className="text-3xl font-serif text-gold">Segurança & Acesso</h1>
                <p className="text-diamond-muted">Gerencie a segurança da sua conta e dispositivos conectados.</p>
            </div>

            <div className="glass-panel p-6 space-y-8">
                <section>
                    <TwoFactorSetup />
                </section>
                
                <Separator className="bg-white/10" />
                
                <section>
                    <TrustedDevices />
                </section>

                <Separator className="bg-white/10" />

                <section>
                    <SessionManager />
                </section>
            </div>
        </div>
    );
}
