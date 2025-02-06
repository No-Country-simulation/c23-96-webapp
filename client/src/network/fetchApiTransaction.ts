import { ApiResponse } from "@/types/function";
import SummaryApi from "./util/SummaryApi";
import { fetchData } from "./util/fetchFunction";

export type TTransaction = {
  _id: string;
  type: string;
  moneyType: string;
  date: string;
  amount: number;
  extra?: string;
  destinationAccount?: {
    _id: string;
    cvu: string;
    balancePeso: number;
    balanceDolar: number;
    account: string;
  };
};

export async function transference(
  token: string,
  data: TTransaction
): Promise<ApiResponse<TTransaction>> {
  try {
    const response = await fetchData(SummaryApi.Transference.url, {
      method: SummaryApi.Transference.method,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.success && response.message?.includes("Saldo insuficiente")) {
      throw new Error(
        "No tienes suficiente saldo para realizar la transferencia."
      );
    }

    return response;
  } catch (error) {
    console.error("Error en la transferencia:", error);

    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Error inesperado en la transferencia",
    };
  }
}

export async function getTransactions(
  token: string,
  account: string
): Promise<ApiResponse<TTransaction[]>> {
  return fetchData(`${SummaryApi.GetHistoryTransfers.url}/${account}`, {
    method: SummaryApi.GetHistoryTransfers.method,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function getAllTransactions(
  token: string,
): Promise<ApiResponse<TTransaction[]>> {
  return fetchData(SummaryApi.GetAllHistoryTransfers.url, {
    method: SummaryApi.GetAllHistoryTransfers.method,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function getTransaction(
  token: string,
  id: string
): Promise<ApiResponse<TTransaction>> {
  return fetchData(`${SummaryApi.GetTransfer.url}/${id}`, {
    method: SummaryApi.GetTransfer.method,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}


export async function buyDollars(
  token: string,
  accountId:string,
  amount: string,
): Promise<any> {
  return fetchData(`${SummaryApi.BuyDollars.url}${accountId}`, {
    method: SummaryApi.BuyDollars.method,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ amount: Number(amount) })
  });
}

export async function buyPesos(
  token: string,
  accountId:string,
  amount: string,
): Promise<any> {
  return fetchData(`${SummaryApi.BuyPesos.url}${accountId}`, {
    method: SummaryApi.BuyPesos.method,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ amount: Number(amount) })
  });
}