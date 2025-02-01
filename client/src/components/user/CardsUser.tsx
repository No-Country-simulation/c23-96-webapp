import { useEffect, useState } from "react";
import { useAppStore } from "../../store/useAppStore";
import { getCardsData } from "@/network/fetchApiUsers";

type Card = {
  _id: string;
  name: string;
  cardNumber: string;
  expirationDate: string;
  cvv: string;
  type: "peso" | "dolar";
  account: string;
};

const CardsUser: React.FC = () => {
  const [card, setCard] = useState<Card | null>(null);
  const { userId, token, isPesos } = useAppStore();

  useEffect(() => {
    const fetchCardsUser = async () => {
      if (!userId || !token) {
        console.log("Faltan Datos para realizar la petición");
        return;
      }
      try {
        const data: Card[] = await getCardsData(userId, token);
        if (data.length > 0) {
          const selectedCard = isPesos
            ? data.find((c) => c.type === "peso")
            : data.find((c) => c.type === "dolar");
          setCard(selectedCard || null);
        }
      } catch (error) {
        console.log("Error fetching account data:", error);
      }
    };
    fetchCardsUser();
  }, [userId, token, isPesos]);

  if (!card) return <p className="text-center mt-10">Cargando tarjeta...</p>;

  return (
    <div className="my-10 px-4">
      <div className="w-96 h-56 bg-red-100 rounded-xl relative text-white shadow-2xl transition-transform transform hover:scale-95">
        <img
          className="relative object-cover w-full h-full rounded-xl"
          src={isPesos ? "https://i.imgur.com/Zi6v09P.png" : "https://i.imgur.com/kGkSg1v.png"}
          alt="Card background"
        />
        <div className="w-full px-8 absolute top-8">
          <div className="flex justify-between">
            <div>
              <p className="font-light">Nombre</p>
              <p className="font-medium tracking-widest">{card.name}</p>
            </div>
          </div>
          <div className="pt-1">
            <p className="font-light">Número de Tarjeta</p>
            <p className="font-medium tracking-more-wider">{card.cardNumber}</p>
          </div>
          <div className="pt-6 pr-6">
            <div className="flex justify-between">
              <div>
                <p className="font-light text-xs">Expira</p>
                <p className="font-medium tracking-wider text-sm">{card.expirationDate}</p>
              </div>
              <div>
                <p className="font-light text-xs">CVV</p>
                <p className="font-bold tracking-more-wider text-sm">{card.cvv}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardsUser;