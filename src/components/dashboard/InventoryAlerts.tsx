import { InventoryAgent } from '@/lib/services/inventoryAgent';

export function InventoryAlerts() {
    // Mock checking for some common items
    const checkCalc = InventoryAgent.checkCrossStock('Paint_Premium_Black', 10, 'proj_alpha');

    return (
        <div className="glass-panel" style={{ padding: '1.5rem', height: '100%', overflowY: 'auto' }}>
            <h3 style={{ marginBottom: '1rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.5rem' }}>
                Inventory <span className="text-gold">Alerts</span>
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {checkCalc.alert ? (
                    <div style={{
                        padding: '1rem',
                        border: '1px solid red',
                        background: 'rgba(255, 0, 0, 0.1)',
                        borderRadius: 'var(--radius-sm)'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                            <span style={{ color: 'red' }}>⚠️</span>
                            <strong style={{ color: '#ff4444' }}>Optimization Opportunity</strong>
                        </div>
                        <p style={{ fontSize: '0.9rem', marginBottom: '0.5rem' }}>{checkCalc.message}</p>
                        <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', background: 'rgba(0,0,0,0.3)', padding: '0.5rem' }}>
                            Try: {checkCalc.suggestion}
                        </div>
                    </div>
                ) : (
                    <p style={{ color: 'var(--text-muted)' }}>No critical alerts.</p>
                )}

                {/* Static Alert Example */}
                <div style={{
                    padding: '1rem',
                    border: '1px solid var(--gold-dim)',
                    background: 'rgba(212, 175, 55, 0.05)',
                    borderRadius: 'var(--radius-sm)'
                }}>
                    <strong style={{ color: 'var(--gold-primary)' }}>Low Stock Warning</strong>
                    <p style={{ fontSize: '0.9rem', marginTop: '0.25rem' }}>Cement Bags (Type B) are running low at Warehouse A.</p>
                </div>
            </div>
        </div>
    );
}
