import { IoIosNotifications } from "react-icons/io";
import { MdAccountCircle } from "react-icons/md";
import { RiQuestionAnswerFill } from "react-icons/ri";
import { Outlet } from "react-router-dom";

const UserLayout = () => {
  return (
    <>
      <header className="bg-principal p-2 flex justify-center justify-between">
        <div className="flex gap-2">
        <MdAccountCircle className="text-black border-solid text-xl"/>
        <h3 className="text-sm text-white">Hola Ale</h3>
        </div>
        <div className="flex gap-2">
        <IoIosNotifications />
        <RiQuestionAnswerFill />
        </div>
       
      </header>
      <nav className=" flex justify-between aling items-center size-full justify-items-center text-white ">
        <div className="bg-principal">Pesos</div>
        <div className="bg-greenaport">Dolares</div>
      </nav>
  
    
      <main className="">
      
        <Outlet />
      </main>
    </>
  );
};

export default UserLayout;
