import { Outlet } from 'react-router-dom'

const AuthLayout = () => {
  return (
    <div className="bg-[url('/bg.png')] bg-slate-200 bg-cover bg-no-repeat bg-center min-h-screen flex items-center justify-center">
      <main className="md:w-3/4 sm:w-3/4 mx-auto ">
        <Outlet />
      </main>
    </div>
  )
}

export default AuthLayout