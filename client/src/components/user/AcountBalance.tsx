import { useEffect, useState } from "react";
import { useAppStore } from "../../store/useAppStore";
import { getAccountData } from "../../network/fetchApiUsers";

type AccountDetails = {
  _id: string;
  cvu: string;
  balancePeso: number;
  balanceDolar: number;
  account: string;
  __v: number;
};

const AccountBalance = () => {
  const [account, setAccount] = useState<AccountDetails | null>(null); // Cambiar tipo y permitir null
  const { userId, token } = useAppStore();

  useEffect(() => {
    console.log("UserID:", userId, "Token:", token);
    const fetchAccount = async () => {
      if (!userId || !token) {
        console.error("Faltan datos para realizar la petición.");
        return;
      }
      try {
        const { data } = await getAccountData(userId, token);
        console.log("Response data:", data);
        setAccount(data); 
      } catch (error) {
        console.error("Error fetching account data:", error);
      }
    };

    fetchAccount();
  }, [userId, token]);

  if (!account) return <p>Cargando datos de la cuenta...</p>;

  return (
    <div className="overflow-x-auto whitespace-nowrap space-x-4 flex mt-8">
      <div className="min-w-[300px] max-w-sm bg-white rounded-lg shadow-md p-4 m-2">
        <h3 className="font-bold text-lg">Cuenta Corriente</h3>
        <p className="text-sm text-gray-600">N° CVU: {account.cvu}</p>
        <p className="font-medium text-green-600">Saldo en Pesos: ${account.balancePeso}</p>
        <p className="font-medium text-blue-600">Saldo en Dólares: ${account.balanceDolar}</p>
      </div>
    </div>
  );
};

export default AccountBalance;
