import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

interface ProtectedRouteProps {
  children: JSX.Element;
  allowedRoles: string[]; // Lista de roles permitidos
}

const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
  const token = localStorage.getItem('token');

  // Si no hay token, redirigir al login
  if (!token) {
    return <Navigate to="/login" />;
  }

  // Decodificar el token para obtener el rol del usuario
  const decodedToken: any = jwtDecode(token);
  const userRole = decodedToken.role;

  // Verificar si el rol del usuario está en la lista de roles permitidos
  if (!allowedRoles.includes(userRole)) {
    // Si no tiene acceso, redirigir a la página de "Acceso Denegado"
    return <Navigate to="/no-access" />;
  }

  // Si tiene el rol adecuado, renderizar la ruta protegida
  return children;
};

export default ProtectedRoute;
