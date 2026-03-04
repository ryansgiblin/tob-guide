import { useState } from 'react';
import ProcedureList from './ProcedureList';
import EditableProcedureList from './EditableProcedureList';

export default function RolePanel({ role, roomId, isAdmin, setSaveStatus, onDataChange }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="role-panel" style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
      {/* Panel header — click to collapse/expand */}
      <div
        className="px-4 py-3"
        onClick={() => setCollapsed((c) => !c)}
        style={{
          borderBottom: collapsed ? 'none' : '1px solid var(--border)',
          background: 'var(--bg-panel)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          gap: '0.5rem',
          userSelect: 'none',
        }}
      >
        <div style={{ flex: 1, minWidth: 0 }}>
          <h2 className="font-display text-base" style={{ color: 'var(--gold-light)' }}>
            {role.name}
          </h2>
          {role.summary && (
            <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)', lineHeight: 1.5 }}>
              {role.summary}
            </p>
          )}
        </div>
        <span style={{ color: 'var(--text-muted)', fontSize: 11, flexShrink: 0, marginTop: 3 }}>
          {collapsed ? '▼' : '▲'}
        </span>
      </div>

      {/* Steps */}
      {!collapsed && (
        <div className="p-4" style={{ flex: 1, overflowY: 'auto', minHeight: 0 }}>
          {isAdmin ? (
            <EditableProcedureList
              steps={role.procedure}
              roomId={roomId}
              roleId={role.id}
              setSaveStatus={setSaveStatus}
              onDataChange={onDataChange}
            />
          ) : (
            <ProcedureList steps={role.procedure} />
          )}
        </div>
      )}
    </div>
  );
}
