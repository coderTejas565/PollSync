import { useForm } from "react-hook-form";

import { loginUser } from "../api/auth.api";

import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();

  const { register, handleSubmit,} = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await loginUser(data);

      localStorage.setItem( "accessToken", response.accessToken);

      alert("Login successful");

      navigate("/dashboard");
    } catch (error) {
      alert( error.response?.data?.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 w-[300px]"
      >
        <input type="email" placeholder="Email" {...register("email")} className="border p-2"
        />

        <input type="password" placeholder="Password" {...register("password")} className="border p-2"
        />

        <button type="submit" className="border p-2">
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;