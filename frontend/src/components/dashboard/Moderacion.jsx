import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import { API_BASE_URL } from '../../config/api';

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500&display=swap');

  :root {
    --bg: #18122B;
    --bg-soft: #231942;
    --text: #E9E4F0;
    --text-muted: #A78BFA;
    --hover: #2E1F5B;
    --active: #3B2C6D;
    --primary: #C084FC;
    --accent: #F472B6;
    --border: rgba(255,255,255,0.08);
  }

  .mod-root {
    font-family: 'DM Sans', sans-serif;
  }

  .mod-header { margin-bottom: 24px; }

  .mod-title {
    font-size: 22px;
    font-weight: 500;
    color: #0f0f13;
    margin: 0 0 4px;
  }

  .mod-sub {
    font-size: 13.5px;
    color: #6b7280;
    font-weight: 300;
    margin: 0 0 20px;
  }

  .mod-metrics {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 12px;
    margin-bottom: 28px;
  }

  .mod-metric {
    background: var(--bg);
    border-radius: 12px;
    padding: 16px 18px;
    display: flex;
    align-items: center;
    gap: 14px;
  }

  .mod-metric-icon {
    width: 36px;
    height: 36px;
    border-radius: 9px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .mod-metric-icon.amber { background: rgba(245,158,11,0.18); color: #fbbf24; }
  .mod-metric-icon.green { background: rgba(74,222,128,0.18); color: #4ade80; }
  .mod-metric-icon.red   { background: rgba(248,113,113,0.18); color: #f87171; }

  .mod-metric-val {
    font-size: 24px;
    font-weight: 500;
    color: var(--text);
    line-height: 1;
  }

  .mod-metric-label {
    font-size: 11px;
    color: var(--text-muted);
    font-weight: 300;
    text-transform: uppercase;
    letter-spacing: 0.07em;
    margin-top: 2px;
  }

  .mod-empty {
    text-align: center;
    padding: 48px 20px;
    color: #9ca3af;
    font-size: 14px;
  }

  .mod-empty-icon {
    font-size: 32px;
    margin-bottom: 10px;
    opacity: 0.4;
  }

  .cards-grid {
    display: flex;
    flex-direction: column;
    gap: 14px;
  }

  .tcard {
    background: #fff;
    border: 1px solid #eeeef5;
    border-radius: 14px;
    padding: 20px;
    transition: box-shadow 0.15s;
  }

  .tcard:hover {
    box-shadow: 0 4px 20px rgba(138,93,232,0.08);
    border-color: rgba(138,93,232,0.2);
  }

  .tcard-top {
    display: flex;
    align-items: flex-start;
    gap: 14px;
    margin-bottom: 14px;
  }

  .tcard-avatar {
    width: 42px;
    height: 42px;
    border-radius: 50%;
    object-fit: cover;
    flex-shrink: 0;
    border: 2px solid #f3f3f9;
  }

  .tcard-info { flex: 1; min-width: 0; }

  .tcard-name {
    font-size: 14px;
    font-weight: 500;
    color: #0f0f13;
    margin: 0 0 2px;
  }

  .tcard-role {
    font-size: 12px;
    color: #9ca3af;
    font-weight: 300;
    margin: 0;
  }

  .tcard-stars {
    font-size: 13px;
    letter-spacing: 1px;
  }

  .tcard-content {
    font-size: 13.5px;
    color: #4b5563;
    line-height: 1.65;
    margin-bottom: 14px;
    padding: 12px 14px;
    background: #f9f9fc;
    border-radius: 8px;
    border-left: 3px solid #8A5DE8;
  }

  .tcard-media {
    width: 100%;
  aspect-ratio: 16/9;
  overflow: hidden;
  border-radius: 8px;
  margin-top: 8px;
  margin-bottom: 12px;
  }

  .tcard-media img {
    width: 100%;
  height: 100%;
  object-fit: cover;
  }

  .tcard-media iframe {
    width: 100%;
  height: 100%;
  border: none;
  }

  .tcard-actions {
    display: flex;
    gap: 8px;
  }

  .btn {
    flex: 1;
    padding: 8px 12px;
    border-radius: 8px;
    font-size: 12.5px;
    font-weight: 500;
    cursor: pointer;
    border: none;
    transition: all 0.15s;
    font-family: 'DM Sans', sans-serif;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
  }

  .btn-approve {
    background: #dcfce7;
    color: #15803d;
  }
  .btn-approve:hover { background: #bbf7d0; }

  .btn-edit {
    background: #f3f4f6;
    color: #374151;
  }
  .btn-edit:hover { background: #e5e7eb; }

  .btn-reject {
    background: #fef3c7;
    color: #92400e;
  }
  .btn-reject:hover { background: #fde68a; }

  .btn-delete {
    background: #fee2e2;
    color: #991b1b;
  }
  .btn-delete:hover { background: #fecaca; }
`;

export function Moderacion() {
  const navigate = useNavigate();
  const [testimonios, setTestimonios] = useState([]);

  const pendientes = testimonios.filter(t => t.status === 'PENDING');
  const aprobados  = testimonios.filter(t => t.status === 'PUBLISHED');
  const rechazados = testimonios.filter(t => t.status === 'REJECTED');

  const aprobar = async (id) => {
    const token = localStorage.getItem('token');
    try {
      const res = await fetch(`${API_BASE_URL}/api/testimonials/approve/${id}`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        setTestimonios(prev => prev.map(t => t.id === id ? { ...t, status: 'PUBLISHED' } : t));
      }
    } catch (e) { console.error(e); }
  };

  const rechazar = async (id) => {
    const token = localStorage.getItem('token');
    try {
      const res = await fetch(`${API_BASE_URL}/api/testimonials/reject/${id}`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        setTestimonios(prev => prev.map(t => t.id === id ? { ...t, status: 'REJECTED' } : t));
      }
    } catch (e) { console.error(e); }
  };

  const eliminar = async (id) => {
    const confirm = await Swal.fire({
      title: '¿Eliminar testimonio?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    });
    if (!confirm.isConfirmed) return;

    const token = localStorage.getItem('token');
    try {
      const res = await fetch(`${API_BASE_URL}/api/testimonials/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        setTestimonios(prev => prev.filter(t => t.id !== id));
      }
    } catch (e) { console.error(e); }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    const load = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/testimonials/search?status=PENDING`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (Array.isArray(data)) setTestimonios(data);
        else if (Array.isArray(data.content)) setTestimonios(data.content);
        else setTestimonios([]);
      } catch (e) { console.error(e); }
    };
    load();
  }, []);

  const Card = ({ data }) => (
    <div className="tcard">
      <div className="tcard-top">
        <img
          src={data.imagen || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face'}
          alt="avatar"
          className="tcard-avatar"
        />
        <div className="tcard-info">
          <p className="tcard-name">{data.authorName || `${data.firstName} ${data.surname}`}</p>
          <p className="tcard-role">{data.authorRole}</p>
        </div>
        <div className="tcard-stars">
          {'⭐'.repeat(data.rating || 0)}
        </div>
      </div>

      <div className="tcard-content">
        {data.content || data.comentario}
      </div>

      {data.mediaAssets?.map((media, i) => {
        if (media.provider === 'CLOUDINARY') {
          return (
            <div key={i} className="tcard-media">
              <img src={media.url} alt="media" />
            </div>
          );
        }
        if (media.provider === 'YOUTUBE') {
          const videoId = media.url.split('v=')[1]?.split('&')[0];
          return (
            <div key={i} className="tcard-media">
              <iframe
                src={`https://www.youtube.com/embed/${videoId}`}
                allowFullScreen
                title="youtube"
              />
            </div>
          );
        }
        return null;
      })}

      <div className="tcard-actions">
        <button className="btn btn-approve" onClick={() => aprobar(data.id)}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
          Aprobar
        </button>
        <button className="btn btn-edit" onClick={() => navigate(`/dashboard/testimonio/editar/${data.id}`)}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
          </svg>
          Editar
        </button>
        <button className="btn btn-reject" onClick={() => rechazar(data.id)}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/>
          </svg>
          Rechazar
        </button>
        <button className="btn btn-delete" onClick={() => eliminar(data.id)}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6M14 11v6"/>
          </svg>
          Eliminar
        </button>
      </div>
    </div>
  );

  return (
    <>
      <style>{styles}</style>
      <div className="mod-root">
        <div className="mod-header">
          <h1 className="mod-title">Panel de Moderación</h1>
          <p className="mod-sub">Revisá y aprobá testimonios antes de su publicación</p>

          <div className="mod-metrics">
            <div className="mod-metric">
              <div className="mod-metric-icon amber">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                </svg>
              </div>
              <div>
                <div className="mod-metric-val">{pendientes.length}</div>
                <div className="mod-metric-label">Pendientes</div>
              </div>
            </div>
            <div className="mod-metric">
              <div className="mod-metric-icon green">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              </div>
              <div>
                <div className="mod-metric-val">{aprobados.length}</div>
                <div className="mod-metric-label">Aprobados</div>
              </div>
            </div>
            <div className="mod-metric">
              <div className="mod-metric-icon red">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </div>
              <div>
                <div className="mod-metric-val">{rechazados.length}</div>
                <div className="mod-metric-label">Rechazados</div>
              </div>
            </div>
          </div>
        </div>

        {pendientes.length === 0 ? (
          <div className="mod-empty">
            <div className="mod-empty-icon">✅</div>
            <p>No hay testimonios pendientes por revisar</p>
          </div>
        ) : (
          <div className="cards-grid">
            {pendientes.map(t => <Card key={t.id} data={t} />)}
          </div>
        )}
      </div>
    </>
  );
}

export default Moderacion;
