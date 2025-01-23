import { createBrowserRouter } from "react-router-dom";
import UserLayout from "./layouts/UserLayout";
import HomeUser from "./views/HomeUser";
import AdminLayout from "./layouts/AdminLayout";
import SimulatorLayout from "./layouts/SimulatorLayout";
import AuthLayout from "./layouts/AuthLayout";
import Signup from "./views/Signup";
import Login from "./views/Login";
import AdminDashboard from "./views/AdminDashboard";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <UserLayout />,
    children: [
      {
        index: true,
        element: <HomeUser />,
      },
  
    ],
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: <AdminDashboard />,
      },
 
    ],
  },
  {
    path: "/ingresos",
    element: <SimulatorLayout />,
  },
  {
    path: "/auth/",
    element: <AuthLayout />,
    children: [
      {
        path: 'registro',
        element: <Signup />,
      },
      {
        path: 'ingreso',
        element: <Login />,
      },
    ],
  },
]);
