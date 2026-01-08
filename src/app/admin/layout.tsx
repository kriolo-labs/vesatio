import Link from 'next/link';
import { LayoutDashboard, Package, Map, FileText, Settings, User } from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <div style={{ display: 'flex', minHeight: '100vh' }}>
            {/* Sidebar */}
            <aside style={{
                width: '260px',
                borderRight: '1px solid var(--border-subtle)',
                background: 'var(--bg-secondary)',
                padding: '2rem 1.5rem',
                display: 'flex',
                flexDirection: 'column'
            }}>
                <div style={{ marginBottom: '3rem' }}>
                    <h2 style={{ fontSize: '1.5rem', letterSpacing: '0.1em' }}>
                        Vesatio<span className="text-gold">.OS</span>
                    </h2>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>ARCHITECT VIEW</p>
                </div>

                <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1 }}>
                    <NavItem href="/admin" icon={<LayoutDashboard size={20} />} label="Dashboard" active />
                    <NavItem href="/admin/projects" icon={<Map size={20} />} label="Projects" />
                    <NavItem href="/admin/inventory" icon={<Package size={20} />} label="Inventory" />
                    <NavItem href="/admin/reports" icon={<FileText size={20} />} label="Reports" />
                </nav>

                <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '1rem', marginTop: 'auto' }}>
                    <NavItem href="/admin/settings" icon={<Settings size={20} />} label="Settings" />
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginTop: '1rem', padding: '0.75rem', background: 'var(--bg-card)', borderRadius: 'var(--radius-md)' }}>
                        <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--gold-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <User size={16} color="black" />
                        </div>
                        <div>
                            <p style={{ fontSize: '0.85rem', fontWeight: 600 }}>Admin User</p>
                            <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Lead Architect</p>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main style={{ flex: 1, padding: '2rem', overflowY: 'auto' }}>
                {children}
            </main>
        </div>
    );
}

function NavItem({ href, icon, label, active = false }: { href: string, icon: React.ReactNode, label: string, active?: boolean }) {
    return (
        <Link href={href} style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            padding: '0.75rem 1rem',
            borderRadius: 'var(--radius-sm)',
            color: active ? 'var(--gold-primary)' : 'var(--text-secondary)',
            background: active ? 'rgba(212, 175, 55, 0.1)' : 'transparent',
            fontWeight: active ? 500 : 400
        }}>
            {icon}
            <span>{label}</span>
            {active && <div style={{ marginLeft: 'auto', width: '6px', height: '6px', borderRadius: '50%', background: 'var(--gold-primary)' }} />}
        </Link>
    )
}
