import { Outlet } from 'react-router-dom'

const AuthLayout = () => {
  return (
    <div className="bg-[url('/bg.png')] bg-slate-200 bg-cover bg-no-repeat bg-center min-h-screen justify-center">
    <main>
        <Outlet/>
    </main>
    </div>
  )
}

export default AuthLayout