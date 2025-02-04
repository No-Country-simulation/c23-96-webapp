import { useEffect, useState } from "react";
import { getAllOffers, editOffer, deleteOffer, createOffer } from "../network/fetchApiOffer";
import Modal from "./ui/Modal";
import { useAppStore } from "@/store/useAppStore";

interface Offer {
  id: string;
  title: string;
  description: string;
  createdBy?: string;
  createdAt?: string;
}

const CarrucelOfOfter = ({ admin }: { admin: boolean }) => {
  const { token } = useAppStore();
  const [offers, setOffers] = useState<Offer[]>([]);
  const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [creatingOffer, setCreatingOffer] = useState(false);

  useEffect(() => {
    if (token) {
      fetchOffers();
    }
  }, [token]);

  const fetchOffers = async () => {
    try {
      const response = await getAllOffers(token);
      setOffers(response?.data || []);
    } catch (error) {
      console.error("Error fetching offers", error);
      setOffers([]);
    }
  };

  const handleEdit = (offer: Offer) => {
    setSelectedOffer(offer);
    setModalOpen(true);
  };

  const handleDelete = async (offerId: string) => {
    try {
      await deleteOffer(token, offerId);
      fetchOffers();
    } catch (error) {
      console.error("Error deleting offer", error);
    }
  };

  const handleCreate = () => {
    setSelectedOffer({ id: "", title: "", description: "" });
    setCreatingOffer(true);
    setModalOpen(true);
  };

  const handleSave = async () => {
    if (selectedOffer) {
      try {
        if (creatingOffer) {
          await createOffer(token, selectedOffer);
        } else {
          await editOffer(token, selectedOffer.id, selectedOffer);
        }
        setModalOpen(false);
        setCreatingOffer(false);
        fetchOffers();
      } catch (error) {
        console.error("Error saving offer", error);
      }
    }
  };

  return (
    <div className="overflow-x-auto whitespace-nowrap space-x-4 flex">
      {offers.length > 0 ? (
        offers.map((offer) => (
          <div key={offer.id} className="min-w-[250px] max-w-sm bg-white rounded-lg shadow-md p-4 m-2">
            <h3 className="font-bold text-lg">{offer.title}</h3>
            <p className="text-sm text-gray-600">{offer.description}</p>
            {admin && (
              <p className="text-xs text-gray-400">Fecha: {new Date(offer.createdAt || "").toLocaleDateString()}</p>
            )}
            {admin && (
              <div className="flex justify-between mt-2">
                <button 
                  onClick={() => handleEdit(offer)} 
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Editar
                </button>
                <button 
                  onClick={() => handleDelete(offer.id)} 
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Eliminar
                </button>
              </div>
            )}
          </div>
        ))
      ) : (
        <div className="w-full flex flex-col items-center justify-center mt-4">
          <p className="text-gray-500 text-center">No hay ofertas disponibles.</p>
          {admin && (
            <button
              onClick={handleCreate}
              className="mt-4 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
            >
              Crear Oferta
            </button>
          )}
        </div>
      )}

{admin && modalOpen && selectedOffer && (
  <Modal title={creatingOffer ? "Crear Oferta" : "Editar Oferta"} onClose={() => setModalOpen(false)}>
    <div className="w-full max-w-xl p-6 bg-white rounded-lg shadow-lg">
      <input
        type="text"
        value={selectedOffer.title}
        onChange={(e) => setSelectedOffer({ ...selectedOffer, title: e.target.value })}
        className="border p-3 w-full rounded text-lg"
        placeholder="Título de la oferta"
      />
      <textarea
        value={selectedOffer.description}
        onChange={(e) => setSelectedOffer({ ...selectedOffer, description: e.target.value })}
        className="border p-3 w-full rounded mt-4 text-lg min-h-[150px]"
        placeholder="Descripción de la oferta"
      />
      <button
        onClick={handleSave}
        className="mt-6 w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded text-lg"
      >
        {creatingOffer ? "Crear Oferta" : "Guardar Cambios"}
      </button>
    </div>
  </Modal>
)}

    </div>
  );
};

export default CarrucelOfOfter;
