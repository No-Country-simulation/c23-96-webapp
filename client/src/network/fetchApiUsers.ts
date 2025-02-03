import { fetchData } from "./util/fetchFunction";
import SummaryApi from "./util/SummaryApi";

type AccountDetails = {
  _id: string;
  cvu: string;
  balancePeso: number;
  balanceDolar: number;
  account: string;
  __v: number;
};

// Get Account data of user
export async function getAccountData(
  userID: string,
  token: string
): Promise<AccountDetails> {
  const data = await fetchData(
    `${SummaryApi.GetAcountUser.url}${userID}`,
    {
      method: SummaryApi.GetAcountUser.method,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (data && data._id) {
    return data; 
  }

  throw new Error("La estructura de la respuesta del servidor no es válida.");
}

type Card = {
  _id: string;
  name: string;
  cardNumber: string;
  expirationDate: string;
  cvv: string;
  type: "peso" | "dolar";
  account: string;
};

export async function getCardsData(userID: string, token: string): Promise<Card[]> {
  const data = await fetchData(`${SummaryApi.GetCardsUser.url}${userID}`, {
    method: SummaryApi.GetCardsUser.method,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (Array.isArray(data)) {
    return data;
  }

  throw new Error("La estructura de la respuesta del servidor no es válida.");
}


