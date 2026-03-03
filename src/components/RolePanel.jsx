import ProcedureList from './ProcedureList';
import EditableProcedureList from './EditableProcedureList';

export default function RolePanel({ role, roomId, isAdmin, setSaveStatus, onDataChange }) {
  return (
    <div className="role-panel">
      {/* Panel header */}
      <div className="px-4 py-3" style={{ borderBottom: '1px solid var(--border)', background: 'var(--bg-panel)' }}>
        <h2 className="font-display text-base" style={{ color: 'var(--gold-light)' }}>
          {role.name}
        </h2>
        {role.summary && (
          <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)', lineHeight: 1.5 }}>
            {role.summary}
          </p>
        )}
      </div>

      {/* Steps */}
      <div className="p-4">
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
    </div>
  );
}
