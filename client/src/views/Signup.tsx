import { useForm } from "react-hook-form"

const Signup = () => {

    const {
        register,
        handleSubmit,
        formState:{errors},
        reset
    } = useForm();
  return (
    <form>
        <div></div>
        
    </form>
  )
}

export default Signup