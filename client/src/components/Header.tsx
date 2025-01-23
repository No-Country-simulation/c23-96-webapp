import { useAppStore } from "@/store/useAppStore";
import { IoIosNotifications } from "react-icons/io";
import { MdAccountCircle } from "react-icons/md";
import { RiQuestionAnswerFill } from "react-icons/ri";
const Header = () => {
  const {user} = useAppStore();


  return (
    <>
      {/* Header */}
      <div className="md:sticky md:top-0 md:z-50">
      <header className="bg-principal p-2 flex border-orange-400 border-b-2 justify-between items-center">
        <button className="flex items-center gap-2">
          <MdAccountCircle className="text-black text-2xl" />
          <h3 className="text-sm text-white">Hola {user?.username}</h3>
        </button>

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
      <nav className="bg-principal grid grid-cols-2 justify-around items-center text-white rounded-bl-full lg:rounded-bl-none  p-2 rounded-br-full">
        <button className="bg-orange-700 p-2 rounded rounded-bl-full">Pesos</button>
        <button className="bg-greenaport p-2 rounded rounded-br-full">Dólares</button>
      </nav>
      </div>
    </>
  );
};

export default Header;
