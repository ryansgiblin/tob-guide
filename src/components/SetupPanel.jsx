// Gear, inventory, and stats setup for a room
export default function SetupPanel({ setup }) {
  if (!setup) return null;

  const sections = [
    { key: 'gear', label: 'Gear' },
    { key: 'inventory', label: 'Inventory' },
    { key: 'stats', label: 'Recommended Stats' },
  ];

  return (
    <div className="space-y-6">
      {setup.notes && (
        <p className="text-sm" style={{ color: 'var(--text-muted)' }}>{setup.notes}</p>
      )}
      <div className="grid gap-4 md:grid-cols-3">
        {sections.map(({ key, label }) => {
          const items = setup[key];
          if (!items || !items.length) return null;
          return (
            <div
              key={key}
              className="rounded-lg p-4"
              style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
            >
              <h4
                className="font-display text-xs uppercase tracking-widest mb-3"
                style={{ color: 'var(--gold)' }}
              >
                {label}
              </h4>
              <ul className="space-y-1.5 list-none p-0 m-0">
                {items.map((item, i) => (
                  <li key={i} className="flex gap-2 items-start text-sm">
                    <span style={{ color: 'var(--gold-dark)' }}>•</span>
                    <span style={{ color: 'var(--text-primary)' }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}
