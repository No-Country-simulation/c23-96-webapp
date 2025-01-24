import { createBrowserRouter, Navigate } from "react-router-dom";
import UserLayout from "./layouts/UserLayout";
import HomeUser from "./views/HomeUser";
import AdminLayout from "./layouts/AdminLayout";
import SimulatorLayout from "./layouts/SimulatorLayout";
import AuthLayout from "./layouts/AuthLayout";
import Signup from "./views/Signup";
import Login from "./views/Login";
import AdminDashboard from "./views/AdminDashboard";
import { useAppStore } from "./store/useAppStore";
import { ReactNode } from "react";

interface ProtectedRouteProps {
  children: ReactNode;
  rol?: string; // El rol es opcional
}

// Wrapper para proteger rutas
const ProtectedRoute = ({ children , rol }: ProtectedRouteProps) => {
  const { isLogged, user } = useAppStore();

  if (!isLogged()) {
    // Si no está logueado, redirige al registro
    return <Navigate to="/auth/registro" replace />;
  }

  // Si el rol es requerido y no coincide, redirige al home
  if (rol && user?.rol !== rol) {
    return <Navigate to="/" replace />;
  }

  // Si todo está bien, renderiza el componente
  return children;
};

// Configuración del router
export const router = createBrowserRouter([
  // Ruta para usuarios
  {
    path: "/",
    element: (
      <ProtectedRoute rol="user">
        <UserLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <HomeUser />,
      },
    ],
  },

  // Ruta para administradores
  {
    path: "/admin",
    element: (
      <ProtectedRoute rol="admin">
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <AdminDashboard />,
      },
    ],
  },

  // Ruta para simulador (disponible para todos los logueados)
  {
    path: "/ingresos",
    element: (
      <ProtectedRoute>
        <SimulatorLayout />
      </ProtectedRoute>
    ),
  },

  // Ruta para autenticación
  {
    path: "/auth/",
    element: <AuthLayout />,
    children: [
      {
        path: "registro",
        element: <Signup />,
      },
      {
        path: "ingreso",
        element: <Login />,
      },
    ],
  },
]);
