import { useEffect, useState } from 'react';
import { API_BASE_URL } from '../../config/api';

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500&family=JetBrains+Mono:wght@400;500&display=swap');

  .emb-root { font-family: 'DM Sans', sans-serif; }

  .emb-title {
    font-size: 22px;
    font-weight: 500;
    color: #0f0f13;
    margin: 0 0 4px;
  }

  .emb-sub {
    font-size: 13.5px;
    color: #6b7280;
    font-weight: 300;
    margin: 0 0 28px;
  }

  .emb-section { margin-bottom: 28px; }

  .emb-section-title {
    font-size: 12px;
    font-weight: 500;
    color: #374151;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    margin: 0 0 10px;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .emb-section-title::after {
    content: '';
    flex: 1;
    height: 1px;
    background: #f0f0f5;
  }

  .code-block {
    background: #0f0f13;
    border-radius: 10px;
    padding: 16px 18px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 12.5px;
    color: #4ade80;
    line-height: 1.7;
    overflow-x: auto;
    border: 1px solid rgba(255,255,255,0.05);
    margin-bottom: 10px;
    white-space: pre;
  }

  .copy-row {
    display: flex;
    justify-content: flex-end;
    margin-top: -4px;
    margin-bottom: 14px;
  }

  .btn-copy {
    background: #f3f4f6;
    color: #374151;
    border: none;
    border-radius: 7px;
    padding: 5px 12px;
    font-size: 12px;
    font-family: 'DM Sans', sans-serif;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 5px;
    transition: background 0.12s;
  }
  .btn-copy:hover { background: #e5e7eb; }
  .btn-copy.copied { background: #dcfce7; color: #15803d; }

  .preview-title {
    font-size: 14px;
    font-weight: 500;
    color: #0f0f13;
    margin: 0 0 14px;
  }

  .preview-grid {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .preview-card {
    background: #fff;
    border: 1px solid #eeeef5;
    border-radius: 12px;
    padding: 16px;
    transition: box-shadow 0.15s;
  }

  .preview-card:hover {
    box-shadow: 0 2px 12px rgba(138,93,232,0.07);
    border-color: rgba(138,93,232,0.2);
  }

  .preview-card-name {
    font-size: 14px;
    font-weight: 500;
    color: #0f0f13;
    margin-bottom: 2px;
  }

  .preview-card-content {
    font-size: 13.5px;
    color: #4b5563;
    line-height: 1.6;
    margin: 8px 0;
  }

  .preview-card-rating {
    font-size: 12px;
    color: #6b7280;
  }

  .preview-card-media {
  width: 100%;
  aspect-ratio: 16/9;
  overflow: hidden;
  border-radius: 8px;
  margin-top: 8px;
  }

  .preview-card-media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  }

  .preview-card-media iframe {
  width: 100%;
  height: 100%;
  border: none;
  }

  .empty-preview {
    text-align: center;
    color: #9ca3af;
    font-size: 13.5px;
    padding: 32px;
    background: #fafafa;
    border-radius: 12px;
  }
`;

function CopyBlock({ code }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };
  return (
    <>
      <div className="code-block">{code}</div>
      <div className="copy-row">
        <button className={`btn-copy${copied ? ' copied' : ''}`} onClick={handleCopy}>
          {copied ? (
            <>
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
              Copiado
            </>
          ) : (
            <>
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
              </svg>
              Copiar
            </>
          )}
        </button>
      </div>
    </>
  );
}

export function Embeds() {
  const [testimoniosApi, setTestimoniosApi] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const load = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/testimonials/search?status=PUBLISHED`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) return;
        const data = await res.json();
        if (Array.isArray(data)) setTestimoniosApi(data);
        else if (Array.isArray(data.content)) setTestimoniosApi(data.content);
      } catch (e) { console.error(e); }
    };
    load();
  }, []);

  return (
    <>
      <style>{styles}</style>
      <div className="emb-root">
        <h1 className="emb-title">Embeds e Integración</h1>
        <p className="emb-sub">Integrá testimonios en tu sitio web con estos snippets</p>

        <div className="emb-section">
          <p className="emb-section-title">Endpoint</p>
          <CopyBlock code={`GET ${API_BASE_URL}/api/testimonials/search?status=PUBLISHED`} />
        </div>

        <div className="emb-section">
          <p className="emb-section-title">Fetch con JavaScript</p>
          <CopyBlock code={`fetch("${API_BASE_URL}/api/testimonials/search?status=PUBLISHED")
  .then(res => res.json())
  .then(data => console.log(data));`} />
        </div>

        <div className="emb-section">
          <p className="emb-section-title">Ejemplo de respuesta</p>
          <CopyBlock code={`[
  {
    "id": 1,
    "authorName": "Juan Pérez",
    "content": "Muy buen servicio",
    "rating": 5
  }
]`} />
        </div>

        <div className="emb-section">
          <p className="emb-section-title">Vista real (API)</p>
          {testimoniosApi.length === 0 ? (
            <div className="empty-preview">No hay testimonios aprobados para mostrar</div>
          ) : (
            <div className="preview-grid">
              {testimoniosApi.map(t => (
                <div key={t.id} className="preview-card">
                  <div className="preview-card-name">{t.authorName}</div>
                  <div className="preview-card-content">{t.content}</div>
                  <div className="preview-card-rating">{'⭐'.repeat(t.rating || 0)} {t.rating}/5</div>
                  {t.mediaAssets?.map((m, i) => {
                    if (m.provider === 'CLOUDINARY') return (
                      <div key={i} className="preview-card-media"><img src={m.url} alt="media" /></div>
                    );
                    if (m.provider === 'YOUTUBE') {
                      const vid = m.url.split('v=')[1]?.split('&')[0];
                      return (
                        <div key={i} className="preview-card-media">
                          <iframe src={`https://www.youtube.com/embed/${vid}`} allowFullScreen title="yt" />
                        </div>
                      );
                    }
                    return null;
                  })}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Embeds;
