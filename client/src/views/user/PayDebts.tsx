import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Modal from "../../components/ui/Modal";

interface FormData {
  accountNumber: string;
  amount: number;
}

const PayDebts = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<string | null>(null);

  const services = [
    "Luz",
    "Agua",
    "Gas",
    "Internet",
    "Teléfono",
    "Cable",
    "Impuestos",
    "Seguro",
    "Mantenimiento",
    "Tarjeta de Crédito",
    "Multas",
    "Colegiaturas",
    "Streaming",
    "Hipoteca",
    "Préstamos",
  ];

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  const openModal = (service: string) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedService(null);
    reset();
  };

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log(`Servicio: ${selectedService}, Datos:`, data);
    closeModal();
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Selecciona un servicio para pagar</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {services.map((service) => (
          <button
            key={service}
            className="flex flex-col items-center justify-center h-24 w-full rounded-lg shadow-md bg-gray-100 hover:bg-blue-100"
            onClick={() => openModal(service)}
          >
            <div className="text-2xl text-gray-700 mb-2">
              {/* Ícono opcional */}
              💳
            </div>
            <span className="text-sm font-medium text-gray-800">{service}</span>
          </button>
        ))}
      </div>

      {isModalOpen && (
        <Modal onClose={closeModal}>
          <h2 className="text-lg font-bold mb-4">
            Pagar deuda - {selectedService}
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label
                htmlFor="accountNumber"
                className="block text-sm font-medium text-gray-700"
              >
                Número de cuenta
              </label>
              <input
                id="accountNumber"
                type="text"
                {...register("accountNumber", {
                  required: "El número de cuenta es obligatorio",
                  pattern: {
                    value: /^[0-9]+$/,
                    message: "Debe ser un número válido",
                  },
                })}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              />
              {errors.accountNumber && (
                <p className="text-red-500 text-sm">
                  {errors.accountNumber.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="amount"
                className="block text-sm font-medium text-gray-700"
              >
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
                Pagar
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};

export default PayDebts;
