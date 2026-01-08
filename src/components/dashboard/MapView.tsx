export function MapView() {
    return (
        <div className="glass-panel" style={{ padding: '1.5rem', height: '100%', position: 'relative', overflow: 'hidden' }}>
            <h3 style={{ position: 'absolute', top: '1.5rem', left: '1.5rem', zIndex: 10 }}>
                Active <span className="text-gold">Sites</span>
            </h3>
            {/* Mock Map Background */}
            <div style={{
                width: '100%',
                height: '100%',
                background: 'linear-gradient(to bottom right, #1a1a1a, #050505)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 'var(--radius-sm)'
            }}>
                <div style={{ position: 'relative', width: '80%', height: '60%', border: '1px dashed var(--text-muted)', borderRadius: '50%' }}>
                    {/* Mock Points */}
                    <div style={{ position: 'absolute', top: '20%', left: '30%' }} className="flex-center">
                        <span style={{ display: 'block', width: '10px', height: '10px', background: 'var(--gold-primary)', borderRadius: '50%', boxShadow: '0 0 10px var(--gold-primary)' }}></span>
                        <span style={{ marginLeft: '8px', fontSize: '0.8rem', color: 'var(--text-primary)' }}>Praia</span>
                    </div>
                    <div style={{ position: 'absolute', top: '60%', right: '40%' }} className="flex-center">
                        <span style={{ display: 'block', width: '10px', height: '10px', background: 'var(--gold-primary)', borderRadius: '50%', boxShadow: '0 0 10px var(--gold-primary)' }}></span>
                        <span style={{ marginLeft: '8px', fontSize: '0.8rem', color: 'var(--text-primary)' }}>Sal</span>
                    </div>
                </div>
                <p style={{ position: 'absolute', bottom: '1rem', right: '1rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    Google Maps API / Mapbox Integration Pending
                </p>
            </div>
        </div>
    );
}
