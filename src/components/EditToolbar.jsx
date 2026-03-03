const LockIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

const UnlockIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 9.9-1" />
  </svg>
);

export default function EditToolbar({ isAdmin, saveStatus, onToggle }) {
  return (
    <div
      className="flex items-center justify-end gap-3 px-4 py-2"
      style={{ borderBottom: '1px solid var(--border)', background: 'var(--bg-panel)' }}
    >
      {/* Save status */}
      {isAdmin && saveStatus !== 'idle' && (
        <span
          className="text-xs"
          style={{
            color: saveStatus === 'saved' ? '#4ade80'
              : saveStatus === 'error' ? '#f87171'
              : 'var(--text-muted)',
          }}
        >
          {saveStatus === 'saving' ? 'Saving...' : saveStatus === 'saved' ? 'Saved ✓' : 'Save failed'}
        </span>
      )}

      {isAdmin ? (
        <button
          onClick={onToggle}
          className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded"
          style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border)',
            color: 'var(--text-muted)',
            cursor: 'pointer',
          }}
        >
          <UnlockIcon />
          Exit Edit Mode
        </button>
      ) : (
        <button
          onClick={onToggle}
          className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded"
          style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border)',
            color: 'var(--text-muted)',
            cursor: 'pointer',
          }}
        >
          <LockIcon />
          Edit
        </button>
      )}
    </div>
  );
}
