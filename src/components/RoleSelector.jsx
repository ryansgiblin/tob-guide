// Pill-style button row to switch between roles
export default function RoleSelector({ roles = [], activeId, onChange }) {
  return (
    <div className="flex flex-wrap gap-2">
      {roles.map((role) => (
        <button
          key={role.id}
          className={`role-btn px-4 py-1.5 rounded text-sm font-medium ${activeId === role.id ? 'active' : ''}`}
          onClick={() => onChange(role.id)}
        >
          {role.name}
        </button>
      ))}
    </div>
  );
}
