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
    return fetchData(SummaryApi.SignUp.url, {
      method: SummaryApi.SignUp.method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
  }



  
  // Login
  export async function Login(auth: TLogin): Promise<ApiResponse<TLogin>> {
    return fetchData(SummaryApi.Login.url, {
      method: SummaryApi.Login.method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(auth),
    });
  }