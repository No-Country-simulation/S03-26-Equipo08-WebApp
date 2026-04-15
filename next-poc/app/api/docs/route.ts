import { NextResponse } from "next/server";

const swaggerSpec = {
  openapi: "3.0.3",
  info: {
    title: "Testimonial Hub API",
    description: "API REST para la gestión de testimonios, categorías, organizaciones e invitaciones de Testimonial Hub.",
    version: "1.0.0",
    contact: {
      name: "Testimonial Hub Team",
    },
  },
  servers: [
    {
      url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
      description: "Servidor de Desarrollo",
    },
  ],
  tags: [
    { name: "Testimonials", description: "CRUD de testimonios" },
    { name: "Categories", description: "Gestión de categorías" },
    { name: "Invitations", description: "Invitaciones de editores y visitantes" },
    { name: "Public", description: "Endpoints públicos para consumir testimonios (embeds, API externa)" },
    { name: "Auth", description: "Autenticación (Better Auth)" },
    { name: "Organizations", description: "Gestión de organizaciones" },
  ],
  paths: {
    "/api/testimonials": {
      get: {
        tags: ["Testimonials"],
        summary: "Listar testimonios",
        description: "Devuelve una lista paginada de testimonios con filtros opcionales por status y organizationId.",
        parameters: [
          { name: "status", in: "query", required: false, schema: { type: "string", enum: ["pending", "approved", "rejected", "archived"] }, description: "Filtrar por estado" },
          { name: "organizationId", in: "query", required: false, schema: { type: "string" }, description: "Filtrar por organización" },
          { name: "page", in: "query", required: false, schema: { type: "integer", default: 1 }, description: "Número de página" },
          { name: "limit", in: "query", required: false, schema: { type: "integer", default: 20 }, description: "Resultados por página" },
        ],
        responses: {
          "200": {
            description: "Lista de testimonios con paginación",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    data: { type: "array", items: { $ref: "#/components/schemas/Testimonial" } },
                    pagination: { $ref: "#/components/schemas/Pagination" },
                  },
                },
              },
            },
          },
        },
      },
      post: {
        tags: ["Testimonials"],
        summary: "Crear testimonio",
        description: "Crea un nuevo testimonio con estado 'pending' por defecto.",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/CreateTestimonial" },
            },
          },
        },
        responses: {
          "201": { description: "Testimonio creado exitosamente" },
          "400": { description: "Faltan campos requeridos" },
        },
      },
    },
    "/api/testimonials/{id}": {
      get: {
        tags: ["Testimonials"],
        summary: "Detalle de testimonio",
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
        responses: {
          "200": { description: "Detalle del testimonio" },
          "404": { description: "Testimonio no encontrado" },
        },
      },
      patch: {
        tags: ["Testimonials"],
        summary: "Actualizar testimonio",
        description: "Actualiza campos parciales de un testimonio. Usar para aprobar/rechazar/editar.",
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/UpdateTestimonial" },
            },
          },
        },
        responses: {
          "200": { description: "Testimonio actualizado" },
          "404": { description: "Testimonio no encontrado" },
        },
      },
      delete: {
        tags: ["Testimonials"],
        summary: "Eliminar testimonio",
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
        responses: {
          "200": { description: "Testimonio eliminado" },
          "404": { description: "Testimonio no encontrado" },
        },
      },
    },
    "/api/testimonials/stats": {
      get: {
        tags: ["Testimonials"],
        summary: "Estadísticas del dashboard",
        description: "Devuelve conteos de testimonios por estado (total, aprobados, pendientes, rechazados).",
        parameters: [
          { name: "organizationId", in: "query", required: false, schema: { type: "string" }, description: "Filtrar stats por organización" },
        ],
        responses: {
          "200": {
            description: "Estadísticas de testimonios",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    data: {
                      type: "object",
                      properties: {
                        total: { type: "integer" },
                        approved: { type: "integer" },
                        pending: { type: "integer" },
                        rejected: { type: "integer" },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    "/api/categories": {
      get: {
        tags: ["Categories"],
        summary: "Listar categorías",
        parameters: [
          { name: "organizationId", in: "query", required: false, schema: { type: "string" }, description: "Filtrar por organización" },
        ],
        responses: {
          "200": { description: "Lista de categorías" },
        },
      },
      post: {
        tags: ["Categories"],
        summary: "Crear categoría",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["name", "organizationId"],
                properties: {
                  name: { type: "string", example: "Producto" },
                  organizationId: { type: "string" },
                },
              },
            },
          },
        },
        responses: {
          "201": { description: "Categoría creada" },
          "400": { description: "Faltan campos requeridos" },
        },
      },
    },
    "/api/categories/{id}": {
      patch: {
        tags: ["Categories"],
        summary: "Actualizar categoría",
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  name: { type: "string" },
                },
              },
            },
          },
        },
        responses: {
          "200": { description: "Categoría actualizada" },
          "404": { description: "Categoría no encontrada" },
        },
      },
      delete: {
        tags: ["Categories"],
        summary: "Eliminar categoría",
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
        responses: {
          "200": { description: "Categoría eliminada" },
          "404": { description: "Categoría no encontrada" },
        },
      },
    },
    "/api/invitations/editor": {
      post: {
        tags: ["Invitations"],
        summary: "Invitar editor",
        description: "Crea un usuario editor con contraseña temporal, lo añade a la organización y devuelve credenciales + links para compartir.",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["name", "email", "organizationId"],
                properties: {
                  name: { type: "string", example: "Juan Pérez" },
                  email: { type: "string", example: "juan@empresa.com" },
                  organizationId: { type: "string" },
                },
              },
            },
          },
        },
        responses: {
          "201": { description: "Editor creado. Devuelve credenciales, loginLink y whatsappUrl." },
          "400": { description: "Faltan campos requeridos" },
          "403": { description: "No autorizado (solo admins)" },
          "409": { description: "Ya existe un usuario con ese email" },
        },
      },
    },
    "/api/invitations/visitor": {
      post: {
        tags: ["Invitations"],
        summary: "Generar link de visitante",
        description: "Genera un token de acceso único para que un visitante llene el formulario de testimonio. NO envía email, solo devuelve el link.",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["visitorName", "visitorEmail", "organizationId"],
                properties: {
                  visitorName: { type: "string", example: "Ana García" },
                  visitorEmail: { type: "string", example: "ana@cliente.com" },
                  organizationId: { type: "string" },
                },
              },
            },
          },
        },
        responses: {
          "201": { description: "Link generado. Devuelve formLink, whatsappUrl y expiración." },
          "400": { description: "Faltan campos requeridos" },
          "403": { description: "No autorizado (solo admins)" },
        },
      },
      get: {
        tags: ["Invitations"],
        summary: "Listar tokens de visitantes",
        parameters: [
          { name: "organizationId", in: "query", required: true, schema: { type: "string" } },
        ],
        responses: {
          "200": { description: "Lista de tokens de visitantes" },
          "403": { description: "No autorizado" },
        },
      },
    },
    "/api/invitations/visitor/validate": {
      get: {
        tags: ["Invitations"],
        summary: "Validar token de visitante",
        description: "Verifica si un token es válido (no expirado, no usado). Usado antes de mostrar el formulario.",
        parameters: [
          { name: "token", in: "query", required: true, schema: { type: "string" } },
        ],
        responses: {
          "200": { description: "Token válido. Devuelve datos del visitante." },
          "404": { description: "Token inválido, expirado o ya utilizado" },
        },
      },
      post: {
        tags: ["Invitations"],
        summary: "Invalidar token de visitante",
        description: "Marca un token como usado después de que el visitante envía el formulario.",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["token"],
                properties: {
                  token: { type: "string" },
                },
              },
            },
          },
        },
        responses: {
          "200": { description: "Token invalidado exitosamente" },
          "404": { description: "Token no encontrado" },
        },
      },
    },
    "/api/auth/sign-in/email": {
      post: {
        tags: ["Auth"],
        summary: "Login con email y contraseña",
        description: "Inicia sesión. Better Auth maneja las cookies automáticamente.",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["email", "password"],
                properties: {
                  email: { type: "string", example: "admin@testimonial.hub" },
                  password: { type: "string", example: "MiContraseña123" },
                },
              },
            },
          },
        },
        responses: {
          "200": { description: "Login exitoso. Devuelve session + user." },
          "401": { description: "Credenciales inválidas" },
        },
      },
    },
    "/api/auth/sign-out": {
      post: {
        tags: ["Auth"],
        summary: "Cerrar sesión",
        description: "Cierra la sesión actual y elimina las cookies de autenticación.",
        responses: {
          "200": { description: "Sesión cerrada exitosamente" },
        },
      },
    },
    "/api/auth/get-session": {
      get: {
        tags: ["Auth"],
        summary: "Obtener sesión actual",
        description: "Devuelve los datos del usuario autenticado y su sesión. Usa cookies automáticas.",
        responses: {
          "200": {
            description: "Sesión activa",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    user: {
                      type: "object",
                      properties: {
                        id: { type: "string" },
                        name: { type: "string" },
                        email: { type: "string" },
                        role: { type: "string", enum: ["super_admin", "owner", "editor"] },
                        mustChangePassword: { type: "boolean" },
                      },
                    },
                    session: {
                      type: "object",
                      properties: {
                        id: { type: "string" },
                        expiresAt: { type: "string", format: "date-time" },
                      },
                    },
                  },
                },
              },
            },
          },
          "401": { description: "No autenticado" },
        },
      },
    },
    "/api/auth/organization/create": {
      post: {
        tags: ["Organizations"],
        summary: "Crear organización",
        description: "Crea una nueva organización. Solo admins. El creador se convierte en 'owner'.",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["name", "slug"],
                properties: {
                  name: { type: "string", example: "Mi Empresa" },
                  slug: { type: "string", example: "mi-empresa" },
                  logo: { type: "string" },
                },
              },
            },
          },
        },
        responses: {
          "200": { description: "Organización creada" },
          "403": { description: "No autorizado" },
        },
      },
    },
    "/api/auth/organization/list": {
      get: {
        tags: ["Organizations"],
        summary: "Listar organizaciones del usuario",
        description: "Devuelve las organizaciones a las que pertenece el usuario autenticado.",
        responses: {
          "200": { description: "Lista de organizaciones" },
          "401": { description: "No autenticado" },
        },
      },
    },
    "/api/register": {
      post: {
        tags: ["Auth"],
        summary: "Registro de Owner (SaaS)",
        description: "Registra un nuevo cliente (Owner) en la plataforma. Crea automáticamente su usuario, genera una Organización base con el nombre de la empresa y le asigna privilegios de propietario. Maneja la sesión automáticamente vía Better Auth.",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["name", "email", "password", "companyName"],
                properties: {
                  name: { type: "string", example: "Laura Martínez" },
                  email: { type: "string", example: "laura@techstart.com" },
                  password: { type: "string", example: "MiClaveSegura123" },
                  companyName: { type: "string", example: "TechStart Solutions" },
                },
              },
            },
          },
        },
        responses: {
          "201": { description: "Registro exitoso. Devuelve userId, organizationId y slug generado." },
          "400": { description: "Faltan campos requeridos o contraseña débil." },
          "409": { description: "Ya existe una cuenta con ese email." },
          "500": { description: "Error interno gestionando la creación en Better Auth o DB." },
        },
      },
    },
    "/api/public/testimonials": {
      get: {
        tags: ["Public"],
        summary: "Obtener testimonios seleccionados (público)",
        description: "Devuelve los testimonios aprobados y seleccionados (featured) de una organización. **No requiere autenticación.** CORS habilitado para uso desde embeds y sitios externos. Ideal para carruseles, muros de testimonios, o integraciones propias.",
        parameters: [
          { name: "slug", in: "query", required: false, schema: { type: "string" }, description: "Slug de la organización (alternativa a organizationId)" },
          { name: "organizationId", in: "query", required: false, schema: { type: "string" }, description: "ID de la organización" },
          { name: "categoryId", in: "query", required: false, schema: { type: "string" }, description: "Filtrar por categoría" },
          { name: "limit", in: "query", required: false, schema: { type: "integer", default: 50 }, description: "Máximo de testimonios a devolver" },
        ],
        responses: {
          "200": {
            description: "Lista de testimonios seleccionados + categorías disponibles",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    data: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          id: { type: "string" },
                          visitorName: { type: "string" },
                          visitorRole: { type: "string" },
                          visitorCompany: { type: "string" },
                          visitorImage: { type: "string" },
                          content: { type: "string" },
                          mediaUrl: { type: "string" },
                          mediaType: { type: "string" },
                          rating: { type: "integer" },
                          tags: { type: "array", items: { type: "string" } },
                          createdAt: { type: "string", format: "date-time" },
                        },
                      },
                    },
                    categories: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          id: { type: "string" },
                          name: { type: "string" },
                        },
                      },
                    },
                    total: { type: "integer" },
                  },
                },
              },
            },
          },
          "400": { description: "Falta slug o organizationId" },
          "404": { description: "Organización no encontrada" },
        },
      },
    },
  },
  components: {
    schemas: {
      Testimonial: {
        type: "object",
        properties: {
          id: { type: "string" },
          organizationId: { type: "string" },
          categoryId: { type: "string", nullable: true },
          visitorName: { type: "string" },
          visitorRole: { type: "string" },
          visitorCompany: { type: "string", nullable: true },
          visitorImage: { type: "string", nullable: true },
          content: { type: "string" },
          mediaUrl: { type: "string", nullable: true },
          mediaType: { type: "string", enum: ["video", "image", "text"], nullable: true },
          rating: { type: "integer", minimum: 1, maximum: 5 },
          tags: { type: "string", description: "JSON string array", nullable: true },
          source: { type: "string", enum: ["manual", "visitor_form", "youtube", "social"] },
          status: { type: "string", enum: ["pending", "approved", "rejected", "archived"] },
          isFeatured: { type: "boolean" },
          createdAt: { type: "string", format: "date-time" },
          updatedAt: { type: "string", format: "date-time" },
        },
      },
      CreateTestimonial: {
        type: "object",
        required: ["organizationId", "visitorName", "visitorRole", "content"],
        properties: {
          organizationId: { type: "string" },
          categoryId: { type: "string" },
          visitorName: { type: "string", example: "María González" },
          visitorRole: { type: "string", example: "CEO" },
          visitorCompany: { type: "string", example: "TechStart Solutions" },
          visitorImage: { type: "string" },
          content: { type: "string", example: "Excelente plataforma para gestionar testimonios." },
          mediaUrl: { type: "string" },
          mediaType: { type: "string", enum: ["video", "image", "text"] },
          rating: { type: "integer", minimum: 1, maximum: 5, default: 5 },
          tags: { type: "array", items: { type: "string" }, example: ["premium"] },
          source: { type: "string", enum: ["manual", "visitor_form", "youtube", "social"], default: "manual" },
        },
      },
      UpdateTestimonial: {
        type: "object",
        properties: {
          visitorName: { type: "string" },
          visitorRole: { type: "string" },
          visitorCompany: { type: "string" },
          content: { type: "string" },
          status: { type: "string", enum: ["pending", "approved", "rejected", "archived"] },
          isFeatured: { type: "boolean" },
          rating: { type: "integer" },
          tags: { type: "array", items: { type: "string" } },
          categoryId: { type: "string" },
        },
      },
      Pagination: {
        type: "object",
        properties: {
          page: { type: "integer" },
          limit: { type: "integer" },
          total: { type: "integer" },
          totalPages: { type: "integer" },
        },
      },
    },
  },
};

export async function GET() {
  return NextResponse.json(swaggerSpec);
}
