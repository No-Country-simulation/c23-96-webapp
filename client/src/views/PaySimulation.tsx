import { useState } from "react";
import { useForm } from "react-hook-form";
import Modal from "../components/ui/Modal";
import { useAppStore } from "@/store/useAppStore";
import { transference } from "@/network/fetchApiTransaction";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PaySimulation = () => {
  interface FormData {
    transactionType: string;
    account: string;
    amount: number;
    moneyType: string;
    extra?: string;
  }

  const { token } = useAppStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<string | null>(
    null
  );

  const transactions = [
    "Deposito",
    "Sueldo",
    "Subsidios",
    "Debito",
    "Retiro de Efectivo",
    "Subscripcion",
    "Restaurante",
    "Supermercado",
  ];

  const moneyTypeOptions = ["Peso", "Dolar"];
  const subscriptionOptions = [
    "Netflix",
    "Amazon",
    "YouTube",
    "Spotify",
    "Disney+",
  ];
  const debitOptions = [
    "Supermercado",
    "Electrónica",
    "Restaurante",
    "Ropa",
    "Farmacia",
  ];

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      transactionType: "",
      account: "",
      amount: 0,
      moneyType: "Peso",
      extra: "",
    },
  });

  const openModal = (transaction: string) => {
    setSelectedTransaction(transaction);
    setValue("transactionType", transaction);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTransaction(null);
    reset();
  };

  const onSubmit = async (data: FormData) => {
    const isSum = ["Deposito", "Sueldo", "Subsidios"].includes(
      data.transactionType
    );
    const originAccount = isSum ? "679bc61db30416a98404e7ad" : data.account;
    const destinationAccount = isSum
      ? data.account
      : "679bc61db30416a98404e7ad";

    const transactionData = {
      originAccount,
      destinationAccount,
      amount: data.amount,
      moneyType: data.moneyType.toLowerCase(),
      type: data.transactionType.toLowerCase(),
      extra: data.extra || data.moneyType,
    };

    try {
      const response = await transference(token, transactionData);
      toast.success(response.message || "Transacción realizada con éxito.");
      closeModal();
    } catch (error) {
      toast.error(error.message || "Error al realizar la transacción.");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Selecciona una operación</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {transactions.map((transaction) => (
          <button
            key={transaction}
            className="flex flex-col items-center justify-center h-24 w-full rounded-lg shadow-md bg-gray-100 hover:bg-blue-100"
            onClick={() => openModal(transaction)}
          >
            <div className="text-2xl text-gray-700 mb-2">💳</div>
            <span className="text-sm font-medium text-gray-800">
              {transaction}
            </span>
          </button>
        ))}
      </div>

      {isModalOpen && (
        <Modal onClose={closeModal}>
          <h2 className="text-lg font-bold mb-4">{selectedTransaction}</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Cuenta
              </label>
              <input
                type="text"
                {...register("account", {
                  required: "Este campo es obligatorio",
                })}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Monto
              </label>
              <input
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

            {selectedTransaction &&
              ["Debito", "Retiro de Efectivo", "Deposito", "Sueldo"].includes(
                selectedTransaction
              ) && (
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Moneda
                  </label>
                  <select
                    {...register("moneyType")}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  >
                    {moneyTypeOptions.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
              )}

            {selectedTransaction === "Subscripcion" && (
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Servicio
                </label>
                <select
                  {...register("extra")}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                >
                  {subscriptionOptions.map((service) => (
                    <option key={service} value={service}>
                      {service}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {selectedTransaction === "Debito" && (
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Categoría
                </label>
                <select
                  {...register("extra")}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                >
                  {debitOptions.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
            )}

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
                Confirmar
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};

export default PaySimulation;
