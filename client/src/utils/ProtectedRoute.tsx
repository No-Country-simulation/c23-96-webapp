import { Navigate } from "react-router-dom";
import { useAppStore } from "../store/useAppStore";
import { ReactNode } from "react";

interface ProtectedRouteProps {
  children: ReactNode;
  rol?: string | string[];
}

const ProtectedRoute = ({ children, rol }: ProtectedRouteProps) => {
  const { isLogged, user } = useAppStore();

  if (!isLogged()) {
    return <Navigate to="/auth/ingreso" replace />;
  }

  const rolesPermitidos = Array.isArray(rol) ? rol : [rol];

  if (rol && !rolesPermitidos.includes(user?.rol)) {
    console.log(`Acceso denegado: se esperaba rol ${rolesPermitidos}, pero el usuario tiene ${user?.rol}`);

    if (user?.rol === "admin") {
      return <Navigate to="/admin" replace />;
    }

    return <Navigate to="/" replace />;
  }

  return children;
};


export default ProtectedRoute;
