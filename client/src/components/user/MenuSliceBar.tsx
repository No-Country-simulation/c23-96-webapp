import { useState } from "react";
import { FaHome, FaCheckCircle, FaUsers, FaStore, FaSignOutAlt } from "react-icons/fa";
import { FiMenu, FiX } from "react-icons/fi";

const MenuSliceBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { name: "Inicio", icon: <FaHome />, link: "/" },
    { name: "Transferencia", icon: <FaCheckCircle />, link: "/transferencia" },
    { name: "Cargar Saldo", icon: <FaUsers />, link: "#" },
    { name: "Pagar Cuentas", icon: <FaStore />, link: "#" },
    { name: "Cerrar Sesión", icon: <FaSignOutAlt />, link: "#" },
  ];

  return (
    <>
      {/* Botón hamburguesa */}
      <div className="fixed top-9 left-4 z-20 md:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-2xl p-2 bg-cyan-500 text-white rounded-md focus:outline-none"
        >
          {isOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Menú principal */}
      <div
        className={`fixed flex flex-col left-0 bg-principal h-full text-gray-600 transition-all duration-300 z-10 ${
          isOpen ? "w-64" : "w-0"
        } md:w-64`}
      >
        <div className="overflow-y-auto flex flex-col justify-between flex-grow">
          <ul className={`flex flex-col py-4 space-y-1 ${isOpen ? "block" : "hidden"} md:block`}>
            {menuItems.map((item, index) => (
              <li key={index}>
                <a
                  href={item.link}
                  className="relative flex flex-row border-b-black items-center h-11 focus:outline-none hover:bg-cyan-500 text-gray-600 hover:text-white border-l-4 border-transparent hover:border-cyan-500"
                >
                  <span className="inline-flex justify-center items-center ml-4 text-lg">
                    {item.icon}
                  </span>
                  <span className="ml-2 text-sm tracking-wide truncate">{item.name}</span>
                </a>
              </li>
            ))}
          </ul>
          <p className="mb-14 px-5 py-3 hidden md:block text-center text-xs">Copyright @2021</p>
        </div>
      </div>

      {/* Fondo oscuro (opcional para móviles) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-5 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
};

export default MenuSliceBar;
