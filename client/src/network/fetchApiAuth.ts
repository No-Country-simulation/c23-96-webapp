import { ApiResponse, TLogin, TUser } from "../types/function";
import SummaryApi from "./SummaryApi";
import { fetchData } from "./util/fetchFunction";





type SignUpResponse = {
  user: TUser; // Usuario registrado
  token: string; // Token de autenticación
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

  //Pick of Type User

  
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