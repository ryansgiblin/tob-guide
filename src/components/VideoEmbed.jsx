// Renders a YouTube iframe embed or a gif/image
export default function VideoEmbed({ video, className = '' }) {
  if (!video) return null;

  if (video.type === 'youtube') {
    return (
      <div className={`relative ${className}`} style={{ paddingBottom: '56.25%', height: 0 }}>
        <iframe
          className="absolute inset-0 w-full h-full rounded"
          src={`https://www.youtube.com/embed/${video.id}`}
          title={video.label || 'TOB video'}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  }

  if (video.type === 'gif' || video.type === 'image') {
    return (
      <div className={className}>
        <img
          src={video.src}
          alt={video.label || 'TOB example'}
          className="w-full rounded border"
          style={{ borderColor: 'var(--border)' }}
        />
        {video.label && (
          <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>{video.label}</p>
        )}
      </div>
    );
  }

  return null;
}
