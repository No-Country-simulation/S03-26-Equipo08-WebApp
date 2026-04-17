import React, { useState, useEffect } from 'react';
import { API_BASE_URL } from '../../config/api';

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500&display=swap');

  .cat-root { font-family: 'DM Sans', sans-serif; }

  .cat-header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    margin-bottom: 24px;
  }

  .cat-title {
    font-size: 22px;
    font-weight: 500;
    color: #0f0f13;
    margin: 0 0 4px;
  }

  .cat-sub {
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
    display: flex;
    align-items: center;
    gap: 6px;
    transition: background 0.15s;
  }
  .btn-new:hover { background: #7c4fe0; }

  .cat-form {
    background: #fafafa;
    border: 1.5px dashed #e0e0ea;
    border-radius: 12px;
    padding: 20px;
    margin-bottom: 22px;
  }

  .cat-form-row {
    display: flex;
    gap: 12px;
    align-items: flex-end;
  }

  .cat-field { display: flex; flex-direction: column; gap: 6px; flex: 1; }

  .cat-label {
    font-size: 11px;
    font-weight: 500;
    color: #6b7280;
    text-transform: uppercase;
    letter-spacing: 0.06em;
  }

  .cat-input {
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    color: #0f0f13;
    background: #fff;
    border: 1.5px solid #e5e7eb;
    border-radius: 9px;
    padding: 9px 14px;
    outline: none;
    transition: border-color 0.15s;
  }
  .cat-input:focus { border-color: #8A5DE8; box-shadow: 0 0 0 3px rgba(138,93,232,0.1); }

  .cat-color {
    width: 48px;
    height: 40px;
    border-radius: 9px;
    border: 1.5px solid #e5e7eb;
    cursor: pointer;
    padding: 3px;
    background: #fff;
    outline: none;
  }

  .btn-save {
    background: #8A5DE8;
    color: #fff;
    border: none;
    border-radius: 9px;
    padding: 9px 20px;
    font-size: 13px;
    font-weight: 500;
    font-family: 'DM Sans', sans-serif;
    cursor: pointer;
    transition: background 0.15s;
    white-space: nowrap;
  }
  .btn-save:hover { background: #7c4fe0; }

  .cat-list { display: flex; flex-direction: column; gap: 8px; }

  .cat-item {
    display: flex;
    align-items: center;
    gap: 14px;
    background: #fff;
    border: 1px solid #eeeef5;
    border-radius: 12px;
    padding: 14px 16px;
    transition: box-shadow 0.15s;
  }
  .cat-item:hover { box-shadow: 0 2px 12px rgba(0,0,0,0.05); }

  .cat-color-dot {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    flex-shrink: 0;
    border: 2px solid rgba(0,0,0,0.06);
    transition: transform 0.15s;
  }
  .cat-item:hover .cat-color-dot { transform: scale(1.1); }

  .cat-item-info { flex: 1; min-width: 0; }

  .cat-item-name {
    font-size: 14px;
    font-weight: 500;
    color: #0f0f13;
  }

  .cat-item-hex {
    font-size: 10px;
    font-family: monospace;
    color: #9ca3af;
    text-transform: uppercase;
    letter-spacing: 0.06em;
  }

  .btn-delete {
    background: none;
    border: none;
    cursor: pointer;
    padding: 7px;
    border-radius: 8px;
    color: #d1d5db;
    transition: background 0.12s, color 0.12s;
    display: flex;
    align-items: center;
  }
  .btn-delete:hover { background: #fee2e2; color: #991b1b; }

  /* Modals */
  .modal-backdrop {
    position: fixed;
    inset: 0;
    z-index: 50;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0,0,0,0.3);
    backdrop-filter: blur(4px);
  }

  .modal {
    background: #0f0f13;
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 16px;
    padding: 24px;
    width: 320px;
    box-shadow: 0 20px 60px rgba(0,0,0,0.4);
  }

  .modal-msg {
    font-size: 14px;
    color: rgba(255,255,255,0.85);
    text-align: center;
    margin-bottom: 20px;
    line-height: 1.6;
    font-style: italic;
  }

  .modal-actions {
    display: flex;
    justify-content: flex-end;
    gap: 8px;
  }

  .modal-btn {
    font-family: 'DM Sans', sans-serif;
    font-size: 13px;
    font-weight: 500;
    padding: 8px 18px;
    border-radius: 8px;
    cursor: pointer;
    border: none;
    transition: all 0.12s;
  }

  .modal-btn-cancel {
    background: rgba(255,255,255,0.08);
    color: rgba(255,255,255,0.5);
  }
  .modal-btn-cancel:hover { color: rgba(255,255,255,0.8); background: rgba(255,255,255,0.12); }

  .modal-btn-confirm {
    background: rgba(255,255,255,0.9);
    color: #0f0f13;
  }
  .modal-btn-confirm:hover { background: #fff; }

  .modal-btn-danger {
    background: rgba(248,113,113,0.3);
    color: #fca5a5;
    border: 1px solid rgba(248,113,113,0.2);
  }
  .modal-btn-danger:hover { background: rgba(248,113,113,0.45); }

  .loading { text-align: center; color: #9ca3af; padding: 40px; font-size: 14px; }
`;

const Categorias = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [newName, setNewName] = useState('');
  const [newColor, setNewColor] = useState('#8A5DE8');
  const [modal, setModal] = useState({ show: false, message: '' });
  const [confirmModal, setConfirmModal] = useState({ show: false, id: null });

  const fetchCategories = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_BASE_URL}/api/categories`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const json = await res.json();
        if (json.content && Array.isArray(json.content)) setCategories(json.content);
      }
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchCategories(); }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const slug = newName.toLowerCase().trim().replace(/\s+/g, '-');
    try {
      const res = await fetch(`${API_BASE_URL}/api/categories`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ name: newName, hexColor: newColor.replace('#', ''), slug, type: 'PRODUCT', ownerId: 1 }),
      });
      if (res.ok) {
        setModal({ show: true, message: '¡Categoría creada con éxito!' });
        setNewName('');
        setShowForm(false);
        fetchCategories();
      }
    } catch (e) { console.error(e); }
  };

  const executeDelete = async () => {
    const token = localStorage.getItem('token');
    try {
      const res = await fetch(`${API_BASE_URL}/api/categories/${confirmModal.id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        setConfirmModal({ show: false, id: null });
        setModal({ show: true, message: 'Categoría eliminada correctamente' });
        fetchCategories();
      }
    } catch (e) { console.error(e); }
  };

  if (loading) return <><style>{styles}</style><div className="loading">Cargando categorías...</div></>;

  return (
    <>
      <style>{styles}</style>

      {modal.show && (
        <div className="modal-backdrop">
          <div className="modal">
            <p className="modal-msg">{modal.message}</p>
            <div className="modal-actions">
              <button className="modal-btn modal-btn-confirm" onClick={() => setModal({ show: false, message: '' })}>
                Listo
              </button>
            </div>
          </div>
        </div>
      )}

      {confirmModal.show && (
        <div className="modal-backdrop">
          <div className="modal">
            <p className="modal-msg">¿Estás seguro de eliminar esta categoría?</p>
            <div className="modal-actions">
              <button className="modal-btn modal-btn-cancel" onClick={() => setConfirmModal({ show: false, id: null })}>
                Cancelar
              </button>
              <button className="modal-btn modal-btn-danger" onClick={executeDelete}>
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="cat-root">
        <div className="cat-header">
          <div>
            <h1 className="cat-title">Categorías</h1>
            <p className="cat-sub">Administrá las etiquetas del sistema</p>
          </div>
          <button className="btn-new" onClick={() => setShowForm(!showForm)}>
            {showForm ? (
              <>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
                Cancelar
              </>
            ) : (
              <>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
                </svg>
                Nueva Categoría
              </>
            )}
          </button>
        </div>

        {showForm && (
          <form onSubmit={handleCreate} className="cat-form">
            <div className="cat-form-row">
              <div className="cat-field">
                <label className="cat-label">Nombre</label>
                <input
                  type="text"
                  required
                  value={newName}
                  onChange={e => setNewName(e.target.value)}
                  placeholder="Ej: Producto"
                  className="cat-input"
                />
              </div>
              <div>
                <label className="cat-label" style={{ display: 'block', marginBottom: 6 }}>Color</label>
                <input
                  type="color"
                  value={newColor}
                  onChange={e => setNewColor(e.target.value)}
                  className="cat-color"
                />
              </div>
              <button type="submit" className="btn-save">Guardar</button>
            </div>
          </form>
        )}

        <div className="cat-list">
          {categories.map(cat => {
            const raw = cat.hexColor || cat.color || 'CCCCCC';
            const color = raw.startsWith('#') ? raw : `#${raw}`;
            return (
              <div key={cat.id} className="cat-item">
                <div className="cat-color-dot" style={{ background: color }} />
                <div className="cat-item-info">
                  <div className="cat-item-name">{cat.name}</div>
                  <div className="cat-item-hex">{color}</div>
                </div>
                <button
                  className="btn-delete"
                  onClick={() => setConfirmModal({ show: true, id: cat.id })}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
                    <path d="M10 11v6M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
                  </svg>
                </button>
              </div>
            );
          })}
          {categories.length === 0 && (
            <div style={{ textAlign: 'center', color: '#9ca3af', padding: '40px', fontSize: 14 }}>
              No hay categorías creadas aún
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Categorias;
