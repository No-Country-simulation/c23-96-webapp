import { ApiResponse } from "@/types/function";
import { fetchData } from "./util/fetchFunction";
import SummaryApi from "./util/SummaryApi";
import { Card, TAccount, TUser } from "@/types";



function getAuthHeaders(token: string) {
  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
}

export async function getAccountData(
  userID: string,
  token: string
): Promise<TAccount> {
  return await fetchData<TAccount>
  (`${SummaryApi.GetAcountUser.url}${userID}`, {
    method: SummaryApi.GetAcountUser.method,
    headers: getAuthHeaders(token),
  });
 
}


export async function getCardsData(userID: string, token: string): Promise<Card[]> {
  return await fetchData<Card[]>(
    `${SummaryApi.GetCardsUser.url}${userID}`,
    {
      method: SummaryApi.GetCardsUser.method,
      headers: getAuthHeaders(token),
    }
  );
}


export async function getAllUsers(
  token: string
): Promise<TUser[]> {
  return fetchData<TUser[]>(SummaryApi.GetAllUser.url, {
    method: SummaryApi.GetAllUser.method,
    headers: getAuthHeaders(token),
  });
}

export async function getOneUser(
  token: string,
  userId: string
): Promise<TUser> {
  return fetchData<TUser>(`${SummaryApi.GetUser.url}${userId}`, {
    method: SummaryApi.GetUser.method,
    headers: getAuthHeaders(token),
  });
}

export async function editUser(
  token: string,
  userId: string,
  updatedData: Partial<TUser>
): Promise<ApiResponse<TUser>> {
  return fetchData<ApiResponse<TUser>>(`${SummaryApi.EditUser.url}${userId}`, {
    method: SummaryApi.EditUser.method,
    headers: getAuthHeaders(token),
    body: JSON.stringify(updatedData),
  });
}
