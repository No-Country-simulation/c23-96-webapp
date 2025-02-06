import { useState } from "react";
import { useForm } from "react-hook-form";
import Modal from "../../components/ui/Modal";
import { useAppStore } from "@/store/useAppStore";
import { transference } from "@/network/fetchApiTransaction";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TransactionData } from "@/types";

interface FormData {
  service: string;
  amount: number;
}

const PayDebts = () => {
  const { account, token } = useAppStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<string | null>(null);

  const services = [
    "Luz", "Agua", "Gas", "Internet", "Teléfono",
    "Cable", "Impuestos", "Seguro", "Mantenimiento",
    "Tarjeta de Crédito", "Multas", "Colegiaturas",
    "Streaming", "Hipoteca", "Préstamos",
  ];

  const serviceTypeMap: Record<string, string> = {
    "Obra social": "obra social",
    Teléfono: "telefono",
    Impuestos: "impuesto",
    Hipoteca: "casa",
    Colegiaturas: "colegio",
    "Tarjeta de Crédito": "auto",
  };

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      service: "",
      amount: 0,
    },
  });

  const openModal = (service: string) => {
    setSelectedService(service);
    setValue("service", service);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedService(null);
    reset();
  };

  const onSubmit = async (data: FormData) => {
    const transactionData: TransactionData = {
      originAccount: account._id,
      destinationAccount: "679bc61db30416a98404e7ad",
      moneyType: "peso",
      type: serviceTypeMap[data.service] || "otro",
      extra: data.service,
      amount: data.amount ?? 0,

    };
    
    try {
      const response = await transference(token ?? "", transactionData);
      toast.success(response.message || "Pago realizado con éxito.");
      closeModal();
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message || "Error al realizar la transacción.");
      } else {
        toast.error("Error desconocido.");
      }
    }
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
            <div className="text-2xl text-gray-700 mb-2">💳</div>
            <span className="text-sm font-medium text-gray-800">{service}</span>
          </button>
        ))}
      </div>

      {isModalOpen && (
        <Modal onClose={closeModal}>
          <h2 className="text-lg font-bold mb-4">Pagar deuda - {selectedService}</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Servicio</label>
              <input
                type="text"
                {...register("service")}
                disabled
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md bg-gray-100"
              />
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
              {errors.amount && <p className="text-red-500 text-sm">{errors.amount.message}</p>}
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
