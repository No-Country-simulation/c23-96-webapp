


//reusable Function Body For Request

import { TLogin, TUser } from "../types/function";
import SummaryApi from "./SummaryApi";


export async function fetchData(input: RequestInfo, init?: RequestInit) {
  const response = await fetch(input, init);

  if (!response.ok) {
    const errorBody = await response.json().catch(() => null); 
    const errorMessage = errorBody?.error || "Error desconocido";
    console.error(`Error ${response.status}: ${errorMessage}`);
    throw new Error(errorMessage); 
  }

  return response.json(); 
}

    
// function getToken(){
//     const token:string = .getState().auth.token;
//     if(!token){
//         console.log('No tienes Permisos para esta accion')
//     }
//     return token;
// }

// const commonHeaders = {
//     Authorization: `Bearer ${getToken()}`,
//     "Content-Type": "application/json",
//   };

type ApiResponse<T> = {
  success: boolean; 
  data: T; 
  message?: string;
  token?: string; 
};

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