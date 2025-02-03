const backendDomain: string = import.meta.env.VITE_backendDomain || "http://localhost:4000/api";  
if (!backendDomain) {
    throw new Error("La variable de entorno VITE_backendDomain no está definida.");
  }

const SummaryApi = {
    SignUp: {
        url: `${backendDomain}/auth/signup`,
        method: 'post'
    },
    Login: {
        url: `${backendDomain}/auth/login`,
        method: 'post'
    },
    GetAcountUser: {
        url: `${backendDomain}/users/account/`,
        method: 'get'
    },
    GetCardsUser: {
        url: `${backendDomain}/users/cards/`,
        method: 'get'
    },
    EditUser: {
        url: `${backendDomain}/users/login`,
        method: 'put'
    },
    DeleteUser: {
        url: `${backendDomain}/users/login`,
        method: 'delete'
    },
    Transference: {
        url: `${backendDomain}/transaction/transfer`,
        method: 'post'
    },
    GetHistoryTransfers: {
        url: `${backendDomain}/transaction/history`,
        method: 'get'
    },
    GetTransfer: {
        url: `${backendDomain}/transaction/`,
        method: 'get'
    },

}

export default SummaryApi;