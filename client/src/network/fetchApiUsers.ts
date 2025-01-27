import { ApiResponse } from "../types/function";
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
): Promise<ApiResponse<AccountDetails>> {
  return fetchData(`${SummaryApi.GetAcountUser.url}account/${userID}`, {
    method: SummaryApi.GetAcountUser.method,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
}
