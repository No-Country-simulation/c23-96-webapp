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
      
      <form className="bg-white mx-5 p-6 rounded-md shadow-md">
      <h2 className="font-black text-5xl text-center text-primary">Crea tu cuenta</h2>
        {/* Name */}
      <div className="mb-5">
          <label htmlFor="name" className="text-sm uppercase font-bold">
            Nombre
          </label>
          <input
            id="name"
            className="w-full p-3  border border-gray-100"
            type="text"
            placeholder="Ingresa tu Nombre"
            {...register("name", {
              required: "El nombre es Obligatorio!!",
            })}
          />
          {errors.name && <Error>{errors.name?.message}</Error>}
        </div>
            {/* Lastname */}
        <div className="mb-5">
          <label htmlFor="lastname" className="text-sm uppercase font-bold">
            Apellido
          </label>
          <input
            id="lastname"
            className="w-full p-3  border border-gray-100"
            type="text"
            placeholder="Ingresa tu Apellido"
            {...register("lastname", {
              required: "El Apellido es Obligatorio!!",
            })}
          />
          {errors.lastname && <Error>{errors.lastname?.message}</Error>}
        </div>
            {/* DNI */}
        <div className="mb-5">
          <label htmlFor="dni" className="text-sm uppercase font-bold">
            DNI
          </label>
          <input
            id="dni"
            className="w-full p-3  border border-gray-100"
            type="text"
            placeholder="Ingrese su Numero de Documento"
            {...register("dni", {
              required: "El DNI es Obligatorio!!",
            })}
          />
          {errors.dni && <Error>{errors.dni?.message}</Error>}
        </div>
        {/* password */}
        <div className="mb-5">
          <label htmlFor="password" className="text-sm uppercase font-bold">
            Contraseña
          </label>
          <input
            id="password"
            className="w-full p-3  border border-gray-100"
            type="text"//TODO: que se pueda ver o sea tipo password
            placeholder="Nombre "
            {...register("password", {
              required: "La contraseña es Obligatoria!!",
            })}
          />
          {errors.password && <Error>{errors.password?.message}</Error>}
        </div>
            {/* email */}
        <div className="mb-5">
          <label htmlFor="email" className="text-sm uppercase font-bold">
            Correo Electronico
          </label>
          <input
            id="email"
            className="w-full p-3  border border-gray-100"
            type="text"
            placeholder="Nombre "
            {...register("email", {
              required: "El Correo es Obligatorio!!",
            })}
          />
          {errors.email && <Error>{errors.email?.message}</Error>}
        </div>
        {/* username */}
          
        <div className="mb-5">
          <label htmlFor="username" className="text-sm uppercase font-bold">
            Nombre de Usuario
          </label>
          <input
            id="username"
            className="w-full p-3  border border-gray-100"
            type="text"
            placeholder="Nombre "//TODO: Es necesario Nombre de usuario???
            {...register("username", {
              required: "El nombre de usuario es Obligatorio!!",
            })}
          />
          {errors.username && <Error>{errors.username?.message}</Error>}
        </div>
        {/* phone */}
        <div className="mb-5">
          <label htmlFor="phone" className="text-sm uppercase font-bold">
            Telefono
          </label>
          <input
            id="phone"
            className="w-full p-3  border border-gray-100"
            type="text"
            placeholder="Nombre "//TODO: añadirle un formato de telefono
            {...register("phone", {
              required: "El Numero de Telefono es Obligatorio!!",
            })}
          />
          {errors.phone && <Error>{errors.phone?.message}</Error>}
        </div>
        {/* address */}
        <div className="mb-5">
          <label htmlFor="address" className="text-sm uppercase font-bold">
            Direccion
          </label>
          <input
            id="address"
            className="w-full p-3  border border-gray-100"
            type="text"
            placeholder="Nombre "
            {...register("address", {
              required: "La direccion es Obligatoria!!",
            })}
          />
          {errors.address && <Error>{errors.address?.message}</Error>}
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