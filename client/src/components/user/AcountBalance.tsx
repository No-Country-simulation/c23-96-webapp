import { useEffect, useState } from "react";
import { useAppStore } from "../../store/useAppStore";
import { getAccountData } from "../../network/fetchApiUsers";

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

  useEffect(() => {
    
    const fetchAccount = async () => {
      if (!userId || !token) {
        console.error("Faltan datos para realizar la petición.");
        return;
      }
      try {
        const data = await getAccountData(userId, token);
        getAccount(data)
        setAccount(data);
        localStorage.setItem("account", JSON.stringify(data))
      } catch (error) {
        console.error("Error fetching account data:", error);
      }
    };

    fetchAccount();
  }, [userId, token]);

  if (!account) return <p>Cargando datos de la cuenta...</p>;
  const bgColor = isPesos ? "bg-principal" : "bg-blue-400"

  return (
    <div className={`min-w-[300px] w-96 h-56 ${bgColor} bg-gradient-to-r   text-white rounded-2xl shadow-lg p-6 m-4 flex flex-col items-center justify-center`} >
      <h3 className="font-extrabold text-xl text-center mb-4">
       {isPesos ? ("Cuenta Corriente"): ("Cuenta Dolar")}
      </h3>
      <div className="space-y-2 text-center">
        <p className="text-sm">
          <span className="font-semibold">N° CVU:</span> {account.cvu}
        </p>
        <p className="font-bold text-2xl text-green-700">
          ${isPesos ? (account.balancePeso) : (account.balanceDolar)}
        </p>
        <p className="text-sm">
          <span className="font-semibold">N° Cuenta:</span> {account.account}
        </p>
      </div>
      <div className="mt-4">
        <button className={`bg-white ${isPesos ? ("text-principal") : ("text-blue-500")} font-semibold px-4 py-2 rounded-lg shadow-md hover:bg-gray-100 transition`}>
          Ver detalles
        </button>
      </div>
    </div>
  );
};

export default AccountBalance;
