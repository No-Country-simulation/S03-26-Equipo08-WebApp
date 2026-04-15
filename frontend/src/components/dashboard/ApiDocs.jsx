import React from "react"
import { API_BASE_URL } from '../../config/api';

export function ApiDocs () {
    return (
        <>
            <div style={{ padding: "20px" }}>
      
      {/* HEADER */}
      <h1 style={{ fontSize: "32px", fontWeight: "bold" }}>
        Documentación de API
      </h1>

      <p style={{ color: "#6b7280", marginBottom: "20px" }}>
        Guía completa para integrar la API de TestimonialsCMS
      </p>

      {/* BASE URL */}
      <Section title="Inicio Rápido">
        <CodeBlock>
{`Base URL:
${API_BASE_URL}/api

Autenticación:
Authorization: Bearer TU_TOKEN`}
        </CodeBlock>
      </Section>

      {/* GET TESTIMONIOS */}
      <Section title="Obtener Testimonios">
        <Method type="GET" endpoint="/testimonials/search" />

        <p>Parámetros:</p>
        <ul>
          <li>status → PUBLISHED | PENDING | REJECTED</li>
          <li>category → id de categoría</li>
        </ul>

        <CodeBlock>
{`GET /api/testimonials/search?status=PUBLISHED

Headers:
Authorization: Bearer TU_TOKEN`}
        </CodeBlock>

        <CodeBlock>
{`{
  "content": [
    {
      "id": 1,
      "authorName": "Juan Pérez",
      "authorRole": "Frontend Developer",
      "content": "Excelente servicio",
      "rating": 5,
      "status": "PUBLISHED"
    }
  ]
}`}
        </CodeBlock>
      </Section>

      {/* GET ONE */}
      <Section title="Obtener Testimonio Individual">
        <Method type="GET" endpoint="/testimonials/:id" />

        <CodeBlock>
{`GET /api/testimonials/1`}
        </CodeBlock>
      </Section>

      {/* POST */}
      <Section title="Crear Testimonio">
        <Method type="POST" endpoint="/testimonials" />

        <CodeBlock>
{`POST /api/testimonials

{
  "content": "Muy buen servicio",
  "authorName": "Juan Pérez",
  "authorRole": "Developer",
  "rating": 5,
  "categoryId": 1,
  "tagIds": []
}`}
        </CodeBlock>
      </Section>

      {/* PUT */}
      <Section title="Actualizar Testimonio">
        <Method type="PUT" endpoint="/testimonials/:id" />

        <CodeBlock>
{`PUT /api/testimonials/1

{
  "status": "PUBLISHED"
}`}
        </CodeBlock>
      </Section>

      {/* DELETE */}
      <Section title="Eliminar Testimonio">
        <Method type="DELETE" endpoint="/testimonials/:id" />

        <CodeBlock>
{`DELETE /api/testimonials/1`}
        </CodeBlock>
      </Section>

      {/* YOUTUBE */}
      <Section title="Agregar Video de YouTube">
        <Method type="POST" endpoint="/media/youtube/:id" />

        <CodeBlock>
{`POST /api/media/youtube/10

{
  "youtubeUrl": "https://youtube.com/..."
}`}
        </CodeBlock>
      </Section>

      {/* MULTIPLE YOUTUBE */}
      <Section title="Múltiples Videos YouTube">
        <Method type="POST" endpoint="/media/youtube-batch/:id" />

        <CodeBlock>
{`POST /api/media/youtube-batch/10

{
  "videos": [
    { "youtubeUrl": "https://youtube.com/..." },
    { "youtubeUrl": "https://youtube.com/..." }
  ]
}`}
        </CodeBlock>
      </Section>

      {/* CLOUDINARY */}
      <Section title="Subir Imágenes (Cloudinary)">
        <Method type="POST" endpoint="/media/upload-batch/:id" />

        <CodeBlock>
{`POST /api/media/upload-batch/10

(FormData)
files: [imagen1, imagen2]`}
        </CodeBlock>
      </Section>

    </div>
    </>
  );
}
/* ================= COMPONENTES AUXILIARES ================= */

const Section = ({ title, children }) => (
  <div style={{ marginTop: "30px" }}>
    <h2 style={{ fontSize: "22px", fontWeight: "bold" }}>
      {title}
    </h2>
    <div style={{ marginTop: "10px" }}>
      {children}
    </div>
  </div>
);


const CodeBlock = ({ children }) => (
  <pre
    style={{
      background: "#111827",
      color: "#22c55e",
      padding: "15px",
      borderRadius: "8px",
      marginTop: "10px",
      overflowX: "auto",
    }}
  >
    {children}
  </pre>
);


const Method = ({ type, endpoint }) => {
  const colors = {
    GET: "#22c55e",
    POST: "#3b82f6",
    PUT: "#f59e0b",
    DELETE: "#ef4444",
  };

  return (
    <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
      <span
        style={{
          background: colors[type],
          color: "white",
          padding: "5px 10px",
          borderRadius: "6px",
          fontWeight: "bold",
        }}
      >
        {type}
      </span>

      <span style={{ fontFamily: "monospace" }}>
        {endpoint}
      </span>
    </div>
  );
};

export default ApiDocs;







