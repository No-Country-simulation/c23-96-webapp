import React from 'react'
import { Outlet } from 'react-router-dom'

const AuthLayout = () => {
  return (
    <div className="bg-[url('/principal.jpg')] bg-cover bg-center min-h-screen justify-center">
    <main className='space-y-28 m-16'>
        <Outlet/>
    </main>
    </div>
  )
}

export default AuthLayout