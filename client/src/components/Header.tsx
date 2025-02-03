import { useAppStore } from "@/store/useAppStore";
import { IoIosNotifications } from "react-icons/io";
import { MdAccountCircle } from "react-icons/md";
import { RiQuestionAnswerFill } from "react-icons/ri";
import { Link } from "react-router-dom";
const Header = () => {
  const {user, PesosPage, DolarPage, isPesos} = useAppStore();


  return (
    <>
      {/* Header */}
      <div className="md:sticky md:top-0 md:z-50">
      <header className={` ${isPesos ? ("bg-principal border-orange-400") : ("bg-blue-400 border-cyan-500")} p-2 flex  border-b-2 justify-between items-center`}>
        <Link to={"user"} className="flex items-center gap-2">
          <MdAccountCircle className="text-black text-2xl" />
          <h3 className="text-sm text-white">Hola {user?.username}</h3>
        </Link>

        <div className="flex items-center gap-2">
          <button>
            <IoIosNotifications className="text-white text-2xl" />
          </button>
          <button>
            <RiQuestionAnswerFill className="text-white text-2xl" />
          </button>
        </div>
      </header>

      {/* Navigation */}
      <nav className={`${isPesos ? ("bg-principal") : ("bg-blue-400")} grid grid-cols-2 justify-around items-center text-white rounded-bl-full lg:rounded-bl-none  p-2 rounded-br-full`}>
        
        <button className={`${isPesos ? ("bg-orange-700"): ("bg-principal")} p-2 rounded md:rounded-bl-full`} onClick={PesosPage}>Pesos</button>
        <button className={`${isPesos ? ("bg-blue-500"): ("bg-blue-600")}  p-2 rounded rounded-br-full`} onClick={DolarPage}>Dólares</button>
      </nav>
      </div>
    </>
  );
};

export default Header;
