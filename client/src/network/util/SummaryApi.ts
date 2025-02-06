const backendDomain: string = import.meta.env.VITE_backendDomain;  
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
    GetUser: {
        url: `${backendDomain}/users/`,
        method: 'get'
    },
    GetAllUser: {
        url: `${backendDomain}/admin`,
        method: 'get'
    },
    EditUser: {
        url: `${backendDomain}/users/`,
        method: 'put'
    },
    Transference: {
        url: `${backendDomain}/transaction/transfer`,
        method: 'post'
    },
    GetHistoryTransfers: {
        url: `${backendDomain}/transaction/history`,
        method: 'get'
    },
    GetAllHistoryTransfers: {
        url: `${backendDomain}/admin/history`,
        method: 'get'
    },
    GetTransfer: {
        url: `${backendDomain}/transaction/`,
        method: 'get'
    },
    GetAllOffers: {
        url: `${backendDomain}/admin/offer`,
        method: 'get'
    },
    GetOneOffer: {
        url: `${backendDomain}/admin/offer/`,
        method: 'get'
    },
    EditOffer: {
        url: `${backendDomain}/admin/offer/`,
        method: 'put'
    },
    DeleteOffer: {
        url: `${backendDomain}/admin/offer/`,
        method: 'delete'
    },
    Createoffer: {
        url: `${backendDomain}/admin/offer`,
        method: 'post'
    },
    BuyDollars: {
        url: `${backendDomain}/transaction/buyDollars/`,
        method: 'post'
    },
    BuyPesos: {
        url: `${backendDomain}/transaction/buyPesos/`,
        method: 'post'
    },




}

export default SummaryApi;