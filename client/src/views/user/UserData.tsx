import { useAppStore } from '@/store/useAppStore'


const UserData = () => {
    const {user, account} = useAppStore();
  
    return (
    <>
    <h1 className='text-5xl text-center font-bold'>{user?.name} {user?.lastname}</h1>


    <div className='m-6 space-y-3'>
    <p className='p-2 bg-white rounded-xl shadow-lg font-medium'>Nombre de usuario: {user?.username}</p>
    <p className='p-2 bg-white rounded-xl shadow-lg font-medium'>Gmail: {user?.email}</p>
    <p className='p-2 bg-white rounded-xl shadow-lg font-medium'>DNI: {user?.dni}</p>
    <p className='p-2 bg-white rounded-xl shadow-lg font-medium'>Numero de Cuenta: {account?.account}</p> 
    <p className='p-2 bg-white rounded-xl shadow-lg font-medium'>CVU: {account?.cvu}</p>
    <p className='p-2 bg-white rounded-xl shadow-lg font-medium'>Telefono: {user?.phone}</p>
    <p className='p-2 bg-white rounded-xl shadow-lg font-medium'>Direccion: {user?.address}</p>
    </div>

    <button>Editar Usuario</button>
    </>
  )
}

export default UserData