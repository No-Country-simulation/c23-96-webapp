import { ApiResponse } from "@/types/function";

//reusable Function Body For Request
export async function fetchDataAuth<T>(input: RequestInfo, init?: RequestInit): Promise<ApiResponse<T>> {
  const response = await fetch(input, init);

  if (!response.ok) {
    try { 
      const errorBody = await response.json().catch(() => ({ message: "Error desconocido" })); 
      const errorMessage = errorBody.message || "Error desconocido";
      console.error(`Error ${response.status}: ${errorMessage}`);
      return { success: false, message: errorMessage }; 
    } catch (parseError) {
      console.error("Error al parsear la respuesta de error:", parseError); 
      const errorMessage = `Error HTTP ${response.status}`;
      return { success: false, message: errorMessage }; 
    }
  }

  try { 
    const data = await response.json();
    return { success: true, data }; 
  } catch (parseError) {
    console.error("Error al parsear la respuesta exitosa:", parseError);
    return { success: false, message: "Respuesta JSON inválida" }; 
  }
}


export async function fetchData<T>(input: RequestInfo, init?: RequestInit): Promise<T> {
  const response = await fetch(input, init);

  if (!response.ok) {
    const errorBody = await response.json().catch(() => null);
    const errorMessage = errorBody?.error || "Error desconocido";
    console.error(`Error ${response.status}: ${errorMessage}`);
    throw new Error(errorMessage);
  }

  return response.json();
}
