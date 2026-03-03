import VideoEmbed from './VideoEmbed';

// Numbered step-by-step procedure for a role
export default function ProcedureList({ steps = [] }) {
  if (!steps.length) {
    return <p style={{ color: 'var(--text-muted)' }}>No procedure added yet.</p>;
  }

  return (
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
              <p className="m-0 text-sm" style={{ color: 'var(--text-primary)' }}>{s.text}</p>
              {s.tip && (
                <div className="tip-callout mt-2 px-3 py-2 rounded text-xs" style={{ color: 'var(--gold-light)' }}>
                  <span className="font-semibold">Tip: </span>{s.tip}
                </div>
              )}
              {s.video && (
                <div className="mt-3">
                  <VideoEmbed video={s.video} />
                </div>
              )}
            </div>
          </div>
        </li>
      ))}
    </ol>
  );
}
