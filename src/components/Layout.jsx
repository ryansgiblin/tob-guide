import { useState } from 'react';

// Sword icon SVG (decorative, OSRS feel)
const SwordIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14.5 17.5L3 6V3h3l11.5 11.5" />
    <path d="M13 19l6-6" />
    <path d="M16 16l4 4" />
    <path d="M19 21l2-2" />
  </svg>
);

const MenuIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);

export default function Layout({ current, onSelect, children, rooms }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo / title */}
      <div className="px-4 py-5" style={{ borderBottom: '1px solid var(--border)' }}>
        <div className="flex items-center gap-2">
          <SwordIcon />
          <span className="font-display text-sm font-bold tracking-wider" style={{ color: 'var(--gold)' }}>
            TOB Guide
          </span>
        </div>
        <p className="text-xs mt-1" style={{ color: 'var(--text-dim)' }}>4s Max Efficiency</p>
      </div>

      {/* Room list */}
      <nav className="flex-1 py-3 overflow-y-auto">
        <p
          className="px-4 py-1 text-xs uppercase tracking-widest font-semibold"
          style={{ color: 'var(--text-dim)' }}
        >
          Rooms
        </p>
        {rooms.map((room) => (
          <button
            key={room.id}
            className={`sidebar-item w-full text-left px-4 py-2.5 text-sm flex items-center gap-2 ${current === room.id ? 'active' : ''}`}
            style={{ color: current === room.id ? 'var(--gold-light)' : 'var(--text-primary)', background: 'none' }}
            onClick={() => { onSelect(room.id); setSidebarOpen(false); }}
          >
            <span
              className="w-2 h-2 rounded-full shrink-0"
              style={{ background: room.color, opacity: current === room.id ? 1 : 0.4 }}
            />
            {room.shortName}
          </button>
        ))}

        {/* Divider */}
        <div className="gold-divider mx-4 my-3" />

        {/* Role Setups link */}
        <button
          className={`sidebar-item w-full text-left px-4 py-2.5 text-sm flex items-center gap-2 ${current === 'setups' ? 'active' : ''}`}
          style={{ color: current === 'setups' ? 'var(--gold-light)' : 'var(--text-primary)', background: 'none' }}
          onClick={() => { onSelect('setups'); setSidebarOpen(false); }}
        >
          <span className="text-base">🎒</span>
          Role Setups
        </button>

        {/* Plugins link */}
        <button
          className={`sidebar-item w-full text-left px-4 py-2.5 text-sm flex items-center gap-2 ${current === 'plugins' ? 'active' : ''}`}
          style={{ color: current === 'plugins' ? 'var(--gold-light)' : 'var(--text-primary)', background: 'none' }}
          onClick={() => { onSelect('plugins'); setSidebarOpen(false); }}
        >
          <span className="text-base">🔌</span>
          Plugins
        </button>
      </nav>

      {/* Footer */}
      <div className="px-4 py-3" style={{ borderTop: '1px solid var(--border)' }}>
        <p className="text-xs" style={{ color: 'var(--text-dim)' }}>4s scale — MVP</p>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: 'var(--bg-deep)' }}>
      {/* Desktop sidebar */}
      <aside
        className="hidden md:flex flex-col w-48 shrink-0"
        style={{ background: 'var(--bg-panel)', borderRight: '1px solid var(--border)' }}
      >
        <SidebarContent />
      </aside>

      {/* Mobile overlay sidebar */}
      {sidebarOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div
            className="absolute inset-0 bg-black opacity-60"
            onClick={() => setSidebarOpen(false)}
          />
          <aside
            className="relative w-56 flex flex-col z-10"
            style={{ background: 'var(--bg-panel)', borderRight: '1px solid var(--border)' }}
          >
            <SidebarContent />
          </aside>
        </div>
      )}

      {/* Main content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile top bar */}
        <div
          className="md:hidden flex items-center gap-3 px-4 py-3"
          style={{ background: 'var(--bg-panel)', borderBottom: '1px solid var(--border)' }}
        >
          <button
            onClick={() => setSidebarOpen(true)}
            style={{ background: 'none', border: 'none', color: 'var(--text-primary)', cursor: 'pointer', padding: 0 }}
          >
            <MenuIcon />
          </button>
          <span className="font-display text-sm font-bold" style={{ color: 'var(--gold)' }}>
            TOB Guide
          </span>
        </div>

        {children}
      </main>
    </div>
  );
}
