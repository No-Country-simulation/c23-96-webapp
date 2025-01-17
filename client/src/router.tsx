import { createBrowserRouter } from "react-router-dom";
import UserLayout from "./layouts/UserLayout";
import HomeUser from "./views/HomeUser";
import AdminLayout from "./layouts/AdminLayout";
import SimulatorLayout from "./layouts/SimulatorLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <UserLayout />,
    children: [
      {
        index: true,
        element: <HomeUser />,
      },
      {
        path: '',
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
        element: <HomeUser />,
      },
      {
        path: '',
        element: <HomeUser />,
      },
    ],
  },
  {
    path: "/ingresos",
    element: <SimulatorLayout />,
  },
]);
