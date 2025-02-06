import { useAppStore } from "../../store/useAppStore";

//reusable Function Body For Request
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
  
  export function useCommonHeaders() {
    const token = useAppStore((state) => state.token);
    return {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
  }