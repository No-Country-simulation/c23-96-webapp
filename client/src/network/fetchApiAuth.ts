import { TUser } from "@/types";
import { ApiResponse, TLogin } from "../types/function";
import SummaryApi from "./util/SummaryApi";
import { fetchData } from "./util/fetchFunction";



type SignUpResponse = {
  user: TUser; 
  token: string; 
};
  
  // SignUp
  export async function SignUp(user: TUser): Promise<ApiResponse<SignUpResponse>> {
    const response = await fetchData<SignUpResponse>(SummaryApi.SignUp.url, {
      method: SummaryApi.SignUp.method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    return { success: true, ...response };
  }
  
  // Login
  export async function Login(auth: TLogin): Promise<ApiResponse<{ token: string; user: TUser }>> {
    const response = await fetchData<{ token: string; user: TUser }>(SummaryApi.Login.url, {
      method: SummaryApi.Login.method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(auth),
    });
  
    return { success: true, ...response };
  }
  