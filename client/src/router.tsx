import { createBrowserRouter } from "react-router-dom";
import UserLayout from "./layouts/UserLayout";
import HomeUser from "./views/HomeUser";

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
]);
