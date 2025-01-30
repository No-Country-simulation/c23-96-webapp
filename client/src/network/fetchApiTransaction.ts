import { ApiResponse } from "@/types/function";
import SummaryApi from "./SummaryApi";
import { fetchData } from "./util/fetchFunction";




export async function transference(token: string, data: any): Promise<ApiResponse<any>> {
    return fetchData(SummaryApi.Transference.url, {
        method: SummaryApi.Transference.method,
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    })
}