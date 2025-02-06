import { TUser } from "@/types";
import { ApiResponse, TLogin } from "../types/function";
import SummaryApi from "./util/SummaryApi";
import { fetchDataAuth } from "./util/fetchFunction";

type SignUpResponse = {
  user: TUser;
  token: string;
};
// SignUp
export async function SignUp(
  user: TUser
): Promise<ApiResponse<SignUpResponse>> {
  const response = await fetchDataAuth<SignUpResponse>(SummaryApi.SignUp.url, {
    method: SummaryApi.SignUp.method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  return response;
}

// Login
export async function Login(
  auth: TLogin
): Promise<ApiResponse<{ token: string; user: TUser }>> {
  const response = await fetchDataAuth<{ token: string; user: TUser }>(
    SummaryApi.Login.url,
    {

      method: SummaryApi.Login.method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(auth),
    }
  );

  return response;
}
