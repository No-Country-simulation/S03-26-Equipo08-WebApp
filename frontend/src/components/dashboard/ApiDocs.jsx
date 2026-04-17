import React, { useState } from 'react';
import { API_BASE_URL } from '../../config/api';

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500&family=JetBrains+Mono:wght@400&display=swap');

  .api-root { font-family: 'DM Sans', sans-serif; }

  .api-title {
    font-size: 22px;
    font-weight: 500;
    color: #0f0f13;
    margin: 0 0 4px;
  }

  .api-sub {
    font-size: 13.5px;
    color: #6b7280;
    font-weight: 300;
    margin: 0 0 28px;
  }

  .api-base-url {
    background: #0f0f13;
    border-radius: 10px;
    padding: 14px 18px;
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 28px;
    border: 1px solid rgba(255,255,255,0.05);
  }

  .api-base-label {
    font-size: 11px;
    font-weight: 500;
    color: rgba(255,255,255,0.3);
    text-transform: uppercase;
    letter-spacing: 0.1em;
    white-space: nowrap;
  }

  .api-base-value {
    font-family: 'JetBrains Mono', monospace;
    font-size: 12.5px;
    color: #4ade80;
    word-break: break-all;
  }

  .api-section { margin-bottom: 24px; }

  .api-section-header {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 12px;
    cursor: pointer;
    user-select: none;
  }

  .api-section-title {
    font-size: 14px;
    font-weight: 500;
    color: #0f0f13;
    flex: 1;
  }

  .api-section-chevron {
    color: #9ca3af;
    transition: transform 0.2s;
    flex-shrink: 0;
  }
  .api-section-chevron.open { transform: rotate(180deg); }

  .method-row {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 10px;
  }

  .method-badge {
    font-family: 'JetBrains Mono', monospace;
    font-size: 11px;
    font-weight: 500;
    padding: 4px 10px;
    border-radius: 6px;
    letter-spacing: 0.05em;
    white-space: nowrap;
  }

  .method-GET    { background: #dcfce7; color: #15803d; }
  .method-POST   { background: #dbeafe; color: #1d4ed8; }
  .method-PUT    { background: #fef3c7; color: #92400e; }
  .method-DELETE { background: #fee2e2; color: #991b1b; }

  .method-endpoint {
    font-family: 'JetBrains Mono', monospace;
    font-size: 12.5px;
    color: #374151;
  }

  .api-params {
    font-size: 13px;
    color: #4b5563;
    margin: 8px 0;
    line-height: 1.7;
  }

  .param-tag {
    display: inline-block;
    background: #f3f4f6;
    color: #374151;
    font-family: 'JetBrains Mono', monospace;
    font-size: 11px;
    padding: 2px 8px;
    border-radius: 5px;
    margin-right: 4px;
  }

  .code-block {
    background: #0f0f13;
    border-radius: 10px;
    padding: 14px 16px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 12px;
    color: #4ade80;
    line-height: 1.7;
    overflow-x: auto;
    border: 1px solid rgba(255,255,255,0.05);
    white-space: pre;
    margin-bottom: 8px;
  }

  .api-divider {
    height: 1px;
    background: #f0f0f5;
    margin-bottom: 24px;
  }
`;

const ENDPOINTS = [
  {
    title: 'Obtener testimonios',
    method: 'GET',
    endpoint: '/testimonials/search',
    params: ['status → PUBLISHED | PENDING | REJECTED', 'category → id de categoría'],
    code: `GET /api/testimonials/search?status=PUBLISHED\n\nHeaders:\nAuthorization: Bearer TU_TOKEN`,
    response: `{\n  "content": [\n    {\n      "id": 1,\n      "authorName": "Juan Pérez",\n      "rating": 5,\n      "status": "PUBLISHED"\n    }\n  ]\n}`,
  },
  {
    title: 'Obtener testimonio por ID',
    method: 'GET',
    endpoint: '/testimonials/:id',
    code: `GET /api/testimonials/1`,
  },
  {
    title: 'Crear testimonio',
    method: 'POST',
    endpoint: '/testimonials',
    code: `POST /api/testimonials\n\n{\n  "content": "Muy buen servicio",\n  "authorName": "Juan Pérez",\n  "authorRole": "Developer",\n  "rating": 5,\n  "categoryId": 1,\n  "tagIds": []\n}`,
  },
  {
    title: 'Actualizar testimonio',
    method: 'PUT',
    endpoint: '/testimonials/:id',
    code: `PUT /api/testimonials/1\n\n{\n  "status": "PUBLISHED"\n}`,
  },
  {
    title: 'Eliminar testimonio',
    method: 'DELETE',
    endpoint: '/testimonials/:id',
    code: `DELETE /api/testimonials/1`,
  },
  {
    title: 'Agregar video de YouTube',
    method: 'POST',
    endpoint: '/media/youtube/:id',
    code: `POST /api/media/youtube/10\n\n{\n  "youtubeUrl": "https://youtube.com/watch?v=..."\n}`,
  },
  {
    title: 'Múltiples videos YouTube',
    method: 'POST',
    endpoint: '/media/youtube-batch/:id',
    code: `POST /api/media/youtube-batch/10\n\n{\n  "videos": [\n    { "youtubeUrl": "https://youtube.com/..." },\n    { "youtubeUrl": "https://youtube.com/..." }\n  ]\n}`,
  },
  {
    title: 'Subir imágenes (Cloudinary)',
    method: 'POST',
    endpoint: '/media/upload-batch/:id',
    code: `POST /api/media/upload-batch/10\n\n(FormData)\nfiles: [imagen1, imagen2]`,
  },
];

function Endpoint({ data }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="api-section">
      <div className="api-section-header" onClick={() => setOpen(!open)}>
        <span className={`method-badge method-${data.method}`}>{data.method}</span>
        <span className="method-endpoint">/api{data.endpoint}</span>
        <span className="api-section-title" style={{ fontSize: 13, color: '#6b7280' }}>{data.title}</span>
        <svg className={`api-section-chevron${open ? ' open' : ''}`} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="6 9 12 15 18 9"/>
        </svg>
      </div>

      {open && (
        <>
          {data.params && (
            <div className="api-params">
              <strong>Parámetros:</strong><br />
              {data.params.map((p, i) => (
                <span key={i}><span className="param-tag">{p.split('→')[0].trim()}</span>{' → ' + p.split('→')[1]?.trim()}<br /></span>
              ))}
            </div>
          )}
          <div className="code-block">{data.code}</div>
          {data.response && <div className="code-block" style={{ color: '#93c5fd' }}>{data.response}</div>}
        </>
      )}
      <div className="api-divider" style={{ marginTop: open ? 16 : 0 }} />
    </div>
  );
}

export function ApiDocs() {
  return (
    <>
      <style>{styles}</style>
      <div className="api-root">
        <h1 className="api-title">Documentación de API</h1>
        <p className="api-sub">Guía completa para integrar la API de TestimonialHub</p>

        <div className="api-base-url">
          <span className="api-base-label">Base URL</span>
          <span className="api-base-value">{API_BASE_URL}/api</span>
        </div>

        {ENDPOINTS.map((ep, i) => (
          <Endpoint key={i} data={ep} />
        ))}
      </div>
    </>
  );
}

export default ApiDocs;
