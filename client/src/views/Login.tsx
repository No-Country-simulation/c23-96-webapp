import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Login as LoginFetch } from "../network/fetchApiAuth";
import { TLogin } from "../types/function";
import { useAppStore } from "../store/useAppStore";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { setAuthData } = useAppStore();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TLogin>();


  const onSubmit = async (user: TLogin) => {
    try {
      const response = await LoginFetch(user);

      if (!response.success || !response.data) {  
        throw new Error(response.message || "Error en la autenticación");
      }
      const { token, user: userData } = response.data;

      setAuthData({ user: userData, token: token });

      toast.success("Ingreso exitoso");
      reset();
      navigate("/");
    } catch (error) {
      
      toast.error("Ocurrió un error al ingresar");
      console.log("Error al ingresar:", error);
    }
  };

  return (
    <>
      <h2 className="font-black text-5xl text-center text-principal">
        Ingresa
      </h2>
      <form className="gap-6 mt-8" onSubmit={handleSubmit(onSubmit)}>
        {/* DNI */}
        <div className="mb-5">
          <label htmlFor="dni" className="text-sm uppercase font-bold">
            DNI
          </label>
          <input
            id="dni"
            className="w-full p-3 border border-gray-100"
            type="text"
            placeholder="Ingrese su Número de Documento"
            {...register("dni", { required: "El DNI es obligatorio" })}
          />

          {errors.dni && (
            <p className="text-red-500 text-sm">{errors.dni.message}</p>
          )}

        </div>

        {/* Password */}
        <div className="mb-5">
          <label htmlFor="password" className="text-sm uppercase font-bold">
            Contraseña
          </label>
          <div className="flex justify-between items-center border-2 focus-within:border-black border-gray-100 rounded overflow-hidden">
            <input
              id="password"
              className="w-full p-3 focus:outline-none"
              type={showPassword ? "text" : "password"}
              placeholder="Ingrese su Contraseña"

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
        <div className="sm:flex-row-reverse sm:justify-between col-span-6 sm:flex sm:items-center sm:gap-4 ">
          <button
            type="submit"
            className="bg-principal text-white hover:bg-orange-500 inline-block shrink-0 rounded-md border 
            border-principal px-12 py-3 sm:w-auto  text-sm font-medium transition hover:bg-transparent hover:text-principal 
            focus:outline-none focus:ring active:text-principal w-full"
          >
            Ingresa
          </button>
          <p className="mt-4 text-sm text-gray-500 sm:mt-0">
            Aun no tienes una cuenta?
            <Link to="/auth/registro" className="text-gray-700 underline">
              Registrate
            </Link>
            .
          </p>

        </div>

        <button type="submit" className="bg-principal text-white hover:bg-orange-500 px-12 py-3 w-full">
          Ingresar
        </button>
      </form>
    </>
  );
};

export default Login;
