import { useForm } from "react-hook-form";
import { Error } from "../utils/Error";
import { TUser } from "../types/function";
import { SignUp } from "../network/fetchApiAuth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (user: TUser) => {
    try {
      const data = await SignUp(user);

      toast.success("Registro existoso");
      reset();
      navigate("/auth/ingreso");

      console.log(data);
    } catch (error) {
      toast.error("Ocurrio un error al Registrarte");
      console.log("error Registro", error);
    }
  };

  return (
    <form
      className="bg-white mx-5 p-6 rounded-md shadow-md"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h2 className="font-black text-5xl text-center text-primary">
        Crea tu cuenta
      </h2>
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
        {errors.name && <Error>{errors.name.message}</Error>}
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
        {errors.lastname && <Error>{errors.lastname.message}</Error>}
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
        {errors.dni && <Error>{errors.dni.message}</Error>}
      </div>
      {/* password */}
      <div className="mb-5">
        <label htmlFor="password" className="text-sm uppercase font-bold">
          Contraseña
        </label>
        <div className="flex justify-between items-center border-2 focus-within:border-black border-gray-100 rounded overflow-hidden">
          <input
            id="password"
            className="w-full p-3 focus:outline-none"
            type={showPassword ? "text" : "password"}
            placeholder="Nombre"
            {...register("password", {
              required: "La contraseña es Obligatoria!!",
            })}
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="p-3 text-gray-500"
          >
            {showPassword ? (
              <FaRegEyeSlash className="text-lg" />
            ) : (
              <FaRegEye className="text-lg" />
            )}
          </button>
        </div>

        {errors.password && <Error>{errors.password.message}</Error>}
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
        {errors.email && <Error>{errors.email.message}</Error>}
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
          placeholder="Nombre " //TODO: Es necesario Nombre de usuario???
          {...register("username", {
            required: "El nombre de usuario es Obligatorio!!",
          })}
        />
        {errors.username && <Error>{errors.username.message}</Error>}
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
          placeholder="Nombre " //TODO: añadirle un formato de telefono
          {...register("phone", {
            required: "El Numero de Telefono es Obligatorio!!",
          })}
        />
        {errors.phone && <Error>{errors.phone.message}</Error>}
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
        {errors.address && <Error>{errors.address.message}</Error>}
      </div>
      <button
        type="submit"
        className="bg-primary text-white hover:bg-orange-500 py-2 px-6  w-full"
      >
        Registrate
      </button>
    </form>
  );
};

export default Signup;
