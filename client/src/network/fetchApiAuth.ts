


//reusable Function Body For Request


async function fetchData(input: RequestInfo, init?: RequestInit){
    const response = await fetch(input, init);
    if(!response.ok) {
        const errorBody = await response.json().catch(()=>{});
        const errorMesage = errorBody?.error || "Error Desconocido";
        console.log(response.status, errorMesage)
    }
    return response.json()
}

function getToken(){
    const token:string = tokenstorage.getState().auth.token;
    if(!token){
        console.log('No tienes Permisos para esta accion')
    }
    return token;
}

const commonHeaders = {
    Authorization: `Bearer ${getToken()}`,
    "Content-Type": "application/json",
  };