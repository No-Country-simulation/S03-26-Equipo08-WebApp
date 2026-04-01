# Contexto del Proyecto: Testimonial Hub (SaaS)

Este documento contiene las especificaciones actualizadas sobre los roles, flujos de invitación, y arquitectura SaaS del sistema.

---

## Definición de Roles (Modelo SaaS)

### 1. Super Admin (Soporte / Plataforma)

Rol reservado de mayor jerarquía para los creadores de Testimonial Hub.

- No está asociado a ninguna organización de cliente.
- Gestionará (en el futuro) planes, billing, suspensiones o soporte global.
- Creado inicialmente por script de base de datos o ruta de setup secreta.

### 2. Owner (Cliente / Dueño de Organización)

Es la empresa o particular que contrata / se registra en Testimonial Hub para recopilar sus testimonios.

- **Registro:** Se registra libremente en `/register` (formulario público de SaaS).
- **Organización:** Durante su registro, se crea automáticamente la Organización con el nombre de su empresa.
- **Permisos dentro de su Organización:**
  - ✅ Aprueba o rechaza testimonios pendientes
  - ✅ Crea, edita y elimina testimonios
  - ✅ Crea y gestiona categorías
  - ✅ Invita Editores (con cuenta + contraseña temporal)
  - ✅ Genera links de Visitantes
  - ✅ Acceso total al dashboard y configuración de integración
  - ❌ **NO puede** ver data de otras organizaciones

### 3. Editor (Invitado por el Owner)

Usuario que gestiona testimonios como empleado/colaborador del Owner. **NO se registra solo**.

- **Flujo de Invitación:**
  1. El Owner introduce **nombre + email** del editor.
  2. El sistema genera una **contraseña temporal**.
  3. Se envía al editor el **link de login** (opcionalmente por email o WhatsApp).
  4. Al hacer login por primera vez → se le **fuerza a cambiar la contraseña**.
- **Permisos:**
  - ✅ Sube y edita testimonios
  - ✅ Asigna **Tags**
  - ✅ Acceso al Dashboard (limitado a su organización)
  - ❌ **NO puede** aprobar ni rechazar testimonios
  - ❌ **NO puede** invitar a otras personas ni ver facturación de la org

### 4. Visitante (Invitado one-shot)

Usuario final que envía un testimonio. **NO crea cuenta**, accede por un token temporal generado por el Owner/Editor.

- **Flujo:**
  1. Owner genera link para el visitante (por email o generando el enlace para WhatsApp).
  2. Visitante abre el formulario, lo envía, y el **token se invalida inmediatamente**.
  3. Expira en 7 días si no se usa.
- **Permisos:** Solo enviar su propio testimonio 1 vez.

---

## Tabla de Roles en la Base de Datos

| Rol en `user.role` | Rol en org (`member.role`) | Descripción / ¿Quién es? | ¿Tiene cuenta?                   |
| ------------------ | -------------------------- | ------------------------ | -------------------------------- |
| **`super_admin`**  | N/A                        | Dueños de la plataforma  | ✅ Sí (vía script interno)       |
| **`owner`**        | `owner`                    | El Cliente del SaaS      | ✅ Sí (se registra él mismo)     |
| **`editor`**       | `member`                   | Colaborador del cliente  | ✅ Sí (cuenta creada al invitar) |
| **(Visitante)**    | N/A                        | Deja el testimonio       | ❌ No (acceso por token DB)      |

---

## Flujos Técnicos

### Registro del Cliente SaaS (Owner)

1. Cliente llena formulario: Nombre, Email, Contraseña, **Nombre de Empresa**.
2. Llamada a `/api/register`.
3. Backend: Crea `user` con `role = "owner"`.
4. Backend: Limpia nombre de empresa y crea `organization` (ej. "Mi Empresa" → "mi-empresa").
5. Backend: Inserta `member` vinculando al User con la Organización con rol `owner`.
6. Cliente es redirigido a su Dashboard listo para operar.

### Invitación de Editor

1. Owner llena: nombre + email.
2. Backend: Crea `user` como `editor` + password temporal + `mustChangePassword = true`.
3. Backend: Crea `member` con `role = "member"` en la organización actual.
4. Devuelve link y password temporal para mandar por WhatsApp o mail.

### Invitación de Visitante

1. Owner genera token. Backend inserta en `visitor_access_token`.
2. Devuelve link `{APP_URL}/testimonial/new?token={TOKEN}` y botón a WhatsApp.
3. Se llena el formulario → Token pasa a `used: true`.

---

## Stack Técnico Base

- **Framework:** Next.js 16 (App Router)
- **Auth:** Better Auth v1.x + Plugin Organizations
- **DB:** PostgreSQL + Drizzle ORM
- **UI:** Tailwind CSS 4 + Shadcn UI + Framer Motion
- **Documentación API:** OpenAPI + Swagger (`swagger-ui-react`)
