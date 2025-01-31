import { useAppStore } from "@/store/useAppStore";
import { useState } from "react";
import { FaHome, FaCheckCircle, FaUsers, FaStore, FaSignOutAlt } from "react-icons/fa";
import { FiMenu, FiX } from "react-icons/fi";
import { Link } from "react-router-dom";

const MenuSliceBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { clearAuthData } = useAppStore();

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
        } lg:w-64`}
      >
        <div className="overflow-y-auto flex flex-col justify-between flex-grow">
          <ul className={`flex flex-col py-4 space-y-1 ${isOpen ? "block" : "hidden"} lg:block`}>
            <li>
              <Link
                to="/"
                className="relative border-orange-400 border-b-2 flex flex-row items-center h-11 focus:outline-none hover:bg-cyan-500 text-gray-600 hover:text-white hover:border-cyan-500"
              >
                <span className="inline-flex justify-center items-center ml-4 text-lg">
                  <FaHome />
                </span>
                <span className="ml-2 text-sm tracking-wide truncate">Inicio</span>
              </Link>
            </li>
            <li>
              <Link
                to="/transferencia"
                className="relative border-orange-400 border-b-2 flex flex-row items-center h-11 focus:outline-none hover:bg-cyan-500 text-gray-600 hover:text-white hover:border-cyan-500"
              >
                <span className="inline-flex justify-center items-center ml-4 text-lg">
                  <FaCheckCircle />
                </span>
                <span className="ml-2 text-sm tracking-wide truncate">Transferencia</span>
              </Link>
            </li>
            <li>
              <Link
                to="/cargarSaldo"
                className="relative border-orange-400 border-b-2 flex flex-row items-center h-11 focus:outline-none hover:bg-cyan-500 text-gray-600 hover:text-white hover:border-cyan-500"
              >
                <span className="inline-flex justify-center items-center ml-4 text-lg">
                  <FaUsers />
                </span>
                <span className="ml-2 text-sm tracking-wide truncate">Cargar Saldo</span>
              </Link>
            </li>
            <li>
              <Link
                to="/cuentas"
                className="relative border-orange-400 border-b-2 flex flex-row items-center h-11 focus:outline-none hover:bg-cyan-500 text-gray-600 hover:text-white hover:border-cyan-500"
              >
                <span className="inline-flex justify-center items-center ml-4 text-lg">
                  <FaStore />
                </span>
                <span className="ml-2 text-sm tracking-wide truncate">Pagar Cuentas</span>
              </Link>
            </li>
            {/* Cerrar Sesión */}
            <li>
              <button
                onClick={() => {
                  clearAuthData();
                  setIsOpen(false); 
                }}
                className="relative border-orange-400 border-b-2 flex flex-row items-center h-11 focus:outline-none hover:bg-cyan-500 text-gray-600 hover:text-white hover:border-cyan-500 w-full text-left"
              >
                <span className="inline-flex justify-center items-center ml-4 text-lg">
                  <FaSignOutAlt />
                </span>
                <span className="ml-2 text-sm tracking-wide truncate">Cerrar Sesión</span>
              </button>
            </li>
          </ul>
          <p className="mb-14 px-5 py-3 hidden md:block text-center text-xs">Copyright @2021</p>
        </div>
      </div>

      {/* Fondo oscuro  */}
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
