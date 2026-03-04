import { Dialog, DialogPanel } from '@headlessui/react';

function isYouTube(url) {
  return url && (url.includes('youtube.com') || url.includes('youtu.be'));
}

function toEmbedUrl(url) {
  const shortMatch = url.match(/youtu\.be\/([^?&]+)/);
  if (shortMatch) return `https://www.youtube.com/embed/${shortMatch[1]}?autoplay=1`;
  const longMatch = url.match(/[?&]v=([^&]+)/);
  if (longMatch) return `https://www.youtube.com/embed/${longMatch[1]}?autoplay=1`;
  return url;
}

// Modal video player supporting both YouTube URLs and direct MP4/video file URLs.
// Props: url (string|null) — pass null to close, onClose — callback
export default function MediaModal({ url, onClose }) {
  const youtube = url && isYouTube(url);

  return (
    <Dialog open={!!url} onClose={onClose} style={{ position: 'relative', zIndex: 50 }}>
      <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)' }} aria-hidden="true" />

      <div style={{ position: 'fixed', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
        <DialogPanel
          style={{
            background: '#000',
            border: '1px solid var(--border)',
            borderRadius: 8,
            width: '100%',
            maxWidth: 840,
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <button
            onClick={onClose}
            style={{
              position: 'absolute', top: 8, right: 8, zIndex: 1,
              background: 'rgba(0,0,0,0.6)', border: '1px solid var(--border)',
              borderRadius: 4, color: '#fff', cursor: 'pointer',
              fontSize: 13, padding: '2px 8px',
            }}
          >
            ✕
          </button>

          <div style={{ width: '100%', aspectRatio: '16/9' }}>
            {youtube ? (
              <iframe
                src={toEmbedUrl(url)}
                title="Video"
                width="100%"
                height="100%"
                allow="autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
                style={{ border: 'none', display: 'block' }}
              />
            ) : (
              <video
                controls
                autoPlay
                style={{ width: '100%', height: '100%', display: 'block' }}
              >
                <source src={url} />
              </video>
            )}
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
