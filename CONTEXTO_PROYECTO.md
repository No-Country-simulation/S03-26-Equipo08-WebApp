# Contexto Detallado del Proyecto: Testimonial CMS

Este documento contiene las especificaciones acordadas sobre los roles, flujos de usuario y formularios del sistema.

## Definición de Roles y Permisos

### 1. Administrador (Soporte de la App)

Es el rol de mayor jerarquía, encargado de la supervisión técnica y de moderación final.

- **Aprobación:** Aprueba o rechaza testimonios pendientes.
- **Gestión de Contenido:** Sube, edita y elimina testimonios.
- **Gestión de Proyectos:** Puede eliminar proyectos completos.
- **Acceso Técnico:** Tiene acceso al script de integración.

### 2. Editor

Es el usuario principal que gestiona su propia sección de testimonios.

- **Gestión de Proyectos:** Crea y elimina sus propios proyectos.
- **Gestión de Testimonios:** Crea, edita y sube testimonios.
- **Carga de Datos:** Gestiona los testimonios que llegan a través del formulario (endpoint).
- **Etiquetado:** Es el encargado de asignar los **Tags** (el visitante no los pone).
- **Acceso Técnico:** Tiene acceso al script de integración.
- **Restricción:** **NO** puede aprobar ni rechazar testimonios (esta es tarea del Admin/Soporte).

### 3. Visitante

Usuario final que interactúa con los testimonios publicados o envía nuevos.

- **Envío de Testimonios:** Accede a un endpoint público enviado por el editor para completar el formulario.
- **Visualización:** Solo puede ver testimonios que ya han sido aprobados y subidos.
- **Filtros:** Puede buscar por:
  1. Categorías.
  2. Tags.
  3. Búsqueda por texto libre.
- **Restricción:** **NO** tiene acceso al dashboard del proyecto.

---

## Flujos de Acceso

### Registro a la Plataforma

Para nuevos Editores/Usuarios:

- Nombre y Apellido
- Email
- Contraseña
- Confirmar Contraseña

### Login

- Email
- Contraseña

---

## Formulario de Testimonio

Datos que debe completar el visitante o el editor al crear un nuevo caso de éxito:

- **Nombre y Apellido:** Obligatorio.
- **Cargo / Rol:** Obligatorio.
- **Empresa / Organización:** Obligatorio.
- **Contenido:** Texto del testimonio (Obligatorio, límite de caracteres pendiente).
- **Multimedia:** URL de Imagen o Video (Opcional).
- **Calificación:** (Rating por estrellas o numérico).

---

## Notas de Implementación

- El registro inicial de un Admin se hace como Editor, y luego un programador/proceso interno asigna el rol de Admin.
- Cada Admin/Editor tiene un proyecto por defecto de inicio ("Mi primer proyecto").
