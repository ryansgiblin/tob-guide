import { useState } from 'react';
import MediaModal from './MediaModal';

const PlayIcon = () => (
  <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
    <polygon points="5 3 19 12 5 21 5 3"/>
  </svg>
);

// Numbered step-by-step procedure for a role
export default function ProcedureList({ steps = [] }) {
  const [mediaUrl, setMediaUrl] = useState(null);

  if (!steps.length) {
    return <p style={{ color: 'var(--text-muted)' }}>No procedure added yet.</p>;
  }

  return (
    <>
      <ol className="space-y-4 list-none p-0 m-0">
        {steps.map((s) => (
          <li key={s.step} className="step-card pl-4 py-2">
            <div className="flex gap-3 items-start">
              <span
                className="shrink-0 font-display text-sm font-bold w-6 h-6 flex items-center justify-center rounded-full"
                style={{ background: 'var(--gold-dark)', color: '#0d0d0f' }}
              >
                {s.step}
              </span>
              <div className="flex-1 min-w-0">
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.4rem' }}>
                  <p className="m-0 text-sm flex-1" style={{ color: 'var(--text-primary)' }}>{s.text}</p>
                  {s.video && (
                    <button
                      onClick={() => setMediaUrl(s.video)}
                      title="Watch video"
                      style={{
                        flexShrink: 0,
                        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                        width: 20, height: 20,
                        background: 'var(--gold-dark)', border: 'none', borderRadius: '50%',
                        color: '#0d0d0f', cursor: 'pointer',
                        marginTop: 1,
                      }}
                    >
                      <PlayIcon />
                    </button>
                  )}
                </div>
                {s.tip && (
                  <div className="tip-callout mt-2 px-3 py-2 rounded text-xs" style={{ color: 'var(--gold-light)' }}>
                    <span className="font-semibold">Tip: </span>{s.tip}
                  </div>
                )}
                {s.image && (
                  <div className="mt-2">
                    <img
                      src={s.image}
                      alt="Step visual"
                      style={{ maxWidth: '100%', maxHeight: 200, borderRadius: 4, border: '1px solid var(--border)', display: 'block' }}
                    />
                  </div>
                )}
              </div>
            </div>
          </li>
        ))}
      </ol>

      <MediaModal url={mediaUrl} onClose={() => setMediaUrl(null)} />
    </>
  );
}
