# Backend de S03-26-Equipo08-WebApp

Este es el directorio que contiene la lógica del lado del servidor y la base de datos de nuestro proyecto.

## Tecnologías Utilizadas

- **Java 17+**
- **Spring Boot**
- **Spring Security** con **JWT**
- **Maven/Gradle** para la gestión de dependencias
- **Hibernate / JPA** (Java Persistence API)

## Configuración y Ejecución

1. Asegurarse de tener instalado JDK 17+.
2. Configurar las variables de entorno necesarias (base de datos, secretos de JWT).
3. Ejecutar el proyecto con `./mvnw spring-boot:run` o similar.

## Autenticación

El sistema utiliza JWT para autenticar usuarios registrados. Se generan tokens al iniciar sesión que deben incluirse en el encabezado `Authorization`.

## Próximos Pasos

- Completar la implementación de las rutas protegidas.
- Integración final con la base de datos.
