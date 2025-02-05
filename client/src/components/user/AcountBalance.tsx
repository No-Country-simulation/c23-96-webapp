import { useEffect, useState } from "react";
import { useAppStore } from "../../store/useAppStore";
import { getAccountData } from "../../network/fetchApiUsers";
import Modal from "../ui/Modal";
import { buyDollars, buyPesos } from "@/network/fetchApiTransaction";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type AccountDetails = {
  _id: string;
  cvu: string;
  balancePeso: number;
  balanceDolar: number;
  account: string;
};

const AccountBalance = () => {
  const [account, setAccount] = useState<AccountDetails | null>(null);
  const { userId, token, isPesos, getAccount } = useAppStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [amount, setAmount] = useState("");

  useEffect(() => {
    const fetchAccount = async () => {
      if (!userId || !token) {
        console.error("Faltan datos para realizar la petición.");
        return;
      }
      try {
        const data = await getAccountData(userId, token);
        getAccount(data);
        setAccount(data);
        localStorage.setItem("account", JSON.stringify(data));
      } catch (error) {
        console.error("Error fetching account data:", error);
      }
    };

    fetchAccount();
  }, [userId, token]);

  const handleBuy = async () => {
    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      toast.error("Ingrese una cantidad válida");
      return;
    }

    try {
      if (isPesos) {
        await buyPesos(token, amount, account?._id);
      } else {
        await buyDollars(token, account?._id, amount);
      }

      toast.success("Compra realizada con éxito");
      setAmount(""); 
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error al comprar:", error);
      toast.error("Hubo un error en la compra");
      setIsModalOpen(false); 
    }
  };

  if (!account) return <p>Cargando datos de la cuenta...</p>;
  const bgColor = isPesos ? "bg-principal" : "bg-blue-400";

  return (
    <div
      className={`min-w-[300px] w-96 h-56 ${bgColor} bg-gradient-to-r text-white rounded-2xl shadow-lg p-6 m-4 flex flex-col items-center justify-center`}
    >
      <h3 className="font-extrabold text-xl text-center mb-4">
        {isPesos ? "Cuenta Corriente" : "Cuenta Dólar"}
      </h3>
      <div className="space-y-2 text-center">
        <p className="text-sm">
          <span className="font-semibold">N° CVU:</span> {account.cvu}
        </p>
        <p className="font-bold text-2xl text-green-700">
          $
          {isPesos
            ? account.balancePeso.toFixed(2)
            : account.balanceDolar.toFixed(2)}
        </p>
        <p className="text-sm">
          <span className="font-semibold">N° Cuenta:</span> {account.account}
        </p>
      </div>
      <div className="mt-4">
        <button
          onClick={() => setIsModalOpen(true)}
          className={`bg-white ${
            isPesos ? "text-principal" : "text-blue-500"
          } font-semibold px-4 py-2 rounded-lg shadow-md hover:bg-gray-100 transition`}
        >
          {isPesos ? "Comprar Pesos" : "Comprar Dólares"}
        </button>
      </div>

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <h2 className="text-lg text-black font-semibold mb-4">
            Ingrese la cantidad que tiene para Comprar
          </h2>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="border p-2 rounded w-full text-black mb-4"
            placeholder="Ingrese la cantidad"
          />
          <button
            onClick={handleBuy}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
          >
            Confirmar Compra
          </button>
        </Modal>
      )}
    </div>
  );
};

export default AccountBalance;
