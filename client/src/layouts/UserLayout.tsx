
import { Outlet } from "react-router-dom";
import MenuSliceBar from "../components/user/MenuSliceBar";
import Header from "@/components/Header";

const UserLayout = () => {
  return (
    <>
     <Header/>

      <main className="lg:grid lg:grid-cols-4">
        <div className="lg:block lg:col-span-1">
          <MenuSliceBar />
        </div>
        <div className="col-span-4 lg:col-span-3 p-4">
          <Outlet />
        </div>
      </main>
    </>
  );
};

export default UserLayout;
