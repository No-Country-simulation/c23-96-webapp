import { useAppStore } from "@/store/useAppStore";
import { transference } from "../network/fetchApiTransaction";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TTransaction } from "@/types";

interface TransferFormInputs {
  destinationAccount: string;
  moneyType: "peso" | "dolar";
  amount: number;
}

const TransferForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TransferFormInputs>();

  const { token, account } = useAppStore();

  const onSubmit: SubmitHandler<TransferFormInputs> = async (data) => {
    if (!token) {
      return;
    }
    
    const transactionData: TTransaction = {
      ...data,
      originAccount: account,
      type: "transferencia",
    };

    try {
      const response = await transference(token, transactionData);
      toast.success(response.message || "Transferencia realizada con éxito.");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Error al realizar la transferencia.");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Formulario de Transferencia</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label htmlFor="destinationAccount" className="block text-sm font-medium text-gray-700">
            Cuenta de destino
          </label>
          <input
            id="destinationAccount"
            type="text"
            {...register("destinationAccount", { required: "La cuenta de destino es obligatoria" })}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
          {errors.destinationAccount && <p className="text-red-500 text-sm">{errors.destinationAccount.message}</p>}
        </div>

        <div>
          <label htmlFor="moneyType" className="block text-sm font-medium text-gray-700">
            Tipo de moneda
          </label>
          <select
            id="moneyType"
            {...register("moneyType", { required: "El tipo de moneda es obligatorio" })}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="">Selecciona una opción</option>
            <option value="peso">Peso</option>
            <option value="dolar">Dólar</option>
          </select>
          {errors.moneyType && <p className="text-red-500 text-sm">{errors.moneyType.message}</p>}
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
          <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
            Transferir
          </button>
        </div>
      </form>
    </div>
  );
};

export default TransferForm;
