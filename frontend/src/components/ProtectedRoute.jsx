import { Navigate, useLocation } from 'react-router-dom';

/**
 * Componente que protege rutas privadas.
 * Verifica si existe un token de autenticación en localStorage.
 * Si no hay token, redirige al usuario a /login.
 * 
 * @param {object} props
 * @param {React.ReactNode} props.children - El contenido protegido a renderizar.
 */
const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const token = localStorage.getItem('token');

  if (!token) {
    // Redirige a login y guarda la ubicación actual para volver después
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
