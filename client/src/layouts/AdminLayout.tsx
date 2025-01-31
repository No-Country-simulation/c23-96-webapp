import Header from "../components/Header";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <>
 <Header/>
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default AdminLayout;
