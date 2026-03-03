import { useState } from 'react';
import RoomHeader from './RoomHeader';
import RolePanel from './RolePanel';
import EditToolbar from './EditToolbar';
import PasswordModal from './PasswordModal';

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

      {/* Quadrant grid — scrollable */}
      <div className={`flex-1 overflow-y-auto p-4${isAdmin ? ' edit-mode' : ''}`}>
        <div
          className="quadrant-grid"
          data-roles={room.roles.length}
          style={{
            display: 'grid',
            gap: '1rem',
            alignItems: 'start',
            gridTemplateColumns: gridCols(room.roles.length),
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
