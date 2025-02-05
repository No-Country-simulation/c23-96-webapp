import { Outlet } from "react-router-dom"


const SimulatorLayout = () => {
  return (
    <div className="text-center text-3xl flex flex-col">
      <h1>Elije que Deseas Simular</h1>
    <main className="md:w-3/4  sm:w-3/4  bg-white mx-5 p-6 rounded-md shadow-md ">
    <Outlet />
  </main>
  </div>
  )
}

export default SimulatorLayout

