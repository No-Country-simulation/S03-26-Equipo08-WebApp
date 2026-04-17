import { useState, useEffect } from 'react';
import { NavLink } from 'react-router';
import { API_BASE_URL } from '../../config/api';

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500&display=swap');

  .ts-root { font-family: 'DM Sans', sans-serif; }

  .ts-header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    margin-bottom: 22px;
  }

  .ts-title {
    font-size: 22px;
    font-weight: 500;
    color: #0f0f13;
    margin: 0 0 4px;
  }

  .ts-sub {
    font-size: 13.5px;
    color: #6b7280;
    font-weight: 300;
    margin: 0;
  }

  .btn-new {
    background: #8A5DE8;
    color: #fff;
    border: none;
    border-radius: 9px;
    padding: 10px 18px;
    font-size: 13px;
    font-weight: 500;
    font-family: 'DM Sans', sans-serif;
    cursor: pointer;
    text-decoration: none;
    display: flex;
    align-items: center;
    gap: 6px;
    white-space: nowrap;
    transition: background 0.15s;
  }
  .btn-new:hover { background: #7c4fe0; }

  .ts-filters {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
  }

  .ts-search {
    flex: 1;
    position: relative;
  }

  .ts-search-icon {
    position: absolute;
    left: 12px;
    top: 50%;
    transform: translateY(-50%);
    color: #9ca3af;
    font-size: 14px;
    pointer-events: none;
  }

  .ts-input {
    width: 100%;
    padding: 9px 12px 9px 36px;
    font-family: 'DM Sans', sans-serif;
    font-size: 13.5px;
    color: #0f0f13;
    background: #fff;
    border: 1.5px solid #e5e7eb;
    border-radius: 9px;
    outline: none;
    box-sizing: border-box;
    transition: border-color 0.15s;
  }
  .ts-input:focus { border-color: #8A5DE8; }

  .ts-select {
    font-family: 'DM Sans', sans-serif;
    font-size: 13.5px;
    color: #374151;
    background: #fff;
    border: 1.5px solid #e5e7eb;
    border-radius: 9px;
    padding: 9px 32px 9px 12px;
    outline: none;
    cursor: pointer;
    appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%236b7280' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 10px center;
    transition: border-color 0.15s;
    min-width: 160px;
  }
  .ts-select:focus { border-color: #8A5DE8; }

  .ts-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 14px;
  }

  .tcard {
    background: #fff;
    border: 1px solid #eeeef5;
    border-radius: 14px;
    padding: 18px;
    transition: box-shadow 0.15s, border-color 0.15s;
  }

  .tcard:hover {
    box-shadow: 0 4px 20px rgba(138,93,232,0.08);
    border-color: rgba(138,93,232,0.2);
  }

  .tcard-head {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 12px;
  }

  .tcard-avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
    border: 2px solid #f3f3f9;
    flex-shrink: 0;
  }

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

  .tcard-stars { font-size: 12px; letter-spacing: 1px; }

  .tcard-body {
    font-size: 13.5px;
    color: #4b5563;
    line-height: 1.6;
    margin-bottom: 14px;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .tcard-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .status-badge {
    font-size: 11px;
    font-weight: 500;
    padding: 4px 10px;
    border-radius: 20px;
  }

  .status-PUBLISHED { background: #dcfce7; color: #15803d; }
  .status-PENDING   { background: #fef3c7; color: #92400e; }
  .status-REJECTED  { background: #fee2e2; color: #991b1b; }

  .tcard-actions {
    display: flex;
    gap: 10px;
    color: #9ca3af;
  }

  .icon-btn {
    background: none;
    border: none;
    cursor: pointer;
    padding: 4px;
    border-radius: 6px;
    transition: background 0.12s, color 0.12s;
    color: #9ca3af;
    display: flex;
    align-items: center;
  }

  .icon-btn:hover { background: #f3f4f6; color: #374151; }
  .icon-btn.danger:hover { background: #fee2e2; color: #991b1b; }

  .ts-empty {
    grid-column: 1 / -1;
    text-align: center;
    padding: 48px;
    color: #9ca3af;
    font-size: 14px;
  }
`;

const FALLBACK = {
  nombre: 'María González',
  rol: 'CEO en TechStart Solutions',
  texto: 'Este producto transformó completamente nuestra manera de trabajar. La eficiencia aumentó y nuestro equipo está más feliz que nunca.',
  estado: 'PUBLISHED',
  rating: 5,
  imagen: 'https://randomuser.me/api/portraits/women/44.jpg',
};

export function Testimonios() {
  const [busqueda, setBusqueda] = useState('');
  const [filtroEstado, setFiltroEstado] = useState('');
  const [testimonios, setTestimonios] = useState([]);

  const filtrados = testimonios.filter(t => {
    const matchSearch = !busqueda || (t.authorName || '').toLowerCase().includes(busqueda.toLowerCase()) || (t.content || '').toLowerCase().includes(busqueda.toLowerCase());
    const matchStatus = !filtroEstado || t.status === filtroEstado;
    return matchSearch && matchStatus;
  });

  return (
    <>
      <style>{styles}</style>
      <div className="ts-root">
        <div className="ts-header">
          <div>
            <h1 className="ts-title">Testimonios</h1>
            <p className="ts-sub">Gestioná todos los testimonios del sistema</p>
          </div>
          <NavLink to="/dashboard/nuevoTestimonio" className="btn-new">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
            Nuevo Testimonio
          </NavLink>
        </div>

        <div className="ts-filters">
          <div className="ts-search">
            <span className="ts-search-icon">🔍</span>
            <input
              type="text"
              className="ts-input"
              placeholder="Buscar por nombre o contenido..."
              value={busqueda}
              onChange={e => setBusqueda(e.target.value)}
            />
          </div>
          <select className="ts-select" value={filtroEstado} onChange={e => setFiltroEstado(e.target.value)}>
            <option value="">Todos los estados</option>
            <option value="PUBLISHED">Aprobados</option>
            <option value="PENDING">Pendientes</option>
            <option value="REJECTED">Rechazados</option>
          </select>
        </div>

        <div className="ts-grid">
          {/* Fallback card while API not connected */}
          <div className="tcard">
            <div className="tcard-head">
              <img src={FALLBACK.imagen} className="tcard-avatar" alt="avatar" />
              <div style={{ flex: 1 }}>
                <p className="tcard-name">{FALLBACK.nombre}</p>
                <p className="tcard-role">{FALLBACK.rol}</p>
              </div>
              <div className="tcard-stars">{'⭐'.repeat(FALLBACK.rating)}</div>
            </div>
            <p className="tcard-body">{FALLBACK.texto}</p>
            <div className="tcard-footer">
              <span className={`status-badge status-${FALLBACK.estado}`}>Aprobado</span>
              <div className="tcard-actions">
                <button className="icon-btn" title="Ver">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
                  </svg>
                </button>
                <button className="icon-btn" title="Editar">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                  </svg>
                </button>
                <button className="icon-btn danger" title="Eliminar">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Testimonios;
