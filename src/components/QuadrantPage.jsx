import { useState } from 'react';
import RoomHeader from './RoomHeader';
import RolePanel from './RolePanel';
import EditToolbar from './EditToolbar';
import PasswordModal from './PasswordModal';

// Returns CSS grid-template-columns for 1–4 roles.
// 4 roles → 2×2 quadrant layout (the standard for this guide).
function gridCols(count) {
  if (count === 1) return '1fr';
  if (count === 2) return '1fr 1fr';
  if (count === 3) return '1fr 1fr 1fr';
  return '1fr 1fr'; // 4 → 2×2
}

export default function QuadrantPage({ room, isAdmin, signIn, signOut, saveStatus, setSaveStatus, onDataChange }) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <RoomHeader room={room} />
      <EditToolbar
        isAdmin={isAdmin}
        saveStatus={saveStatus ?? 'idle'}
        onToggle={isAdmin ? signOut : () => setModalOpen(true)}
      />

      {/* Quadrant grid — panels scroll internally */}
      <div className={`flex-1 overflow-hidden p-4${isAdmin ? ' edit-mode' : ''}`}>
        <div
          className="quadrant-grid"
          data-roles={room.roles.length}
          style={{
            display: 'grid',
            gap: '1rem',
            height: '100%',
            alignItems: 'stretch',
            gridTemplateColumns: gridCols(room.roles.length),
            gridTemplateRows: room.roles.length === 4 ? '1fr 1fr' : '1fr',
          }}
        >
          {room.roles.map((role) => (
            <RolePanel
              key={role.id}
              role={role}
              roomId={room.id}
              isAdmin={isAdmin}
              setSaveStatus={setSaveStatus}
              onDataChange={onDataChange}
            />
          ))}
        </div>
      </div>

      <PasswordModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        signIn={signIn}
      />
    </div>
  );
}
