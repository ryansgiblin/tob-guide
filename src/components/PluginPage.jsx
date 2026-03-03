const CATEGORY_ORDER = ['Raids', 'Combat', 'Timing', 'QoL', 'Performance'];

export default function PluginPage({ plugins = [] }) {
  const categories = CATEGORY_ORDER.filter((cat) =>
    plugins.some((p) => p.category === cat)
  );

  return (
    <div className="p-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-display text-2xl mb-2" style={{ color: 'var(--gold-light)' }}>
          Recommended Plugins
        </h1>
        <div className="gold-divider mb-4" />
        <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
          RuneLite plugins that are essential or strongly recommended for TOB. Install via the{' '}
          <a
            href="https://runelite.net/plugin-hub"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'var(--gold)' }}
          >
            Plugin Hub
          </a>{' '}
          inside the RuneLite client.
        </p>
      </div>

      {/* Plugin grid by category */}
      {categories.map((cat) => {
        const catPlugins = plugins.filter((p) => p.category === cat);
        return (
          <div key={cat} className="mb-8">
            <h2
              className="font-display text-sm uppercase tracking-widest mb-3"
              style={{ color: 'var(--gold-dark)' }}
            >
              {cat}
            </h2>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {catPlugins.map((plugin) => (
                <div key={plugin.id} className="plugin-card rounded-lg p-4">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>
                      {plugin.name}
                    </h3>
                    {plugin.builtin && (
                      <span
                        className="text-xs px-1.5 py-0.5 rounded shrink-0"
                        style={{ background: '#1a1a10', color: 'var(--gold-dark)', border: '1px solid var(--gold-dark)' }}
                      >
                        Built-in
                      </span>
                    )}
                  </div>
                  <p className="text-xs leading-relaxed mb-3" style={{ color: 'var(--text-muted)' }}>
                    {plugin.description}
                  </p>
                  <div className="flex items-center gap-2 flex-wrap">
                    {plugin.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2 py-0.5 rounded-full"
                        style={{ background: 'var(--bg-hover)', color: 'var(--text-dim)', border: '1px solid var(--border)' }}
                      >
                        {tag}
                      </span>
                    ))}
                    {plugin.hubLink && (
                      <a
                        href={plugin.hubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-auto text-xs"
                        style={{ color: 'var(--gold)' }}
                      >
                        Plugin Hub →
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
