// Base URL de la API, leída desde la variable de entorno de Vite
// En desarrollo: http://localhost:8080
// En producción (Vercel): https://s03-26-equipo08-webapp.onrender.com
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';
