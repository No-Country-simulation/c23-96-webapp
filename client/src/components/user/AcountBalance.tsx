import { useAppStore } from "@/store/useAppStore";

const AcountBalance = () => {

  const {user} = useAppStore();

  const id = user?._id

  const getAccountData async (id) => {
    const data = await getAccountData(id)
    
  }

  const cuentas = [
    { id: 1, tipo: "Cuenta Corriente", numero: "****1234", saldo: "$20,000" },
    { id: 2, tipo: "Cuenta Crédito", numero: "****5678", saldo: "$15,000" },
  ];
  return (
    <div className="overflow-x-auto whitespace-nowrap space-x-4 flex mt-8">
      {cuentas.map((cuenta) => (
        <div
          key={cuenta.id}
          className="min-w-[300px] max-w-sm bg-white rounded-lg shadow-md p-4 m-2"
        >
          <h3 className="font-bold text-lg">{cuenta.tipo}</h3>
          <p className="text-sm text-gray-600">N° {cuenta.numero}</p>
          <p className="font-medium text-green-600">Saldo: {cuenta.saldo}</p>
        </div>
      ))}
    </div>
  );
};

export default AcountBalance;
