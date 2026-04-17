import React, { useState, useEffect } from 'react';
import { API_BASE_URL } from '../../config/api';

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500&display=swap');

  .fp-root {
    font-family: 'DM Sans', sans-serif;
    color: #1a1a2e;
    padding: 0;
  }

  .fp-header {
    margin-bottom: 28px;
  }

  .fp-title {
    font-size: 22px;
    font-weight: 500;
    color: #0f0f13;
    margin: 0 0 4px;
  }

  .fp-sub {
    font-size: 13.5px;
    color: #6b7280;
    font-weight: 300;
    margin: 0;
  }

  .fp-metrics {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 14px;
    margin-bottom: 28px;
  }

  .metric-card {
    background: #18122B;
    border-radius: 14px;
    padding: 20px;
    position: relative;
    overflow: hidden;
  }

  .metric-card::before {
    content: '';
    position: absolute;
    top: 0; right: 0;
    width: 60px; height: 60px;
    border-radius: 50%;
    opacity: 0.12;
    transform: translate(20px, -20px);
  }

  .metric-card.purple::before { background: #8A5DE8; }
  .metric-card.pink::before   { background: #D95CAB; }
  .metric-card.blue::before   { background: #70D5FA; }
  .metric-card.amber::before  { background: #f59e0b; }

  .metric-label {
    font-size: 11px;
    font-weight: 400;
    color: #A78BFA;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    margin-bottom: 12px;
  }

  .metric-value {
    font-size: 32px;
    font-weight: 500;
    color: #E9E4F0;
    line-height: 1;
    margin-bottom: 8px;
  }

  .metric-desc {
    font-size: 12px;
    color: rgba(255,255,255,0.3);
    font-weight: 300;
  }

  .metric-icon {
    position: absolute;
    top: 18px;
    right: 18px;
    opacity: 0.3;
  }

  .metric-pill {
    display: inline-block;
    padding: 2px 8px;
    border-radius: 20px;
    font-size: 11px;
    font-weight: 500;
    margin-top: 4px;
  }

  .metric-pill.purple { background: rgba(138,93,232,0.2); color: #b794f4; }
  .metric-pill.pink   { background: rgba(217,92,171,0.2); color: #f0a8d4; }
  .metric-pill.blue   { background: rgba(112,213,250,0.2); color: #70D5FA; }
  .metric-pill.amber  { background: rgba(245,158,11,0.2); color: #fbbf24; }

  .fp-bottom {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 18px;
  }

  .panel {
    background: #fff;
    border: 1px solid #f0f0f5;
    border-radius: 14px;
    overflow: hidden;
  }

  .panel-header {
    padding: 18px 20px 14px;
    border-bottom: 1px solid #f4f4f8;
  }

  .panel-title {
    font-size: 14px;
    font-weight: 500;
    color: #0f0f13;
    margin: 0 0 2px;
  }

  .panel-sub {
    font-size: 12px;
    color: #9ca3af;
    font-weight: 300;
    margin: 0;
  }

  .user-list {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .user-row {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px 20px;
    border-bottom: 1px solid #f8f8fc;
    transition: background 0.12s;
  }

  .user-row:last-child { border-bottom: none; }
  .user-row:hover { background: #fafafa; }

  .user-avatar-sm {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    object-fit: cover;
    flex-shrink: 0;
  }

  .user-row-info { flex: 1; min-width: 0; }

  .user-row-name {
    font-size: 13.5px;
    font-weight: 500;
    color: #1a1a2e;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .user-row-role {
    font-size: 12px;
    color: #9ca3af;
    font-weight: 300;
  }

  .status-badge {
    font-size: 11px;
    font-weight: 500;
    padding: 3px 10px;
    border-radius: 20px;
    flex-shrink: 0;
  }

  .status-pending  { background: #fef3c7; color: #92400e; }
  .status-approved { background: #d1fae5; color: #065f46; }
  .status-rejected { background: #fee2e2; color: #991b1b; }

  .bar-list { padding: 16px 20px; }

  .bar-row { margin-bottom: 14px; }
  .bar-row:last-child { margin-bottom: 0; }

  .bar-meta {
    display: flex;
    justify-content: space-between;
    margin-bottom: 6px;
  }

  .bar-label {
    font-size: 13px;
    color: #374151;
    font-weight: 400;
  }

  .bar-count {
    font-size: 13px;
    color: #6b7280;
    font-weight: 500;
  }

  .bar-track {
    height: 6px;
    background: #f3f4f6;
    border-radius: 99px;
    overflow: hidden;
  }

  .bar-fill {
    height: 100%;
    border-radius: 99px;
    transition: width 0.6s ease;
  }
`;

const USERS = [
  { id: 1, name: 'Ana García', role: 'CEO', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face' },
  { id: 2, name: 'Marcos Silva', role: 'Developer', img: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=80&h=80&fit=crop&crop=face' },
  { id: 3, name: 'Lucía Romero', role: 'Designer', img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face' },
  { id: 4, name: 'Diego Torres', role: 'Marketing', img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=80&h=80&fit=crop&crop=face' },
  { id: 5, name: 'Sofía Martín', role: 'Product', img: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=80&h=80&fit=crop&crop=face' },
];

const CATEGORIES = [
  { label: 'Producto',  count: 4, pct: 80,  color: '#8A5DE8' },
  { label: 'Cliente',   count: 3, pct: 60,  color: '#D95CAB' },
  { label: 'Evento',    count: 2, pct: 40,  color: '#70D5FA' },
  { label: 'Industria', count: 2, pct: 40,  color: '#f59e0b' },
];

export function FirstPage() {
  const [total, setTotal] = useState(0);
  const [aprobados, setAprobados] = useState(0);
  const [pendientes, setPendientes] = useState(0);
  const [rechazados, setRechazados] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const fetchData = async (status) => {
      const res = await fetch(`${API_BASE_URL}/api/testimonials/search?status=${status}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (Array.isArray(data)) return data.length;
      if (Array.isArray(data.content)) return data.content.length;
      return 0;
    };
    const load = async () => {
      try {
        const [p, a, r] = await Promise.all([
          fetchData('PENDING'),
          fetchData('PUBLISHED'),
          fetchData('REJECTED'),
        ]);
        setPendientes(p);
        setAprobados(a);
        setRechazados(r);
        setTotal(p + a + r);
      } catch (e) {
        console.error(e);
      }
    };
    load();
  }, []);

  const metrics = [
    { label: 'Total', value: total,     desc: 'todos los testimonios', cls: 'purple', pill: 'Sistema completo' },
    { label: 'Aprobados', value: aprobados, desc: 'publicados en el sitio', cls: 'blue',   pill: 'Visibles' },
    { label: 'Pendientes', value: pendientes, desc: 'esperando revisión', cls: 'amber',  pill: 'Por revisar' },
    { label: 'Rechazados', value: rechazados, desc: 'no aprobados', cls: 'pink',   pill: 'Archivados' },
  ];

  return (
    <>
      <style>{styles}</style>
      <div className="fp-root">
        <div className="fp-header">
          <h1 className="fp-title">Dashboard</h1>
          <p className="fp-sub">Resumen general del sistema de testimonios</p>
        </div>

        <div className="fp-metrics">
          {metrics.map((m) => (
            <div key={m.label} className={`metric-card ${m.cls}`}>
              <div className="metric-label">{m.label}</div>
              <div className="metric-value">{m.value}</div>
              <div className="metric-desc">{m.desc}</div>
              <span className={`metric-pill ${m.cls}`}>{m.pill}</span>
            </div>
          ))}
        </div>

        <div className="fp-bottom">
          {/* Recent users */}
          <div className="panel">
            <div className="panel-header">
              <p className="panel-title">Testimonios recientes</p>
              <p className="panel-sub">Últimas solicitudes pendientes</p>
            </div>
            <ul className="user-list">
              {USERS.map((u) => (
                <li key={u.id} className="user-row">
                  <img src={u.img} alt={u.name} className="user-avatar-sm" />
                  <div className="user-row-info">
                    <div className="user-row-name">{u.name}</div>
                    <div className="user-row-role">{u.role}</div>
                  </div>
                  <span className="status-badge status-pending">Pendiente</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Category distribution */}
          <div className="panel">
            <div className="panel-header">
              <p className="panel-title">Distribución por categoría</p>
              <p className="panel-sub">Volumen de cada categoría</p>
            </div>
            <div className="bar-list">
              {CATEGORIES.map((c) => (
                <div key={c.label} className="bar-row">
                  <div className="bar-meta">
                    <span className="bar-label">{c.label}</span>
                    <span className="bar-count">{c.count}</span>
                  </div>
                  <div className="bar-track">
                    <div
                      className="bar-fill"
                      style={{ width: `${c.pct}%`, background: c.color }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default FirstPage;
