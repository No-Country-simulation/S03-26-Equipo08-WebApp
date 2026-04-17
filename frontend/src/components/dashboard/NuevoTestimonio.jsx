import { useState, useEffect } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router';
import toast, { Toaster } from 'react-hot-toast';
import Swal from 'sweetalert2';
import { API_BASE_URL } from '../../config/api';

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500&display=swap');

  .nt-root {
    font-family: 'DM Sans', sans-serif;
    max-width: 680px;
  }

  .nt-header { margin-bottom: 28px; }

  .nt-title {
    font-size: 22px;
    font-weight: 500;
    color: #0f0f13;
    margin: 0 0 4px;
  }

  .nt-sub {
    font-size: 13.5px;
    color: #6b7280;
    font-weight: 300;
    margin: 0;
  }

  .nt-form { display: flex; flex-direction: column; gap: 20px; }

  .nt-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 14px;
  }

  .nt-field { display: flex; flex-direction: column; gap: 6px; }

  .nt-label {
    font-size: 12px;
    font-weight: 500;
    color: #374151;
    text-transform: uppercase;
    letter-spacing: 0.06em;
  }

  .nt-input, .nt-textarea, .nt-select {
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    color: #0f0f13;
    background: #fff;
    border: 1.5px solid #e5e7eb;
    border-radius: 9px;
    padding: 10px 14px;
    outline: none;
    transition: border-color 0.15s, box-shadow 0.15s;
    width: 100%;
    box-sizing: border-box;
  }

  .nt-input:focus, .nt-textarea:focus, .nt-select:focus {
    border-color: #8A5DE8;
    box-shadow: 0 0 0 3px rgba(138,93,232,0.1);
  }

  .nt-textarea {
    resize: vertical;
    min-height: 100px;
    line-height: 1.6;
  }

  .nt-select { cursor: pointer; }

  .dropzone {
    border: 2px dashed #d1d5db;
    border-radius: 10px;
    padding: 28px;
    text-align: center;
    cursor: pointer;
    transition: border-color 0.15s, background 0.15s;
  }

  .dropzone:hover {
    border-color: #8A5DE8;
    background: rgba(138,93,232,0.03);
  }

  .dropzone-icon {
    font-size: 24px;
    margin-bottom: 8px;
    opacity: 0.5;
  }

  .dropzone-label {
    font-size: 13.5px;
    color: #6b7280;
    font-weight: 400;
  }

  .dropzone-sub {
    font-size: 12px;
    color: #9ca3af;
    margin-top: 2px;
  }

  .preview-img {
    width: 120px;
    height: 80px;
    object-fit: cover;
    border-radius: 8px;
    border: 1px solid #e5e7eb;
  }

  .preview-video {
    max-width: 280px;
    max-height: 160px;
    border-radius: 8px;
  }

  .yt-row {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .yt-item { display: flex; flex-direction: column; gap: 6px; }

  .yt-input-row {
    display: flex;
    gap: 8px;
    align-items: center;
  }

  .yt-preview {
    border-radius: 8px;
    overflow: hidden;
    margin-top: 4px;
  }

  .yt-preview iframe {
    width: 100%;
    height: 180px;
  }

  .btn-yt-remove {
    background: #fee2e2;
    color: #991b1b;
    border: none;
    border-radius: 7px;
    padding: 8px 12px;
    font-size: 12px;
    cursor: pointer;
    font-family: 'DM Sans', sans-serif;
    white-space: nowrap;
    transition: background 0.12s;
  }
  .btn-yt-remove:hover { background: #fecaca; }

  .btn-yt-add {
    background: #f3f4f6;
    color: #374151;
    border: none;
    border-radius: 7px;
    padding: 8px 14px;
    font-size: 13px;
    cursor: pointer;
    font-family: 'DM Sans', sans-serif;
    display: flex;
    align-items: center;
    gap: 5px;
    transition: background 0.12s;
    align-self: flex-start;
  }
  .btn-yt-add:hover { background: #e5e7eb; }

  .stars-row {
    display: flex;
    align-items: center;
    gap: 4px;
  }

  .star {
    font-size: 22px;
    cursor: pointer;
    filter: grayscale(1);
    opacity: 0.35;
    transition: filter 0.1s, opacity 0.1s, transform 0.1s;
    user-select: none;
  }

  .star.active {
    filter: none;
    opacity: 1;
  }

  .star:hover {
    transform: scale(1.15);
  }

  .stars-label {
    font-size: 13px;
    color: #9ca3af;
    margin-left: 8px;
  }

  .nt-notice {
    display: flex;
    align-items: flex-start;
    gap: 8px;
    background: #fefce8;
    border: 1px solid #fde68a;
    border-radius: 8px;
    padding: 10px 14px;
    font-size: 13px;
    color: #92400e;
  }

  .btn-submit {
    background: #8A5DE8;
    color: #fff;
    border: none;
    border-radius: 10px;
    padding: 13px 28px;
    font-size: 14px;
    font-weight: 500;
    font-family: 'DM Sans', sans-serif;
    cursor: pointer;
    transition: background 0.15s, transform 0.1s;
    width: 100%;
  }

  .btn-submit:hover { background: #7c4fe0; }
  .btn-submit:active { transform: scale(0.99); }

  .section-divider {
    font-size: 11px;
    font-weight: 500;
    color: #9ca3af;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .section-divider::after {
    content: '';
    flex: 1;
    height: 1px;
    background: #f0f0f5;
  }
`;

export function NuevoTestimonio() {
  const navigate = useNavigate();
  const { id } = useParams();
  const esAdmin = localStorage.getItem('role') === 'admin';

  const [imagen, setImagen] = useState(null);
  const [video, setVideo] = useState(null);
  const [files, setFiles] = useState([]);
  const [urls, setUrls] = useState(['']);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  const [firstName, setFirstName] = useState('');
  const [surname, setSurname] = useState('');
  const [rol, setRol] = useState('');
  const [organizacion, setOrganizacion] = useState('');
  const [comentario, setComentario] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [categorias, setCategorias] = useState([]);

  const getVideoId = (url) => {
    const m = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&]+)/);
    return m ? m[1] : null;
  };

  const handleFile = (file) => {
    if (!file) return;
    setFiles(prev => [...prev, file]);
    if (file.type.startsWith('image/')) setImagen(URL.createObjectURL(file));
    else if (file.type.startsWith('video/')) setVideo(URL.createObjectURL(file));
  };

  const archivosCloudinary = async (id) => {
    if (files.length === 0) return;
    const token = localStorage.getItem('token');
    const formData = new FormData();
    files.forEach(f => formData.append('files', f));
    await fetch(`${API_BASE_URL}/api/media/upload-batch/${id}`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });
  };

  const videosYoutube = async (id) => {
    const token = localStorage.getItem('token');
    const validas = urls.filter(u => u.trim() !== '');
    if (validas.length === 0) return;
    await fetch(`${API_BASE_URL}/api/media/youtube-batch/${id}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ videos: validas.map(u => ({ youtubeUrl: u })) }),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const usuario = JSON.parse(localStorage.getItem('user'));

    if (!firstName || !surname || !rol || !organizacion || !comentario) {
      toast.error('Faltan campos que completar');
      return;
    }
    if (!categoryId) { toast.error('Debes seleccionar una categoría'); return; }
    if (!usuario) { toast.error('Debes iniciar sesión'); navigate('/'); return; }

    try {
      const url = id ? `${API_BASE_URL}/api/testimonials/${id}` : `${API_BASE_URL}/api/testimonials`;
      const method = id ? 'PUT' : 'POST';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          content: comentario,
          authorName: `${firstName} ${surname}`,
          authorRole: rol,
          rating,
          categoryId: Number(categoryId),
          tagIds: [],
        }),
      });
      if (!res.ok) return;
      const data = await res.json();
      await archivosCloudinary(data.id);
      await videosYoutube(data.id);

      Swal.fire({ title: id ? 'Testimonio Editado' : 'Testimonio Creado', icon: 'success' }).then(() => {
        navigate(esAdmin ? '/dashboard/moderacion' : '/dashboard');
      });
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    const load = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/categories?type=APPROVED`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setCategorias(data.content || []);
      } catch (e) { console.error(e); }
    };
    load();
  }, []);

  useEffect(() => {
    if (!id) return;
    const token = localStorage.getItem('token');
    const load = async () => {
      const res = await fetch(`${API_BASE_URL}/api/testimonials/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setComentario(data.content);
      const [n, a] = data.authorName.split(' ');
      setFirstName(n || '');
      setSurname(a || '');
      setRol(data.authorRole);
      setRating(data.rating);
      setCategoryId(data.category?.id);
    };
    load();
  }, [id]);

  return (
    <>
      <style>{styles}</style>
      <Toaster />
      <div className="nt-root">
        <div className="nt-header">
          <h1 className="nt-title">{id ? 'Editar Testimonio' : 'Nuevo Testimonio'}</h1>
          <p className="nt-sub">{id ? 'Modificá los datos del testimonio' : 'Completá el formulario para agregar un nuevo testimonio'}</p>
        </div>

        <form onSubmit={handleSubmit} className="nt-form">
          {/* Autor */}
          <div className="section-divider">Información del autor</div>

          <div className="nt-row">
            <div className="nt-field">
              <label className="nt-label">Nombre</label>
              <input className="nt-input" value={firstName} onChange={e => setFirstName(e.target.value)} placeholder="Juan" />
            </div>
            <div className="nt-field">
              <label className="nt-label">Apellido</label>
              <input className="nt-input" value={surname} onChange={e => setSurname(e.target.value)} placeholder="Pérez" />
            </div>
          </div>

          <div className="nt-row">
            <div className="nt-field">
              <label className="nt-label">Cargo / Rol</label>
              <input className="nt-input" value={rol} onChange={e => setRol(e.target.value)} placeholder="CEO" />
            </div>
            <div className="nt-field">
              <label className="nt-label">Empresa / Organización</label>
              <input className="nt-input" value={organizacion} onChange={e => setOrganizacion(e.target.value)} placeholder="Acme Inc." />
            </div>
          </div>

          {/* Contenido */}
          <div className="section-divider">Testimonio</div>

          <div className="nt-field">
            <label className="nt-label">Comentario</label>
            <textarea className="nt-textarea" value={comentario} onChange={e => setComentario(e.target.value)} placeholder="Escribí tu experiencia..." />
          </div>

          <div className="nt-field">
            <label className="nt-label">Categoría</label>
            <select className="nt-select" value={categoryId} onChange={e => setCategoryId(e.target.value)}>
              <option value="">Seleccionar categoría</option>
              {categorias.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>

          {/* Rating */}
          <div className="nt-field">
            <label className="nt-label">Calificación</label>
            <div className="stars-row">
              {[1, 2, 3, 4, 5].map(star => (
                <span
                  key={star}
                  className={`star${(hover || rating) >= star ? ' active' : ''}`}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHover(star)}
                  onMouseLeave={() => setHover(0)}
                >⭐</span>
              ))}
              <span className="stars-label">{rating > 0 ? `${rating}/5` : 'Sin calificar'}</span>
            </div>
          </div>

          {/* Media */}
          <div className="section-divider">Archivos multimedia</div>

          <div className="nt-field">
            <label className="nt-label">Imágenes o videos</label>
            <label
              className="dropzone"
              onDrop={e => { e.preventDefault(); handleFile(e.dataTransfer.files[0]); }}
              onDragOver={e => e.preventDefault()}
            >
              <div className="dropzone-icon">📁</div>
              <div className="dropzone-label">Arrastrá o hacé click para subir</div>
              <div className="dropzone-sub">Imagen o video</div>
              <input type="file" accept="image/*,video/*" onChange={e => handleFile(e.target.files[0])} style={{ display: 'none' }} />
            </label>
            {imagen && <img src={imagen} className="preview-img" alt="preview" />}
            {video && <video controls className="preview-video"><source src={video} /></video>}
          </div>

          <div className="nt-field">
            <label className="nt-label">Videos de YouTube</label>
            <div className="yt-row">
              {urls.map((u, i) => {
                const vid = getVideoId(u);
                return (
                  <div key={i} className="yt-item">
                    <div className="yt-input-row">
                      <input
                        className="nt-input"
                        placeholder="https://youtube.com/watch?v=..."
                        value={u}
                        onChange={e => {
                          const n = [...urls];
                          n[i] = e.target.value;
                          setUrls(n);
                        }}
                      />
                      {urls.length > 1 && (
                        <button type="button" className="btn-yt-remove" onClick={() => setUrls(urls.filter((_, j) => j !== i))}>
                          Eliminar
                        </button>
                      )}
                    </div>
                    {vid && (
                      <div className="yt-preview">
                        <iframe src={`https://www.youtube.com/embed/${vid}`} allowFullScreen title="yt" />
                      </div>
                    )}
                  </div>
                );
              })}
              <button type="button" className="btn-yt-add" onClick={() => setUrls([...urls, ''])}>
                + Agregar otro video
              </button>
            </div>
          </div>

          {/* Notice */}
          {!esAdmin && (
            <div className="nt-notice">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 1 }}>
                <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
              Tu testimonio será revisado por un moderador antes de publicarse.
            </div>
          )}

          <button type="submit" className="btn-submit">
            {esAdmin ? 'Publicar testimonio' : 'Enviar testimonio'}
          </button>
        </form>
      </div>
    </>
  );
}

export default NuevoTestimonio;
