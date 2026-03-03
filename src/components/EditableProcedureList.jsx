import { useRef, useState } from 'react';
import { supabase } from '../lib/supabase';

const UpIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 15l-6-6-6 6"/></svg>
);
const DownIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M6 9l6 6 6-6"/></svg>
);
const ImageIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/>
  </svg>
);

export default function EditableProcedureList({ steps, roomId, roleId, setSaveStatus, onDataChange }) {
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [uploading, setUploading] = useState(null);
  const fileInputRefs = useRef({});

  async function handleSaveField(stepId, field, value) {
    setSaveStatus('saving');
    const { error } = await supabase.from('steps').update({ [field]: value }).eq('id', stepId);
    setSaveStatus(error ? 'error' : 'saved');
    setTimeout(() => setSaveStatus('idle'), 2000);
  }

  async function handleUploadImage(stepId, file) {
    if (!file) return;
    setUploading(stepId);
    setSaveStatus('saving');

    const ext = file.name.split('.').pop();
    const path = `steps/${stepId}-${Date.now()}.${ext}`;

    const { error: uploadError } = await supabase.storage
      .from('step-media')
      .upload(path, file, { contentType: file.type });

    if (uploadError) {
      console.error('Storage upload error:', uploadError);
      setSaveStatus('error');
      setTimeout(() => setSaveStatus('idle'), 2000);
      setUploading(null);
      return;
    }

    const { data: { publicUrl } } = supabase.storage.from('step-media').getPublicUrl(path);

    const { error: dbError } = await supabase.from('steps').update({ image: publicUrl }).eq('id', stepId);
    setSaveStatus(dbError ? 'error' : 'saved');
    setTimeout(() => setSaveStatus('idle'), 2000);
    setUploading(null);
    if (!dbError) onDataChange();
  }

  async function handleRemoveImage(stepId) {
    setSaveStatus('saving');
    const { error } = await supabase.from('steps').update({ image: null }).eq('id', stepId);
    setSaveStatus(error ? 'error' : 'saved');
    setTimeout(() => setSaveStatus('idle'), 2000);
    if (!error) onDataChange();
  }

  async function handleAddStep() {
    const maxOrder = steps.reduce((m, s) => Math.max(m, s.sort_order), -10);
    setSaveStatus('saving');
    const { error } = await supabase.from('steps').insert({
      room_id: roomId,
      role_id: roleId,
      step_number: steps.length + 1,
      sort_order: maxOrder + 10,
      text: '',
      tip: '',
    });
    setSaveStatus(error ? 'error' : 'saved');
    setTimeout(() => setSaveStatus('idle'), 2000);
    if (!error) onDataChange();
  }

  async function handleDeleteStep(stepId) {
    setSaveStatus('saving');
    const { error } = await supabase.from('steps').delete().eq('id', stepId);
    setConfirmDelete(null);
    setSaveStatus(error ? 'error' : 'saved');
    setTimeout(() => setSaveStatus('idle'), 2000);
    if (!error) onDataChange();
  }

  async function handleMove(index, direction) {
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= steps.length) return;
    const a = steps[index];
    const b = steps[targetIndex];
    setSaveStatus('saving');
    await supabase.from('steps').update({ sort_order: b.sort_order }).eq('id', a.id);
    await supabase.from('steps').update({ sort_order: a.sort_order }).eq('id', b.id);
    setSaveStatus('saved');
    setTimeout(() => setSaveStatus('idle'), 2000);
    onDataChange();
  }

  return (
    <div>
      <ol style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {steps.map((step, i) => (
          <li key={step.id} className="step-card" style={{ paddingLeft: '0.75rem', paddingRight: '0.5rem', paddingTop: '0.5rem', paddingBottom: '0.5rem' }}>
            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
              {/* Step number */}
              <span
                style={{
                  minWidth: 22, height: 22, borderRadius: '50%',
                  background: 'var(--gold-dark)', color: '#0d0d0f',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 11, fontWeight: 700, flexShrink: 0, marginTop: 2,
                }}
              >
                {i + 1}
              </span>

              {/* Text + Tip + Image */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div
                  contentEditable
                  suppressContentEditableWarning
                  data-placeholder="Step text..."
                  onBlur={(e) => handleSaveField(step.id, 'text', e.currentTarget.textContent.trim())}
                  style={{ fontSize: 13, color: 'var(--text-primary)', lineHeight: 1.6, wordBreak: 'break-word' }}
                >
                  {step.text}
                </div>

                <div
                  contentEditable
                  suppressContentEditableWarning
                  data-placeholder="Add a tip (optional)..."
                  onBlur={(e) => handleSaveField(step.id, 'tip', e.currentTarget.textContent.trim())}
                  className="tip-callout"
                  style={{ fontSize: 12, color: 'var(--gold-dark)', marginTop: '0.35rem', padding: '0.3rem 0.5rem', minHeight: 24, lineHeight: 1.5 }}
                >
                  {step.tip}
                </div>

                {/* Image preview or upload button */}
                {step.image ? (
                  <div style={{ marginTop: '0.5rem', position: 'relative', display: 'inline-block' }}>
                    <img
                      src={step.image}
                      alt="Step visual"
                      style={{ maxWidth: '100%', maxHeight: 200, borderRadius: 4, border: '1px solid var(--border)', display: 'block' }}
                    />
                    <button
                      onClick={() => handleRemoveImage(step.id)}
                      title="Remove image"
                      style={{
                        position: 'absolute', top: 4, right: 4,
                        background: 'rgba(0,0,0,0.7)', border: 'none', borderRadius: 3,
                        color: '#f87171', cursor: 'pointer', fontSize: 11, padding: '2px 5px',
                      }}
                    >
                      ✕
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => fileInputRefs.current[step.id]?.click()}
                    disabled={uploading === step.id}
                    style={{
                      marginTop: '0.4rem',
                      display: 'inline-flex', alignItems: 'center', gap: 4,
                      background: 'none', border: '1px dashed var(--border)',
                      borderRadius: 3, padding: '2px 8px',
                      color: 'var(--text-dim)', cursor: 'pointer', fontSize: 11,
                      opacity: uploading === step.id ? 0.5 : 1,
                    }}
                  >
                    <ImageIcon />
                    {uploading === step.id ? 'Uploading...' : 'Add image'}
                  </button>
                )}
                <input
                  type="file"
                  accept="image/*"
                  style={{ display: 'none' }}
                  ref={(el) => { fileInputRefs.current[step.id] = el; }}
                  onChange={(e) => { handleUploadImage(step.id, e.target.files[0]); e.target.value = ''; }}
                />
              </div>

              {/* Controls */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 2, flexShrink: 0 }}>
                <button
                  onClick={() => handleMove(i, -1)}
                  disabled={i === 0}
                  title="Move up"
                  style={{ background: 'none', border: 'none', color: 'var(--text-dim)', cursor: i === 0 ? 'not-allowed' : 'pointer', padding: 2, opacity: i === 0 ? 0.3 : 1 }}
                >
                  <UpIcon />
                </button>
                <button
                  onClick={() => handleMove(i, 1)}
                  disabled={i === steps.length - 1}
                  title="Move down"
                  style={{ background: 'none', border: 'none', color: 'var(--text-dim)', cursor: i === steps.length - 1 ? 'not-allowed' : 'pointer', padding: 2, opacity: i === steps.length - 1 ? 0.3 : 1 }}
                >
                  <DownIcon />
                </button>
                {confirmDelete === step.id ? (
                  <button
                    onClick={() => handleDeleteStep(step.id)}
                    title="Confirm delete"
                    style={{ background: 'none', border: 'none', color: '#f87171', cursor: 'pointer', padding: 2, fontSize: 11 }}
                  >
                    ✓
                  </button>
                ) : (
                  <button
                    onClick={() => setConfirmDelete(step.id)}
                    title="Delete step"
                    style={{ background: 'none', border: 'none', color: 'var(--text-dim)', cursor: 'pointer', padding: 2, fontSize: 13 }}
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>
          </li>
        ))}
      </ol>

      <button
        onClick={handleAddStep}
        style={{
          marginTop: '0.75rem',
          width: '100%',
          padding: '0.4rem',
          background: 'none',
          border: '1px dashed var(--border)',
          borderRadius: 4,
          color: 'var(--text-dim)',
          cursor: 'pointer',
          fontSize: 12,
          transition: 'border-color 0.15s, color 0.15s',
        }}
        onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--gold-dark)'; e.currentTarget.style.color = 'var(--gold-dark)'; }}
        onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-dim)'; }}
      >
        + Add Step
      </button>
    </div>
  );
}
