import { useState } from 'react';
import SetupPanel from './SetupPanel';

export default function RoomHeader({ room }) {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ borderBottom: '1px solid var(--border)' }}>
      {/* Always-visible title bar */}
      <div
        className="px-6 py-4 flex items-center justify-between"
        style={{
          background: `linear-gradient(to bottom, color-mix(in srgb, ${room.color} 20%, var(--bg-panel)), var(--bg-panel))`,
        }}
      >
        <div>
          <h1 className="font-display text-2xl md:text-3xl" style={{ color: 'var(--gold-light)' }}>
            {room.name}
          </h1>
          <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>
            4s Theatre of Blood — {room.roles.length} role{room.roles.length !== 1 ? 's' : ''}
          </p>
        </div>
        <button
          onClick={() => setOpen((o) => !o)}
          className="text-xs px-3 py-1.5 rounded"
          style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border)',
            color: 'var(--text-muted)',
            cursor: 'pointer',
          }}
        >
          Overview & Setup {open ? '▲' : '▼'}
        </button>
      </div>

      {/* Collapsible overview + setup */}
      {open && (
        <div className="px-6 py-4" style={{ background: 'var(--bg-panel)' }}>
          <p className="text-sm mb-4" style={{ color: 'var(--text-primary)', lineHeight: 1.7 }}>
            {room.overview}
          </p>
          <div className="gold-divider mb-4" />
          <SetupPanel setup={room.setup} />
        </div>
      )}
    </div>
  );
}
