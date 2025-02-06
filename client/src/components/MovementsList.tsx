import { useEffect, useState } from "react";
import { useAppStore } from "../store/useAppStore";
import {
  getTransactions,
  TTransaction,
  getTransaction,
  getAllTransactions,
} from "@/network/fetchApiTransaction";

import Modal from "./ui/Modal";
import { BiTransferAlt } from "react-icons/bi";
import { MdAttachMoney, MdMedicalServices } from "react-icons/md";
import { SiMoneygram } from "react-icons/si";
import { FaPhoneVolume } from "react-icons/fa6";
import { IoCardOutline, IoRestaurantSharp } from "react-icons/io5";
import { MdAddShoppingCart } from "react-icons/md";

const MovementsList = ({ admin }: { admin: boolean }) => {
  const { token, account, isPesos } = useAppStore();
  const [transactions, setTransactions] = useState<TTransaction[]>([]);
  const [selectedTransaction, setSelectedTransaction] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const idAccount = account?.account;

  useEffect(() => {
    if (!token) return;
    if (!admin && !idAccount) return;
    const fetchData = async () => {
      try {
        let data;
        if (admin) {
          data = await getAllTransactions(token);
        } else {
          data = await getTransactions(token, idAccount);
        }
    
        console.log("API Response:", data);
    
        if (!Array.isArray(data)) {
          setTransactions([]); 
          return;
        }
    
        setTransactions(data);
      } catch (error) {
        console.error("Error fetching transactions:", error);
        setTransactions([]); 
      }
    };
    
    fetchData();
  }, [idAccount, token, admin]);

  const openModal = async (transactionId: string) => {
    if (!token) return;
    try {
      const response = await getTransaction(token, transactionId);
      setSelectedTransaction(response.transaction);
      setIsModalOpen(true);
    } catch (error) {
      console.error("Error fetching transaction details:", error);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTransaction(null);
  };

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

  const filteredTransactions = transactions.filter((transaction) => {
    if (!transaction.moneyType) return false;
    return transaction.moneyType.toLowerCase() === (isPesos ? "peso" : "dolar");
  });

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mt-8 w-full">
      <div className="flex justify-between my-3 border-b-2">
        <h3 className="font-bold text-lg mb-4">Últimos Movimientos</h3>
        <button className="text-blue-700 font-bold">Ver Todos</button>
      </div>
      <ul className="space-y-2">
        {filteredTransactions.map(({ _id, type, moneyType, date, amount }) => (
          <li
            key={_id}
            className="flex justify-between items-center border-b pb-2 cursor-pointer hover:bg-gray-100 p-2"
            onClick={() => openModal(_id)}
          >
            <div className="flex items-center space-x-2">
              {getCategoryIcon(type)}
              <div>
                <p className="font-medium">{type}</p>
                <p className="text-sm text-gray-600">
                  {moneyType} • {new Date(date).toLocaleDateString()}
                </p>
              </div>
            </div>
            <p
              className={`font-bold ${
                amount < 0 ? "text-red-600" : "text-green-600"
              }`}
            >
              {amount < 0 ? "-" : "+"}${Math.abs(amount)}
            </p>
          </li>
        ))}
      </ul>

      {isModalOpen && selectedTransaction && (
        <Modal onClose={closeModal}>
          <div className="bg-white rounded-lg shadow-xl p-6 max-w-md mx-auto">
            <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">
              Detalles de la Transferencia
            </h2>

            <div className="flex items-center justify-center mb-4">
              <span className="text-4xl text-blue-600">
                {getCategoryIcon(selectedTransaction.type)}
              </span>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between border-b pb-2">
                <span className="text-gray-600">Tipo</span>
                <span className="font-medium">{selectedTransaction.type}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-gray-600">Monto</span>
                <span
                  className={`font-bold ${
                    selectedTransaction.amount < 0
                      ? "text-red-600"
                      : "text-green-600"
                  }`}
                >
                  {selectedTransaction.amount < 0 ? "-" : "+"}$
                  {Math.abs(selectedTransaction.amount)}
                </span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-gray-600">Moneda</span>
                <span className="font-medium">
                  {selectedTransaction.moneyType}
                </span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-gray-600">Fecha</span>
                <span className="font-medium">
                  {new Date(selectedTransaction.date).toLocaleString()}
                </span>
              </div>
              {selectedTransaction.extra && (
                <div className="flex justify-between border-b pb-2">
                  <span className="text-gray-600">Notas</span>
                  <span className="font-medium">
                    {selectedTransaction.extra}
                  </span>
                </div>
              )}
              {selectedTransaction.destinationAccount && (
                <div className="flex justify-between border-b pb-2">
                  <span className="text-gray-600">Destino (CVU)</span>
                  <span className="font-medium">
                    {selectedTransaction.destinationAccount.cvu}
                  </span>
                </div>
              )}
            </div>

            <div className="mt-6 flex justify-center">
              <button
                onClick={closeModal}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-700 transition-all"
              >
                Cerrar
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default MovementsList;
