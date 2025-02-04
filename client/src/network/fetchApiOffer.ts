import { ApiResponse } from "@/types/function";
import SummaryApi from "./util/SummaryApi";
import { fetchData } from "./util/fetchFunction";

interface Offer {
    id: string;
    title: string;
    description: string;
    createdBy?: string;
    createdAt?: string;
  }
 

  export async function createOffer(
    token: string,
  ): Promise<ApiResponse<Offer[]>> {
    return fetchData(SummaryApi.Createoffer.url, {
      method: SummaryApi.Createoffer.method,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }
  

export async function getAllOffers(
    token: string,
  ): Promise<ApiResponse<Offer[]>> {
    return fetchData(SummaryApi.GetAllOffers.url, {
      method: SummaryApi.GetAllOffers.method,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  
  // Función para obtener un solo usuario por ID
  export async function getOneOffer(
    token: string,
    offerId: string,
  ): Promise<ApiResponse<Offer[]>> {
    return fetchData(`${SummaryApi.GetOneOffer.url}${offerId}`, {
      method: SummaryApi.GetOneOffer.method,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  
  // Función para editar los datos de un usuario
  export async function editOffer(
    token: string,
    offerId: string,
    updatedData: Partial<Offer>
  ): Promise<ApiResponse<Offer>> {
    return fetchData(`${SummaryApi.EditOffer.url}${offerId}`, {
      method: SummaryApi.EditOffer.method,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    });
  }

    // Función para obtener un solo usuario por ID
    export async function deleteOffer(
        token: string,
        offerId: string,
      ): Promise<ApiResponse<Offer>> {
        return fetchData(`${SummaryApi.DeleteOffer.url}${offerId}`, {
          method: SummaryApi.DeleteOffer.method,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }
      
  