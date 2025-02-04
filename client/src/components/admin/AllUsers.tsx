import { useEffect, useState } from "react";
import { useAppStore } from "../../store/useAppStore";
import Modal from "../ui/Modal";
import { getAllUsers, getOneUser, editUser } from "@/network/fetchApiUsers";
import { useForm } from "react-hook-form";
import { TUser } from "@/types/function";

const AllUsers = () => {
  const { token } = useAppStore();
  const [users, setUsers] = useState<TUser[]>([]);
  const [selectedUser, setSelectedUser] = useState<TUser | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TUser>();

  useEffect(() => {
    if (!token) return;

    const fetchUsers = async () => {
      try {
        const response = await getAllUsers(token);

        if (response && response.data) {
          if (Array.isArray(response.data)) {
            setUsers(response.data);
          } else {
            console.warn("Se esperaba un array, pero se recibió:", response.data);
          }
        } else {
          console.warn("La respuesta no contiene datos válidos:", response);
        }
      } catch (error) {
        console.error("Error al obtener usuarios:", error);
      }
    };

    fetchUsers();
  }, [token]);

  const openModal = async (userId: string) => {
    if (!token) return;

    try {
      const response = await getOneUser(token, userId);

      if (response?.data) {
        setSelectedUser(response.data);
        reset(response.data);
        setIsModalOpen(true);
      } else {
        console.warn("No se pudo obtener la información del usuario:", response);
      }
    } catch (error) {
      console.error("Error al obtener detalles del usuario:", error);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
    reset();
  };

  const onSubmit = async (data: TUser) => {
    if (!token || !selectedUser) return;

    try {
      await editUser(token, selectedUser._id, data);

      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === selectedUser._id ? { ...user, ...data } : user
        )
      );

      closeModal();
    } catch (error) {
      console.error("Error al editar usuario:", error);
    }
  };

  return (
    <div className=" bg-gray-50 p-6 rounded-lg shadow-xl">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
        Lista de Usuarios
      </h2>

      <div className="overflow-x-auto">
        <table className="min-w-full table-auto text-sm">
          <thead>
            <tr className="bg-indigo-600 text-white">
              <th className="px-6 py-3 text-left">Nombre</th>
              <th className="px-6 py-3 text-left">Apellido</th>
              <th className="px-6 py-3 text-left">Email</th>
              <th className="px-6 py-3 text-left">Teléfono</th>
              <th className="px-6 py-3 text-left">Rol</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-4">No hay usuarios</td>
              </tr>
            ) : (
              users.map((user) => (
                <tr
                  key={user._id}
                  onClick={() => openModal(user._id)}
                  className="border-b hover:bg-indigo-50 cursor-pointer"
                >
                  <td className="px-6 py-4">{user.name}</td>
                  <td className="px-6 py-4">{user.lastname}</td>
                  <td className="px-6 py-4">{user.email}</td>
                  <td className="px-6 py-4">{user.phone}</td>
                  <td className="px-6 py-4">{user.rol}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && selectedUser && (
        <Modal onClose={closeModal}>
          <div className="bg-white rounded-lg shadow-xl p-6 max-w-md mx-auto">
            <h2 className="text-2xl font-semibold text-gray-800 text-center mb-4">
              Detalles del Usuario
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <input
                type="text"
                {...register("name")}
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Nombre"
              />
              <input
                type="text"
                {...register("lastname")}
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Apellido"
              />
              <input
                type="email"
                {...register("email")}
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Email"
              />
              <input
                type="text"
                {...register("phone")}
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Teléfono"
              />
              <input
                type="text"
                {...register("address")}
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Dirección"
              />
              <input
                type="text"
                {...register("rol")}
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Rol"
              />

              <div className="mt-6 flex justify-between">
                <button
                  type="button"
                  onClick={closeModal}
                  className="bg-gray-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-gray-600 transition-all"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-indigo-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-indigo-700 transition-all"
                >
                  Guardar Cambios
                </button>
              </div>
            </form>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default AllUsers;
