import { useForm } from "react-hook-form";
import { SignUp } from "../network/fetchApiAuth";
import { toast } from "react-toastify";

import { useNavigate, Link } from "react-router-dom";

import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { TUser } from "@/types";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TUser>();


  const onSubmit = async (user: TUser) => {
    try {
      const response = await SignUp(user);

      if (!response.success || !response.data) {
        throw new Error(response.message || "Error en el registro");
      }

      toast.success("Registro exitoso");
      reset();
      navigate("/auth/ingreso");
    } catch (error) {
      toast.error("Ocurrió un error al registrarte");
      console.log("Error en el registro:", error);
    }
  };

  return (
    <>
      <h2 className="font-black text-5xl text-center text-principal">
        Crea tu cuenta
      </h2>

      <form
        className="grid grid-cols-6 gap-6 mt-8"
        onSubmit={handleSubmit(onSubmit)}
      >

        {/* Name */}
        <div className="mb-5 col-span-6 sm:col-span-3">
          <label htmlFor="name" className="text-sm uppercase font-bold">
            Nombre
          </label>
          <input
            id="name"
            className="w-full p-3 border border-gray-100"
            type="text"
            placeholder="Ingresa tu Nombre"
            {...register("name", { required: "El nombre es obligatorio" })}
          />

          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}

        </div>

        {/* Lastname */}
        <div className="mb-5 col-span-6 sm:col-span-3">
          <label htmlFor="lastname" className="text-sm uppercase font-bold">
            Apellido
          </label>
          <input
            id="lastname"
            className="w-full p-3 border border-gray-100"
            type="text"
            placeholder="Ingresa tu Apellido"

            {...register("lastname", {
              required: "El apellido es obligatorio",
            })}
          />
          {errors.lastname && (
            <p className="text-red-500 text-sm">{errors.lastname.message}</p>
          )}

        </div>

        {/* Email */}
        <div className="mb-5 col-span-6">
          <label htmlFor="email" className="text-sm uppercase font-bold">
            Correo Electrónico
          </label>
          <input
            id="email"
            className="w-full p-3 border border-gray-100"
            type="text"
            placeholder="Ingrese tu Correo Electrónico"
            {...register("email", { required: "El correo es obligatorio" })}
          />

          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}

        </div>

        {/* DNI */}
        <div className="mb-5 col-span-6 sm:col-span-3">
          <label htmlFor="dni" className="text-sm uppercase font-bold">
            DNI
          </label>
          <input
            id="dni"
            className="w-full p-3 border border-gray-100"
            type="text"
            placeholder="Ingrese tu Número de Documento"
            {...register("dni", { required: "El DNI es obligatorio" })}
          />

          {errors.dni && (
            <p className="text-red-500 text-sm">{errors.dni.message}</p>
          )}

        </div>

        {/* Password */}
        <div className="mb-5 col-span-6 sm:col-span-3">
          <label htmlFor="password" className="text-sm uppercase font-bold">
            Contraseña
          </label>
          <div className="flex justify-between items-center border-2 focus-within:border-black border-gray-100 rounded overflow-hidden">
            <input
              id="password"
              className="w-full p-3 focus:outline-none"
              type={showPassword ? "text" : "password"}
              placeholder="Ingrese tu Contraseña"

              {...register("password", {
                required: "La contraseña es obligatoria",
              })}

            />
            <button type="button" onClick={() => setShowPassword(prev => !prev)} className="p-3 text-gray-500">
              {showPassword ? <FaRegEyeSlash className="text-lg" /> : <FaRegEye className="text-lg" />}
            </button>
          </div>

          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>
        {/* address */}
        <div className="mb-5 col-span-6">
          <label htmlFor="address" className="text-sm uppercase font-bold">
            Direccion
          </label>
          <input
            id="address"
            className="w-full p-3  border border-gray-100"
            type="text"
            placeholder="Ingrese su Direccion "
            {...register("address", {
              required: "La direccion es Obligatoria!!",
            })}
          />
          {errors.address && (
            <p className="text-red-500 text-sm">{errors.address.message}</p>
          )}

        </div>


        <div className="mb-5 col-span-6 sm:col-span-3">
          <label htmlFor="username" className="text-sm uppercase font-bold">
            Nombre de Usuario
          </label>
          <input
            id="username"
            className="w-full p-3  border border-gray-100"
            type="text"
            placeholder="Ingrese el nombre de Usuario que desee"
            {...register("username", {
              required: "El nombre de usuario es Obligatorio!!",
            })}
          />
          {errors.username && (
            <p className="text-red-500 text-sm">{errors.username.message}</p>
          )}
        </div>
        {/* phone */}
        <div className="mb-5 col-span-6 sm:col-span-3">
          <label htmlFor="phone" className="text-sm uppercase font-bold">
            Telefono
          </label>
          <input
            id="phone"
            className="w-full p-3  border border-gray-100"
            type="text"
            placeholder="Ingrese su Telefono"
            {...register("phone", {
              required: "El Numero de Telefono es Obligatorio!!",
            })}
          />
          {errors.phone && (
            <p className="text-red-500 text-sm">{errors.phone.message}</p>
          )}
        </div>
        <div className="sm:flex-row-reverse sm:justify-between col-span-6 sm:flex sm:items-center sm:gap-4 ">
          <button
            type="submit"
            className="bg-principal text-white hover:bg-orange-500 inline-block shrink-0 rounded-md border 
            border-principal px-12 py-3 sm:w-auto  text-sm font-medium transition hover:bg-transparent hover:text-principal 
            focus:outline-none focus:ring active:text-principal w-full"
          >
            Registrate
          </button>
          <p className="mt-4 text-sm text-gray-500 sm:mt-0">
            Ya tienes una cuenta?
            <Link to="/auth/ingreso" className="text-gray-700 underline">
              Ingresa
            </Link>
            .
          </p>
        </div>

      </form>
    </>
  );
};

export default Signup;
