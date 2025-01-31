

const CarrucelOfOfter = () => {
  const novedades = [
    { id: 1, titulo: "Nueva tarjeta disponible", descripcion: "Solicita tu tarjeta de crédito ahora." },
    { id: 2, titulo: "Descuento en compras", descripcion: "10% en compras con débito este mes." },
    { id: 3, titulo: "Actualización de la app", descripcion: "Descubre las nuevas funcionalidades." },
  ];
  return (
    <div className="overflow-x-auto whitespace-nowrap space-x-4 flex">
    {novedades.map((novedad) => (
      <div
        key={novedad.id}
        className="min-w-[250px] max-w-sm bg-white rounded-lg shadow-md p-4 m-2"
      >
        <h3 className="font-bold text-lg">{novedad.titulo}</h3>
        <p className="text-sm text-gray-600">{novedad.descripcion}</p>
      </div>
    ))}
  </div>
  );
};

export default CarrucelOfOfter;
