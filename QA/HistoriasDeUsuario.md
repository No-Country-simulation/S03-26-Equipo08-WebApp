# 🧪 QA & Testing - Camila

# HU 1 – Registro de usuario

**Como** visitante **Quiero** registrarme en la plataforma **Para** acceder a funcionalidades según mi rol

## Criterios de aceptación (BDD)

### Escenario: Registro exitoso

Given el usuario está en la pantalla de registro 
When completa Nombre, Apellido, Email, Contraseña y Confirmar Contraseña correctamente And las contraseñas coinciden 
Then el sistema crea la cuenta 
And redirige al login

### Escenario: Contraseñas no coinciden

Given el usuario completa el formulario 
When la contraseña y su confirmación no coinciden 
Then el sistema muestra un mensaje de error 
And no permite el registro

### Escenario: Campos obligatorios vacíos

Given el usuario intenta registrarse 
When deja campos obligatorios vacíos 
Then el sistema muestra validaciones en los campos 
And no permite continuar

# HU 2 – Login

**Como** usuario registrado **Quiero** iniciar sesión **Para** acceder a mi dashboard

## Criterios de aceptación

### Escenario: Login exitoso

Given el usuario está registrado 
When ingresa email y contraseña correctos 
Then accede al sistema 
And ve su dashboard según rol

### Escenario: Credenciales inválidas

Given el usuario intenta iniciar sesión 
When ingresa credenciales incorrectas 
Then el sistema muestra error 
And no permite el acceso

# HU 3 – Envío de testimonio (Visitante)

**Como** visitante **Quiero** enviar un testimonio **Para** compartir mi experiencia

## Criterios de aceptación

### Escenario: Envío exitoso

Given el visitante accede al endpoint público 
When completa los campos obligatorios del formulario And envía el formulario 
Then el testimonio se guarda en estado pendiente 
And se asigna al editor

### Escenario: Campo contenido vacío

Given el visitante completa el formulario 
When deja el campo contenido vacío 
Then el sistema muestra un error 
And no permite enviar el formulario

### Escenario: Campos opcionales

Given el visitante completa el formulario 
When no completa URL de imagen/video 
Then el sistema permite enviar el formulario igual

# 🛠️ HU 4 – Creación de testimonio (Editor)

**Como** editor **Quiero** crear testimonios manualmente **Para** cargarlos en el sistema

## Criterios de aceptación

### Escenario: Crear testimonio

Given el editor está en el dashboard 
When completa los datos del testimonio 
And agrega tags 
Then el testimonio se guarda 
And queda en estado pendiente o publicado según configuración

# HU 5 – Aprobación de testimonios (Admin)

**Como** admin **Quiero** aprobar testimonios **Para** publicarlos

## Criterios de aceptación

### Escenario: Aprobación exitosa

Given existe un testimonio pendiente 
When el admin lo aprueba 
Then el testimonio cambia a estado publicado 
And es visible para los visitantes

### Escenario: Restricción de rol

Given un editor intenta aprobar un testimonio 
When realiza la acción 
Then el sistema bloquea la acción 
And muestra mensaje de permisos insuficientes

# HU 6 – Eliminación de testimonios (Admin)

**Como** admin **Quiero** eliminar testimonios **Para** gestionar el contenido

## Criterios de aceptación

### Escenario: Eliminación exitosa

Given el admin visualiza un testimonio 
When selecciona eliminar 
Then el sistema elimina el testimonio 
And deja de estar disponible

# 📂 HU 7 – Creación de proyectos (Editor)

**Como** editor **Quiero** crear proyectos **Para** organizar testimonios

## Criterios de aceptación

### Escenario: Crear proyecto

Given el editor está autenticado 
When crea un nuevo proyecto 
Then el proyecto se guarda correctamente 
And queda disponible en su dashboard

# HU 8 – Búsqueda y filtros (Visitante)

**Como** visitante **Quiero** filtrar testimonios **Para** encontrar información relevante

## Criterios de aceptación

### Escenario: Filtrar por categoría

Given el visitante ve testimonios 
When aplica filtro por categoría 
Then el sistema muestra solo los testimonios correspondientes

### Escenario: Filtrar por tags

Given el visitante aplica filtro por tags 
Then el sistema muestra resultados filtrados correctamente

### Escenario: Búsqueda por texto

Given el visitante ingresa texto en buscador 
Then el sistema muestra coincidencias
