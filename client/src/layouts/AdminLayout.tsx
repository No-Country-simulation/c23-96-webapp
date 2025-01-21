import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <>
    <header>
      
    </header>
    <nav>
      <div>Pesos</div>
      <div>Dolares</div>
    </nav>

      <main>
        <Outlet />
      </main>
    </>
  );
};

export default AdminLayout;
