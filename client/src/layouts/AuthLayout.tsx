import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="bg-[url('/bg.png')]   bg-cover bg-no-repeat bg-center min-h-screen flex items-center justify-center">
      <main className="md:w-3/4 sm:w-3/4  bg-white mx-5 p-6 rounded-md shadow-md ">
        <Outlet />
      </main>
    </div>
  );
};

export default AuthLayout;
