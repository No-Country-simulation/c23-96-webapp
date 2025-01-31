import { fetchData } from "./util/fetchFunction";
import SummaryApi from "./SummaryApi";

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
    `${SummaryApi.GetAcountUser.url}account/${userID}`,
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


