import { BiTransferAlt } from "react-icons/bi";
import { MdAttachMoney, MdMedicalServices } from "react-icons/md";
import { SiMoneygram } from "react-icons/si";
import { FaPhoneVolume } from "react-icons/fa6";
import { IoCardOutline } from "react-icons/io5";
import { MdAddShoppingCart } from "react-icons/md";
import { IoRestaurantSharp } from "react-icons/io5";

const MovementsList = () => {

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "transferencias":
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

  const movimientos = [
    { id: 1, razon: "Pago supermercado", categoria: "transferencias", fecha: "03/01", monto: "-$150.00" },
    { id: 2, razon: "Transferencia", categoria: "obra social", fecha: "02/01", monto: "+$500.00" },
    { id: 3, razon: "Transferencia", categoria: "sueldo", fecha: "02/01", monto: "+$500.00" },
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mt-8">
      <div className="flex justify-between my-3 border-b-2">
        <h3 className="font-bold text-lg mb-4">Últimos Movimientos</h3>
        <button className="text-blue-700 font-bold">Ver Todos</button>
      </div>
      <ul className="space-y-2">
        {movimientos.map((movimiento) => (
          <li key={movimiento.id} className="flex justify-between items-center border-b pb-2">
            <div className="flex items-center space-x-2">
              {getCategoryIcon(movimiento.categoria)}
              <div>
                <p className="font-medium">{movimiento.razon}</p>
                <p className="text-sm text-gray-600">{movimiento.categoria} • {movimiento.fecha}</p>
              </div>
            </div>
            <p className={`font-bold ${movimiento.monto.startsWith("-") ? "text-red-600" : "text-green-600"}`}>
              {movimiento.monto}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MovementsList;
