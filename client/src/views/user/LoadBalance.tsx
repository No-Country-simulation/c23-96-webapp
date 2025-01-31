import { useState } from "react";
import { useForm } from "react-hook-form";
import { useAppStore } from "@/store/useAppStore";
import { transference } from "@/network/fetchApiTransaction";
import Modal from "../../components/ui/Modal";

import { toast } from "react-toastify";

const MobileBrands = () => {
  const { account, token } = useAppStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);

  const brands = [
    { name: "Samsung", image: "https://upload.wikimedia.org/wikipedia/commons/2/24/Samsung_Logo.svg" },
    { name: "Apple", image: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" },
    { name: "Xiaomi", image: "https://upload.wikimedia.org/wikipedia/commons/2/29/Xiaomi_logo.svg" },
    { name: "Motorola", image: "https://armoto.vtexassets.com/assets/vtex.file-manager-graphql/images/e8ab638f-14cc-4790-92b2-04118c9bfe7f___26c294aacc24ef1a99fd9b09d967da58.png" },
  ];

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      phoneNumber: "",
      amount: 0,
    },
  });

  const openModal = (brand: string) => {
    setSelectedBrand(brand);
    setValue("phoneNumber", "");
    setValue("amount", 0);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedBrand(null);
    reset();
  };

  const onSubmit = async (data: { phoneNumber: string; amount: number }) => {
    const requestData = {
      originAccount: account,
      destinationAccount: "679bc61db30416a98404e7ad",
      moneyType: "peso",
      type: "telefono",
      extra: data.phoneNumber,
      amount: data.amount,
    };

    try {
      const response = await transference(token, requestData);
      toast.success(response.message || "Carga de saldo realizada con éxito.");
      closeModal();
    } catch (error) {
      toast.error(error.message || "Error al realizar la carga de saldo.");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold mb-6 text-center">Selecciona una marca</h1>
      <div className="grid grid-cols-2 gap-4">
        {brands.map((brand) => (
          <button
            key={brand.name}
            className="flex flex-col items-center justify-center h-32 w-full rounded-lg shadow-md bg-gray-100"
            onClick={() => openModal(brand.name)}
          >
            {brand.image ? (
              <img
                src={brand.image}
                alt={brand.name}
                className="h-16 object-contain mb-2"
              />
            ) : (
              <div className="h-16 w-16 bg-gray-200 text-gray-500 flex items-center justify-center mb-2">
                {brand.name.charAt(0)}
              </div>
            )}
            <span className="text-sm font-medium text-gray-800">{brand.name}</span>
          </button>
        ))}
      </div>

      {isModalOpen && (
        <Modal onClose={closeModal}>
          <h2 className="text-lg font-bold mb-4">Cargar saldo - {selectedBrand}</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
                Número de teléfono
              </label>
              <input
                id="phoneNumber"
                type="text"
                {...register("phoneNumber", {
                  required: "El número de teléfono es obligatorio",
                  pattern: {
                    value: /^[0-9]{10}$/,
                    message: "Debe ser un número válido de 10 dígitos",
                  },
                })}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              />
              {errors.phoneNumber && (
                <p className="text-red-500 text-sm">{errors.phoneNumber.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
                Monto
              </label>
              <input
                id="amount"
                type="number"
                {...register("amount", {
                  required: "El monto es obligatorio",
                  min: { value: 1, message: "El monto debe ser mayor a 0" },
                })}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              />
              {errors.amount && (
                <p className="text-red-500 text-sm">{errors.amount.message}</p>
              )}
            </div>

            <div className="flex justify-end space-x-2">
              <button
                type="button"
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
                onClick={closeModal}
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
              >
                Cargar
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};

export default MobileBrands;