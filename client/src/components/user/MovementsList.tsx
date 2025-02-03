import { BiTransferAlt } from "react-icons/bi";
import { MdAttachMoney, MdMedicalServices } from "react-icons/md";
import { SiMoneygram } from "react-icons/si";
import { FaPhoneVolume } from "react-icons/fa6";
import { IoCardOutline } from "react-icons/io5";
import { MdAddShoppingCart } from "react-icons/md";
import { IoRestaurantSharp } from "react-icons/io5";
import { useEffect, useState } from "react";
import { useAppStore } from "../../store/useAppStore";
import { getTransactions, TTransaction } from "@/network/fetchApiTransaction";


const MovementsList = () => {
  const { token, account } = useAppStore();
  const [transactions, setTransactions] = useState<TTransaction[]>([]);

  const idAccount: string = account?.account

  useEffect(() => {
    if (!idAccount || !token) {
      console.error("Faltan datos para realizar la petición.");
      return;
    }

    
    getTransactions(token, idAccount)
      .then(setTransactions)
      .catch((error) => console.error("Error fetching account data:", error));
  }, [idAccount, token]);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "transferencia":
      case "transfer":
        return <BiTransferAlt />;
      case "obra social":
        return <MdMedicalServices />;
      case "sueldo":
        return <SiMoneygram />;
      case "telefono":
        return <FaPhoneVolume />;
      case "debito":
        return <IoCardOutline />;
      case "shopping":
        return <MdAddShoppingCart />;
      case "restaurant":
        return <IoRestaurantSharp />;
      default:
        return <MdAttachMoney />;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mt-8">
      <div className="flex justify-between my-3 border-b-2">
        <h3 className="font-bold text-lg mb-4">Últimos Movimientos</h3>
        <button className="text-blue-700 font-bold">Ver Todos</button>
      </div>
      <ul className="space-y-2">
        {transactions.map(({ _id, type, moneyType, date, amount }) => (
          <li key={_id} className="flex justify-between items-center border-b pb-2">
            <div className="flex items-center space-x-2">
              {getCategoryIcon(type)}
              <div>
                <p className="font-medium">{type}</p>
                <p className="text-sm text-gray-600">
                  {moneyType} • {new Date(date).toLocaleDateString()}
                </p>
              </div>
            </div>
            <p className={`font-bold ${amount < 0 ? "text-red-600" : "text-green-600"}`}>
              {amount < 0 ? "-" : "+"}${Math.abs(amount)}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovementsList;
