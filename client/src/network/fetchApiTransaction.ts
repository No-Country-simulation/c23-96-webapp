import { ApiResponse } from "@/types/function";
import SummaryApi from "./util/SummaryApi";
import { fetchData } from "./util/fetchFunction";

export type TTransaction = {
    _id: string;
    type: string;
    moneyType: string;
    date: string;
    amount: number;
  };
  


export async function transference(token: string, data: TTransaction): Promise<ApiResponse<TTransaction>> {
    return fetchData(SummaryApi.Transference.url, {
        method: SummaryApi.Transference.method,
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    })
}

export async function getTransactions(token: string, account:string): Promise<ApiResponse<TTransaction>>{
    return fetchData(`${SummaryApi.GetHistoryTransfers.url}/${account}`,{
        method: SummaryApi.GetHistoryTransfers.method,
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })
}