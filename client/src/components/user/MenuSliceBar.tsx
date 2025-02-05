import { useAppStore } from "@/store/useAppStore";
import { useState } from "react";
import { FaHome, FaCheckCircle, FaUsers, FaStore, FaSignOutAlt } from "react-icons/fa";
import { FiX } from "react-icons/fi";
import { Link } from "react-router-dom";

const MenuSliceBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { clearAuthData, isPesos } = useAppStore(); 

  const bgColor = isPesos ? "bg-principal" : "bg-blue-400"; 
  const hoverColor = isPesos ? "hover:bg-cyan-500" : "hover:bg-blue-500"; 
  const borderColor = isPesos ? "border-orange-400" : "border-blue-200"; 
  const buttonColor = isPesos ? "bg-orange-500" : "bg-white text-blue-500";

  return (
    <div className="flex">
      {/* Menú principal */}
      <div
        className={`fixed flex flex-col left-0 h-full text-gray-700 transition-all duration-300 z-20 ${bgColor} ${
          isOpen ? "w-64" : "w-0"
        } lg:w-1/3 lg:block overflow-hidden top-0`}
      >
        <div className="overflow-y-auto flex flex-col justify-between flex-grow relative h-full">
          <button 
            className="absolute top-1/2 right-0 transform -translate-y-1/2  text-white p-2 rounded-l-md lg:hidden"
            onClick={() => setIsOpen(false)}
          >
           
          </button>

          <ul className={`flex flex-col md:mt-16 py-6 space-y-2 ${isOpen ? "block" : "hidden"} lg:block`}>
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
        </div>
      </div>

      {/* Botón de menú */}
      <div className="fixed top-1/2 left-2 transform -translate-y-1/2 z-30 lg:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`text-3xl p-3 rounded-md focus:outline-none ${buttonColor}`}
        >
          <FiX />
        </button>
      </div>

      {/* Fondo oscuro */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-10 lg:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default MenuSliceBar;
