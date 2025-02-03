import { Outlet } from "react-router-dom";
import MenuSliceBar from "../components/user/MenuSliceBar";
import Header from "../components/Header";


const UserLayout = () => {
  
  return (

    <>
      <Header />
      <main className="lg:grid lg:grid-cols-3">

        <div className="lg:col-span-1">
          <MenuSliceBar />
        </div>
        
       
        <div className="lg:col-span-2 flex lg:justify-center items-center p-4 mt-10">
          <div className="w-full max-w-3xl"> 
            <Outlet />
          </div>
        </div>
      </main>
    </>
  );
};

export default UserLayout;
