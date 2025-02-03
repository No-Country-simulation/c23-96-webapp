import { useAppStore } from '@/store/useAppStore'


const UserData = () => {
    const {user, account} = useAppStore();
  
    return (
    <>
    <h1 className='text-5xl text-center font-bold'>{user?.name} {user?.lastname}</h1>


    <div className="m-6 grid grid-cols-1 md:grid-cols-2 gap-4">
  <p className="p-3 bg-white rounded-xl shadow-lg font-medium">
    <span className="font-semibold">Nombre de usuario:</span> {user?.username}
  </p>
  <p className="p-3 bg-white rounded-xl shadow-lg font-medium">
    <span className="font-semibold">Gmail:</span> {user?.email}
  </p>
  <p className="p-3 bg-white rounded-xl shadow-lg font-medium">
    <span className="font-semibold">DNI:</span> {user?.dni}
  </p>
  <p className="p-3 bg-white rounded-xl shadow-lg font-medium">
    <span className="font-semibold">Número de Cuenta:</span> {account?.account}
  </p>
  <p className="p-3 bg-white rounded-xl shadow-lg font-medium">
    <span className="font-semibold">CVU:</span> {account?.cvu}
  </p>
  <p className="p-3 bg-white rounded-xl shadow-lg font-medium">
    <span className="font-semibold">Teléfono:</span> {user?.phone}
  </p>
  <p className="p-3 bg-white rounded-xl shadow-lg font-medium md:col-span-2">
    <span className="font-semibold">Dirección:</span> {user?.address}
  </p>
</div>


    
    </>
  )
}

export default UserData