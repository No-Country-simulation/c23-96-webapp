import { useAppStore } from "@/store/useAppStore";
import { useState } from "react";
import { FaHome, FaCheckCircle, FaUsers, FaStore, FaSignOutAlt } from "react-icons/fa";
import { FiMenu, FiX } from "react-icons/fi";
import { Link } from "react-router-dom";

const MenuSliceBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { clearAuthData, isPesos } = useAppStore(); 

  // Definir colores según isPesos
  const bgColor = isPesos ? "bg-principal" : "bg-blue-400"; 
  const hoverColor = isPesos ? "hover:bg-cyan-500" : "hover:bg-blue-500"; 
  const borderColor = isPesos ? "border-orange-400" : "border-blue-200"; 

  return (
    <>
      {/* Botón hamburguesa */}
      <div className="fixed top-9 left-4 z-30 md:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`text-3xl p-3 rounded-md focus:outline-none ${
            isPesos ? "bg-cyan-500 text-white" : "bg-blue-500 text-white"
          }`}
        >
          {isOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Menú principal */}
      <div
        className={`fixed flex flex-col left-0 h-full text-gray-700 transition-all duration-300 z-20 ${bgColor} ${
          isOpen ? "w-72" : "w-0"
        } lg:w-72`}
      >
        <div className="overflow-y-auto flex flex-col justify-between flex-grow">
          <ul className={`flex flex-col py-6 space-y-2 ${isOpen ? "block" : "hidden"} lg:block`}>
            <li>
              <Link
                to="/"
                className={`relative flex flex-row items-center h-14 px-5 text-lg ${borderColor} border-b-2 focus:outline-none ${hoverColor} hover:text-white`}
              >
                <FaHome className="text-2xl" />
                <span className="ml-3 text-base font-semibold">Inicio</span>
              </Link>
            </li>
            <li>
              <Link
                to="/transferencia"
                className={`relative flex flex-row items-center h-14 px-5 text-lg ${borderColor} border-b-2 focus:outline-none ${hoverColor} hover:text-white`}
              >
                <FaCheckCircle className="text-2xl" />
                <span className="ml-3 text-base font-semibold">Transferencia</span>
              </Link>
            </li>
            <li>
              <Link
                to="/cargarSaldo"
                className={`relative flex flex-row items-center h-14 px-5 text-lg ${borderColor} border-b-2 focus:outline-none ${hoverColor} hover:text-white`}
              >
                <FaUsers className="text-2xl" />
                <span className="ml-3 text-base font-semibold">Cargar Saldo</span>
              </Link>
            </li>
            <li>
              <Link
                to="/cuentas"
                className={`relative flex flex-row items-center h-14 px-5 text-lg ${borderColor} border-b-2 focus:outline-none ${hoverColor} hover:text-white`}
              >
                <FaStore className="text-2xl" />
                <span className="ml-3 text-base font-semibold">Pagar Cuentas</span>
              </Link>
            </li>
            {/* Cerrar Sesión */}
            <li>
              <button
                onClick={() => {
                  clearAuthData();
                  setIsOpen(false);
                }}
                className={`relative flex flex-row items-center h-14 px-5 text-lg ${borderColor} border-b-2 focus:outline-none ${hoverColor} hover:text-white w-full text-left`}
              >
                <FaSignOutAlt className="text-2xl" />
                <span className="ml-3 text-base font-semibold">Cerrar Sesión</span>
              </button>
            </li>
          </ul>
          <p className="mb-10 px-6 py-3 hidden md:block text-center text-sm">Copyright @2024</p>
        </div>
      </div>

      {/* Fondo oscuro */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-10 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
};

export default MenuSliceBar;
