import { useForm }
  from "react-hook-form";

import { signupUser }
  from "../api/auth.api";

import { useNavigate }
  from "react-router-dom";

const SignupPage = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await signupUser(data);

      alert("Signup successful");

      navigate("/login");
    } catch (error) {
      alert(
        error.response?.data?.message
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 w-[300px]"
      >
        <input
          type="text"
          placeholder="Name"
          {...register("name")}
          className="border p-2"
        />

        <input
          type="email"
          placeholder="Email"
          {...register("email")}
          className="border p-2"
        />

        <input
          type="password"
          placeholder="Password"
          {...register("password")}
          className="border p-2"
        />

        <button
          type="submit"
          className="border p-2"
        >
          Signup
        </button>
      </form>
    </div>
  );
};

export default SignupPage;