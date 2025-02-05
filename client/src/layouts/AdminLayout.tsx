import Header from "../components/Header";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <>
 <Header/>
      <main className="max-w-5xl mx-auto mt-10">
        <Outlet />
      </main>
    </>
  );
};

export default AdminLayout;
