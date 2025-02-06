import { useForm } from "react-hook-form";
import { SignUp } from "../network/fetchApiAuth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { TUser } from "@/types";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors }, reset } = useForm<TUser>();

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
      <form className="grid grid-cols-6 gap-6 mt-8" onSubmit={handleSubmit(onSubmit)}>
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
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
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
            {...register("lastname", { required: "El apellido es obligatorio" })}
          />
          {errors.lastname && <p className="text-red-500 text-sm">{errors.lastname.message}</p>}
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
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
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
          {errors.dni && <p className="text-red-500 text-sm">{errors.dni.message}</p>}
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
              {...register("password", { required: "La contraseña es obligatoria" })}
            />
            <button type="button" onClick={() => setShowPassword(prev => !prev)} className="p-3 text-gray-500">
              {showPassword ? <FaRegEyeSlash className="text-lg" /> : <FaRegEye className="text-lg" />}
            </button>
          </div>
          {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
        </div>

        <button type="submit" className="bg-principal text-white hover:bg-orange-500 px-12 py-3 w-full">
          Registrate
        </button>
      </form>
    </>
  );
};

export default Signup;
