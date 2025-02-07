import { createBrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";
const UserLayout = lazy(() => import("./layouts/UserLayout"));
const HomeUser = lazy(() => import("./views/user/HomeUser"));
const AdminLayout = lazy(() => import("./layouts/AdminLayout"));
const SimulatorLayout = lazy(() => import("./layouts/SimulatorLayout"));
const AuthLayout = lazy(() => import("./layouts/AuthLayout"));
const Signup = lazy(() => import("./views/Signup"));
const Login = lazy(() => import("./views/Login"));
const AdminDashboard = lazy(() => import("./views/AdminDashboard"));
const UserData = lazy(() => import("./views/user/UserData"));
const Transferences = lazy(() => import("./views/Transferences"));
const PayDebts = lazy(() => import("./views/user/PayDebts"));
const LoadBalance = lazy(() => import("./views/user/LoadBalance"));
const PaySimulation = lazy(() => import("./views/PaySimulation"));
const ProtectedRoute = lazy(() => import("./utils/ProtectedRoute"));

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<div>Cargando...</div>}>
        <ProtectedRoute rol={["user", "company"]}>
          <UserLayout />
        </ProtectedRoute>
      </Suspense>
    ),
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<div>Cargando...</div>}>
            <HomeUser />
          </Suspense>
        ),
      },
      {
        path: "user",
        element: (
          <Suspense fallback={<div>Cargando...</div>}>
            <UserData />
          </Suspense>
        ),
      },
      {
        path: "transferencia",
        element: (
          <Suspense fallback={<div>Cargando...</div>}>
            <Transferences />
          </Suspense>
        ),
      },
      {
        path: "cuentas",
        element: (
          <Suspense fallback={<div>Cargando...</div>}>
            <PayDebts />
          </Suspense>
        ),
      },
      {
        path: "cargarSaldo",
        element: (
          <Suspense fallback={<div>Cargando...</div>}>
            <LoadBalance />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "/admin",
    element: (
      <Suspense fallback={<div>Cargando...</div>}>
        <ProtectedRoute rol={["admin"]}>
          <AdminLayout />
        </ProtectedRoute>
      </Suspense>
    ),
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<div>Cargando...</div>}>
            <AdminDashboard />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "/ingresos",
    element: (
      <Suspense fallback={<div>Cargando...</div>}>
        <SimulatorLayout />
      </Suspense>
    ),
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<div>Cargando...</div>}>
            <PaySimulation />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "/auth/",
    element: (
      <Suspense fallback={<div>Cargando...</div>}>
        <AuthLayout />
      </Suspense>
    ),
    children: [
      {
        path: "registro",
        element: (
          <Suspense fallback={<div>Cargando...</div>}>
            <Signup />
          </Suspense>
        ),
      },
      {
        path: "ingreso",
        element: (
          <Suspense fallback={<div>Cargando...</div>}>
            <Login />
          </Suspense>
        ),
      },
    ],
  },
]);
