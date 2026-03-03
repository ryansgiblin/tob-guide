import { useState } from 'react';
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';

export default function PasswordModal({ isOpen, onClose, signIn }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError('');
    const { error } = await signIn(password);
    if (error) {
      setError('Incorrect password.');
      setLoading(false);
    } else {
      setPassword('');
      onClose();
    }
  }

  function handleClose() {
    setPassword('');
    setError('');
    onClose();
  }

  return (
    <Dialog open={isOpen} onClose={handleClose} style={{ position: 'relative', zIndex: 50 }}>
      {/* Backdrop */}
      <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)' }} aria-hidden="true" />

      {/* Panel */}
      <div style={{ position: 'fixed', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
        <DialogPanel
          style={{
            background: 'var(--bg-panel)',
            border: '1px solid var(--border)',
            borderRadius: 8,
            padding: '1.5rem',
            width: '100%',
            maxWidth: 360,
          }}
        >
          <DialogTitle className="font-display text-base mb-4" style={{ color: 'var(--gold-light)' }}>
            Edit Mode
          </DialogTitle>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <input
              type="password"
              placeholder="Enter clan password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoFocus
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
                borderRadius: 4,
                padding: '0.5rem 0.75rem',
                color: 'var(--text-primary)',
                fontFamily: 'Inter, sans-serif',
                fontSize: 14,
                outline: 'none',
              }}
            />

            {error && (
              <p style={{ color: '#f87171', fontSize: 13 }}>{error}</p>
            )}

            <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
              <button
                type="button"
                onClick={handleClose}
                style={{
                  background: 'none',
                  border: '1px solid var(--border)',
                  borderRadius: 4,
                  padding: '0.4rem 0.9rem',
                  color: 'var(--text-muted)',
                  cursor: 'pointer',
                  fontSize: 13,
                }}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading || !password}
                style={{
                  background: 'var(--bg-hover)',
                  border: '1px solid var(--gold-dark)',
                  borderRadius: 4,
                  padding: '0.4rem 0.9rem',
                  color: 'var(--gold-light)',
                  cursor: loading || !password ? 'not-allowed' : 'pointer',
                  fontSize: 13,
                  opacity: loading || !password ? 0.6 : 1,
                }}
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </button>
            </div>
          </form>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
