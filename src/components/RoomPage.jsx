import { useState } from 'react';
import RoleSelector from './RoleSelector';
import ProcedureList from './ProcedureList';
import SetupPanel from './SetupPanel';
import VideoEmbed from './VideoEmbed';

const TABS = ['Overview', 'Setup', 'Roles', 'Videos'];

export default function RoomPage({ room }) {
  const [activeTab, setActiveTab] = useState('Overview');
  const [activeRoleId, setActiveRoleId] = useState(room.roles[0]?.id);

  // Reset role when room changes
  const activeRole = room.roles.find((r) => r.id === activeRoleId) || room.roles[0];

  // Gather all videos across all roles for the Videos tab
  const allVideos = room.roles.flatMap((r) =>
    (r.videos || []).map((v) => ({ ...v, roleName: r.name }))
  );

  return (
    <div className="flex-1 overflow-y-auto">
      {/* Room header banner */}
      <div
        className="px-6 pt-6 pb-4"
        style={{
          background: `linear-gradient(to bottom, color-mix(in srgb, ${room.color} 20%, var(--bg-panel)), var(--bg-panel))`,
          borderBottom: '1px solid var(--border)',
        }}
      >
        <h1 className="font-display text-2xl md:text-3xl mb-1" style={{ color: 'var(--gold-light)' }}>
          {room.name}
        </h1>
        <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
          4s Theatre of Blood — {room.roles.length} role{room.roles.length !== 1 ? 's' : ''}
        </p>
      </div>

      {/* Tabs */}
      <div
        className="flex gap-0 px-6"
        style={{ borderBottom: '1px solid var(--border)', background: 'var(--bg-panel)' }}
      >
        {TABS.map((tab) => {
          // Hide Videos tab if no videos exist
          if (tab === 'Videos' && allVideos.length === 0) return null;
          return (
            <button
              key={tab}
              className={`tab-btn px-4 py-3 text-sm font-medium ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          );
        })}
      </div>

      {/* Tab content */}
      <div className="p-6 max-w-4xl">
        {activeTab === 'Overview' && (
          <div className="space-y-4">
            <p style={{ color: 'var(--text-primary)' }}>{room.overview}</p>
            <div className="gold-divider" />
            <div>
              <h3 className="font-display text-sm uppercase tracking-widest mb-3" style={{ color: 'var(--gold)' }}>
                Roles in this room
              </h3>
              <ul className="space-y-2">
                {room.roles.map((r) => (
                  <li key={r.id} className="flex gap-2 items-start">
                    <span style={{ color: 'var(--gold-dark)' }}>▸</span>
                    <div>
                      <span className="font-medium text-sm" style={{ color: 'var(--gold-light)' }}>{r.name}</span>
                      {r.summary && (
                        <span className="text-sm" style={{ color: 'var(--text-muted)' }}> — {r.summary}</span>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'Setup' && <SetupPanel setup={room.setup} />}

        {activeTab === 'Roles' && (
          <div className="space-y-6">
            <RoleSelector
              roles={room.roles}
              activeId={activeRole?.id}
              onChange={setActiveRoleId}
            />
            {activeRole && (
              <div>
                <div className="mb-4">
                  <h2 className="font-display text-lg" style={{ color: 'var(--gold-light)' }}>
                    {activeRole.name}
                  </h2>
                  {activeRole.summary && (
                    <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>
                      {activeRole.summary}
                    </p>
                  )}
                </div>
                <div className="gold-divider mb-4" />
                <ProcedureList steps={activeRole.procedure} />

                {/* Role-specific videos */}
                {activeRole.videos && activeRole.videos.length > 0 && (
                  <div className="mt-8 space-y-4">
                    <h3 className="font-display text-sm uppercase tracking-widest" style={{ color: 'var(--gold)' }}>
                      Video Examples
                    </h3>
                    <div className="grid gap-4 md:grid-cols-2">
                      {activeRole.videos.map((v, i) => (
                        <div key={i}>
                          {v.label && (
                            <p className="text-xs mb-1 font-medium" style={{ color: 'var(--text-muted)' }}>
                              {v.label}
                            </p>
                          )}
                          <VideoEmbed video={v} />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {activeTab === 'Videos' && allVideos.length > 0 && (
          <div className="space-y-6">
            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
              All video examples for {room.name}.
            </p>
            <div className="grid gap-6 md:grid-cols-2">
              {allVideos.map((v, i) => (
                <div key={i}>
                  <p className="text-xs mb-1 font-medium" style={{ color: 'var(--gold-dark)' }}>
                    {v.roleName}
                  </p>
                  {v.label && (
                    <p className="text-xs mb-2" style={{ color: 'var(--text-muted)' }}>{v.label}</p>
                  )}
                  <VideoEmbed video={v} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
