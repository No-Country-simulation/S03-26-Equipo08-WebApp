# Contexto del Proyecto: Testimonial Hub (next-poc)

Este documento contiene las especificaciones actualizadas sobre los roles, flujos de invitación, y arquitectura del sistema.

---

## Definición de Roles

### 1. Administrador (Admin / Soporte de la App)

Rol de mayor jerarquía. Es quien gestiona la plataforma completa.

- **Registro:** Se registra como un usuario normal (email + contraseña) y luego un proceso interno le asigna el rol `admin`.
- **Organización:** Automáticamente obtiene una organización por defecto al registrarse.
- **Permisos:**
  - ✅ Aprueba o rechaza testimonios pendientes
  - ✅ Crea, edita y elimina testimonios
  - ✅ Crea y gestiona categorías
  - ✅ Invita Editores (con cuenta + contraseña temporal)
  - ✅ Invita Visitantes (con link de formulario de un solo uso)
  - ✅ Elimina editores o visitantes (por email equivocado, error, etc.)
  - ✅ Acceso al script/código de integración (Embeds)
  - ✅ Acceso completo al Dashboard

### 2. Editor (Invitado por el Admin)

Usuario que gestiona testimonios dentro de la organización. **NO se registra solo**, es invitado.

- **Flujo de Invitación:**
  1. El Admin introduce **nombre + email** del editor
  2. El sistema genera una **contraseña temporal** automáticamente
  3. Se envía un **email automático** con las credenciales (email + contraseña temporal)
  4. **Además**, se le muestra al Admin el **link de invitación** para compartir por otros canales (WhatsApp, Telegram, etc.)
  5. Al hacer login por primera vez → se le **fuerza a cambiar la contraseña**
  6. Desde ahí, usa email + nueva contraseña normalmente
- **Permisos:**
  - ✅ Crea, edita y sube testimonios
  - ✅ Gestiona los testimonios que llegan del formulario del visitante
  - ✅ Asigna **Tags** a los testimonios (el visitante no los pone)
  - ✅ Acceso al script de integración (Embeds)
  - ✅ Acceso al Dashboard (limitado a su organización)
  - ❌ **NO puede** aprobar ni rechazar testimonios (eso es del Admin)
  - ❌ **NO puede** eliminar otros editores ni visitantes

### 3. Visitante (Invitado one-shot)

Usuario final que envía un testimonio. **NO crea cuenta**, accede por un token temporal.

- **Flujo de Invitación:**
  1. El Admin introduce **nombre + email** del visitante
  2. Se envía un **email automático** con saludo personalizado y link con token
  3. **Además**, se le muestra al Admin:
     - **Link copiable** para compartir manualmente
     - **Botón "Enviar por WhatsApp"** con mensaje pre-armado:
       > _¡Hola {nombre}! 👋 Te invitamos a dejar tu testimonio en Testimonial Hub. Solo haz clic aquí: {link}_
  4. El link lo lleva a un **formulario público** para dejar su testimonio
  5. Al enviar el formulario → el **token se invalida inmediatamente**
  6. Si no lo usa → el **token expira en 7 días**
- **Permisos:**
  - ✅ Accede al formulario de testimonio (vía token)
  - ✅ Envía un testimonio (una sola vez)
  - ❌ **NO tiene cuenta** en la plataforma
  - ❌ **NO accede al Dashboard**
  - ❌ **NO puede ver otros testimonios** (solo el formulario de envío)

---

## Tabla de Roles en la Base de Datos

| Concepto            | `user.role` (global) | `member.role` (en org) | ¿Tiene cuenta?                 |
| ------------------- | -------------------- | ---------------------- | ------------------------------ |
| **Admin/Soporte**   | `admin`              | `owner` de su org      | ✅ Sí                          |
| **Editor invitado** | `editor`             | `member` de la org     | ✅ Sí (creada al ser invitado) |
| **Visitante**       | N/A                  | N/A                    | ❌ No (acceso por token)       |

---

## Formulario de Testimonio (Visitante)

Campos que completa el visitante al acceder por el link:

| Campo                  | Obligatorio | Notas                                     |
| ---------------------- | ----------- | ----------------------------------------- |
| Nombre y Apellido      | ✅          | Pre-rellenado del email de invitación     |
| Cargo / Rol            | ✅          | Ej: "CEO", "Estudiante"                   |
| Empresa / Organización | ✅          |                                           |
| Contenido              | ✅          | Texto del testimonio (límite por definir) |
| Multimedia             | ❌          | URL de imagen o video                     |
| Calificación           | ❌          | Rating por estrellas (1-5)                |

> **Nota:** Los **Tags** los asigna el Editor, nunca el visitante.

---

## Flujos Técnicos

### Registro del Admin

1. Se registra con el form público (nombre, email, contraseña)
2. Se crea como `user.role = "editor"` por defecto
3. Un proceso interno (seed, script o panel) le cambia el rol a `admin`
4. Se le crea una organización por defecto

### Invitación de Editor

1. Admin llena formulario: nombre + email
2. Backend: crea `user` con `role = "editor"` + contraseña temporal + `mustChangePassword = true`
3. Backend: crea `member` en la organización con `role = "member"`
4. Backend: envía email con credenciales
5. Backend: devuelve al Admin el **link de invitación** para compartir por WhatsApp u otro canal
6. Editor hace login → detectamos `mustChangePassword = true` → redirigir a cambio de contraseña
7. Tras cambiar contraseña → acceso normal al Dashboard

### Invitación de Visitante

1. Admin llena formulario: nombre + email
2. Backend: crea registro en `visitor_access_token` con token + expiración (7 días)
3. Backend: envía email con link `{APP_URL}/testimonial/new?token={TOKEN}`
4. Backend: devuelve al Admin el **link + mensaje pre-armado para WhatsApp**
5. Visitante abre el link (desde email, WhatsApp, o donde lo reciba) → validamos token
6. Visitante llena el formulario → al enviar, invalidamos el token
7. Fin. No tiene más acceso.

> **Nota:** La seguridad está en el **token**, no en el canal de envío. Email, WhatsApp, Telegram, SMS — todos son válidos.

### Eliminación de Invitados

- Admin puede eliminar un editor: se elimina el `member`, opcionalmente el `user`
- Admin puede cancelar una invitación de visitante: se invalida el `visitor_access_token`

---

## Stack Técnico

| Componente        | Tecnología                                 |
| ----------------- | ------------------------------------------ |
| Framework         | Next.js 16                                 |
| Auth              | Better Auth v1.x + plugin Organization     |
| DB                | PostgreSQL + Drizzle ORM                   |
| Email             | Nodemailer (SMTP Gmail)                    |
| UI                | Tailwind CSS 4 + Shadcn UI + Framer Motion |
| Validación        | Zod                                        |
| Documentación API | swagger-ui-react                           |

---

## Notas Importantes

- Los testimonios se crean con status `pending` por defecto
- Solo el Admin puede cambiar el status a `approved` o `rejected`
- El Editor puede crear testimonios pero quedan en `pending` hasta que el Admin los apruebe
- Cada organización tiene sus propias categorías, testimonios e invitaciones
- El sistema soporta multi-tenancy a nivel de organización
