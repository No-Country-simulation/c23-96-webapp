import { ApiResponse } from "@/types/function";
import { fetchData, useCommonHeaders } from "./util/fetchFunction";
import SummaryApi from "./SummaryApi";

const headers = useCommonHeaders();

type UserResponse = {
    userID: string; // Usuario registrado
    token: string; // Token de autenticación
  };
    
    // SignUp
  export async function getAccountData(userID: string): Promise<ApiResponse<UserResponse>> {
      return fetchData(`${SummaryApi.GetAcountUser.url}/${userID}/account` , {
        method: SummaryApi.GetAcountUser.method,
        headers: headers,
      });
    }

    
  