import { useForm } from "react-hook-form"
import { Error } from "../utils/Error";

const Signup = () => {

    const {
        register,
        handleSubmit,
        formState:{errors},
        reset
    } = useForm();
  return ( 
    <div >
      
      <form className="bg-white mx-5 p-6 rounded-lg">
      <h2 className="font-black text-5xl text-center text-primary">Crea tu cuenta</h2>
        {/* Name */}
      <div className="mb-5">
          <label htmlFor="name" className="text-sm uppercase font-bold">
            Paciente
          </label>
          <input
            id="name"
            className="w-full p-3  border border-gray-100"
            type="text"
            placeholder="Nombre del Paciente"
            {...register("name", {
              required: "El nombre del Paciente es Obligatorio!!",
            })}
          />
          {errors.name && <Error>{errors.name?.message}</Error>}
        </div>
            {/* Lastname */}
        <div className="mb-5">
          <label htmlFor="name" className="text-sm uppercase font-bold">
            Paciente
          </label>
          <input
            id="name"
            className="w-full p-3  border border-gray-100"
            type="text"
            placeholder="Nombre del Paciente"
            {...register("name", {
              required: "El nombre del Paciente es Obligatorio!!",
            })}
          />
          {errors.name && <Error>{errors.name?.message}</Error>}
        </div>
            {/* DNI */}
        <div className="mb-5">
          <label htmlFor="name" className="text-sm uppercase font-bold">
            Paciente
          </label>
          <input
            id="name"
            className="w-full p-3  border border-gray-100"
            type="text"
            placeholder="Nombre del Paciente"
            {...register("name", {
              required: "El nombre del Paciente es Obligatorio!!",
            })}
          />
          {errors.name && <Error>{errors.name?.message}</Error>}
        </div>
        {/* password */}
        <div className="mb-5">
          <label htmlFor="name" className="text-sm uppercase font-bold">
            Paciente
          </label>
          <input
            id="name"
            className="w-full p-3  border border-gray-100"
            type="text"
            placeholder="Nombre del Paciente"
            {...register("name", {
              required: "El nombre del Paciente es Obligatorio!!",
            })}
          />
          {errors.name && <Error>{errors.name?.message}</Error>}
        </div>
            {/* email */}
        <div className="mb-5">
          <label htmlFor="name" className="text-sm uppercase font-bold">
            Paciente
          </label>
          <input
            id="name"
            className="w-full p-3  border border-gray-100"
            type="text"
            placeholder="Nombre del Paciente"
            {...register("name", {
              required: "El nombre del Paciente es Obligatorio!!",
            })}
          />
          {errors.name && <Error>{errors.name?.message}</Error>}
        </div>
        {/* username */}
          
        <div className="mb-5">
          <label htmlFor="name" className="text-sm uppercase font-bold">
            Paciente
          </label>
          <input
            id="name"
            className="w-full p-3  border border-gray-100"
            type="text"
            placeholder="Nombre del Paciente"
            {...register("name", {
              required: "El nombre del Paciente es Obligatorio!!",
            })}
          />
          {errors.name && <Error>{errors.name?.message}</Error>}
        </div>
        {/* phone */}
        <div className="mb-5">
          <label htmlFor="name" className="text-sm uppercase font-bold">
            Paciente
          </label>
          <input
            id="name"
            className="w-full p-3  border border-gray-100"
            type="text"
            placeholder="Nombre del Paciente"
            {...register("name", {
              required: "El nombre del Paciente es Obligatorio!!",
            })}
          />
          {errors.name && <Error>{errors.name?.message}</Error>}
        </div>
        {/* address */}
        <div className="mb-5">
          <label htmlFor="name" className="text-sm uppercase font-bold">
            Paciente
          </label>
          <input
            id="name"
            className="w-full p-3  border border-gray-100"
            type="text"
            placeholder="Nombre del Paciente"
            {...register("name", {
              required: "El nombre del Paciente es Obligatorio!!",
            })}
          />
          {errors.name && <Error>{errors.name?.message}</Error>}
        </div>
      </form>
    </div>
  )
}

export default Signup

/*
name
lastname
dni
email
username
phone
address
password

*/