import React from 'react'

const MovementsList = () => {
    const movimientos = [
        { id: 1, razon: "Pago supermercado", categoria: "Compras", fecha: "03/01", monto: "-$150.00" },
        { id: 2, razon: "Transferencia", categoria: "Envíos", fecha: "02/01", monto: "+$500.00" },
      ];
  return (

    <div className="bg-white rounded-lg shadow-md p-4 mt-8">
      <h3 className="font-bold text-lg mb-4">Últimos Movimientos</h3>
      <ul className="space-y-2">
        {movimientos.map((movimiento) => (
          <li
            key={movimiento.id}
            className="flex justify-between items-center border-b pb-2"
          >
            <div>
              <p className="font-medium">{movimiento.razon}</p>
              <p className="text-sm text-gray-600">{movimiento.categoria} • {movimiento.fecha}</p>
            </div>
            <p className={`font-bold ${movimiento.monto.startsWith("-") ? "text-red-600" : "text-green-600"}`}>
              {movimiento.monto}
            </p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default MovementsList