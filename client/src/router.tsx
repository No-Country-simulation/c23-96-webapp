import { createBrowserRouter } from "react-router-dom";
import UserLayout from "./layouts/UserLayout";
import HomeUser from "./views/user/HomeUser";
import AdminLayout from "./layouts/AdminLayout";
import SimulatorLayout from "./layouts/SimulatorLayout";
import AuthLayout from "./layouts/AuthLayout";
import Signup from "./views/Signup";
import Login from "./views/Login";
import AdminDashboard from "./views/AdminDashboard";
import UserData from "./views/user/UserData";
import Transferences from "./views/Transferences";
import PayDebts from "./views/user/PayDebts";
import LoadBalance from "./views/user/LoadBalance";
import PaySimulation from "./views/PaySimulation";
import ProtectedRoute from "./utils/ProtectedRoute";


export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute rol={["user", "company"]}>
        <UserLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <HomeUser /> },
      { path: "user", element: <UserData /> },
      { path: "transferencia", element: <Transferences /> },
      { path: "cuentas", element: <PayDebts /> },
      { path: "cargarSaldo", element: <LoadBalance /> },
    ],
  },
  {
    path: "/admin",
    element: (
      <ProtectedRoute rol={["admin"]}>
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [{ index: true, element: <AdminDashboard /> }],
  },
  {
    path: "/ingresos",
    element: <SimulatorLayout />,
    children: [{ index: true, element: <PaySimulation /> }],
  },
  {
    path: "/auth/",
    element: <AuthLayout />,
    children: [
      { path: "registro", element: <Signup /> },
      { path: "ingreso", element: <Login /> },
    ],
  },
]);