export default function LoadingState() {
  return (
    <div className="flex-1 overflow-y-auto">
      {/* Header skeleton */}
      <div className="px-6 pt-6 pb-4" style={{ borderBottom: '1px solid var(--border)', background: 'var(--bg-panel)' }}>
        <div style={{ height: 28, width: 220, background: 'var(--bg-hover)', borderRadius: 4, marginBottom: 8 }} />
        <div style={{ height: 16, width: 140, background: 'var(--bg-hover)', borderRadius: 4 }} />
      </div>
      {/* Quadrant skeleton */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', padding: '1rem' }}>
        {[0, 1, 2, 3].map((i) => (
          <div key={i} style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 8, padding: '1rem', minHeight: 220 }}>
            <div style={{ height: 18, width: 100, background: 'var(--bg-hover)', borderRadius: 4, marginBottom: 12 }} />
            {[0, 1, 2, 3].map((j) => (
              <div key={j} style={{ height: 14, background: 'var(--bg-hover)', borderRadius: 4, marginBottom: 8, width: `${75 + (j % 3) * 10}%` }} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
