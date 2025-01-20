
import { useForm } from 'react-hook-form';

const Login = () => {
    const {
          register,
          handleSubmit,
          formState:{errors},
          reset
      } = useForm();
  return (
    <form className="bg-white mx-5 p-6 rounded-md shadow-md">
      <h2 className="font-black text-5xl text-center text-primary">Ingresa </h2>
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
    </form>
  )
}

export default Login