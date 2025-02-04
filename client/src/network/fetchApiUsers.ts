import { ApiResponse, TUser } from "@/types/function";
import { fetchData } from "./util/fetchFunction";
import SummaryApi from "./util/SummaryApi";

type AccountDetails = {
  _id: string;
  cvu: string;
  balancePeso: number;
  balanceDolar: number;
  account: string;
  __v: number;
};

// Get Account data of user
export async function getAccountData(
  userID: string,
  token: string
): Promise<AccountDetails> {
  const data = await fetchData(
    `${SummaryApi.GetAcountUser.url}${userID}`,
    {
      method: SummaryApi.GetAcountUser.method,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (data && data._id) {
    return data; 
  }

  throw new Error("La estructura de la respuesta del servidor no es válida.");
}

type Card = {
  _id: string;
  name: string;
  cardNumber: string;
  expirationDate: string;
  cvv: string;
  type: "peso" | "dolar";
  account: string;
};

export async function getCardsData(userID: string, token: string): Promise<Card[]> {
  const data = await fetchData(`${SummaryApi.GetCardsUser.url}${userID}`, {
    method: SummaryApi.GetCardsUser.method,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (Array.isArray(data)) {
    return data;
  }

  throw new Error("La estructura de la respuesta del servidor no es válida.");
}

// Función para obtener todos los usuarios
export async function getAllUsers(
  token: string,
): Promise<ApiResponse<TUser[]>> {
  return fetchData(SummaryApi.GetAllUser.url, {
    method: SummaryApi.GetAllUser.method,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

// Función para obtener un solo usuario por ID
export async function getOneUser(
  token: string,
  userId: string,
): Promise<ApiResponse<TUser[]>> {
  return fetchData(`${SummaryApi.GetUser.url}${userId}`, {
    method: SummaryApi.GetUser.method,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

// Función para editar los datos de un usuario
export async function editUser(
  token: string,
  userId: string,
  updatedData: Partial<TUser>
): Promise<ApiResponse<TUser[]>> {
  return fetchData(`${SummaryApi.EditUser.url}${userId}`, {
    method: SummaryApi.EditUser.method,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedData),
  });
}

// Función de utilidad para realizar las solicitudes
async function fetchData(url: string, options: RequestInit): Promise<ApiResponse<TUser[]>> {
  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();
    console.log("Datos recibidos de la API:", data);
    return { data }; // Asegúrate de que ApiResponse sea del tipo adecuado para los datos.
  } catch (error) {
    console.error("Error en fetchData:", error);
    return { data: [] }; // Devuelve un valor vacío en caso de error.
  }
}



