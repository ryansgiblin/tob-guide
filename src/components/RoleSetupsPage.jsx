export default function RoleSetupsPage() {
  return (
    <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem 2rem' }}>
      <h1
        className="font-display font-bold text-lg mb-1"
        style={{ color: 'var(--gold)', letterSpacing: '0.05em' }}
      >
        Role Setups
      </h1>
      <p className="text-xs mb-4" style={{ color: 'var(--text-dim)' }}>
        Gear and inventory layouts for all 4 roles — 4s Max Efficiency
      </p>

      <img
        src="/assets/setup-inventories.png"
        alt="Role setup inventories"
        style={{ maxWidth: '100%', borderRadius: 6, border: '1px solid var(--border)', display: 'block' }}
      />
    </div>
  );
}
