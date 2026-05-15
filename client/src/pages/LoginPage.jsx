import { useForm } from "react-hook-form";
import { loginUser } from "../api/auth.api";
import { useNavigate, Link } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await loginUser(data);
      localStorage.setItem("accessToken", response.accessToken);
      
      navigate("/dashboard");
    } catch (error) {
      toast.error( error.response?.data?.message ||"Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-[#097FE8] rounded-xl shadow-lg shadow-blue-200 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <h1 className="text-3xl font-black text-[#0F172A] tracking-tight">Welcome Back</h1>
          <p className="text-[#64748B] font-medium mt-2">Sign in to manage your live polls.</p>
        </div>

        <div className="bg-white p-8 rounded-[2rem] border border-[#F1F5F9] shadow-xl shadow-slate-200/60">
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
            
            <div className="space-y-1">
              <label className="text-[11px] font-black uppercase tracking-widest text-[#94A3B8] ml-1">Email Address</label>
              <input 
                type="email" 
                placeholder="tejas@example.com" 
                {...register("email")} 
                className="w-full p-4 bg-[#F8FAFC] border border-[#F1F5F9] rounded-2xl text-[#0F172A] font-medium outline-none focus:border-[#097FE8] focus:ring-4 focus:ring-[#097FE8]/5 transition-all placeholder:text-[#CBD5E1]"
              />
            </div>

            <div className="space-y-1">
              <div className="flex justify-between items-center ml-1">
                <label className="text-[11px] font-black uppercase tracking-widest text-[#94A3B8]">Password</label>
                <a href="#" className="text-[11px] font-bold text-[#097FE8] hover:underline">Forgot?</a>
              </div>
              <input 
                type="password" 
                placeholder="••••••••" 
                {...register("password")} 
                className="w-full p-4 bg-[#F8FAFC] border border-[#F1F5F9] rounded-2xl text-[#0F172A] font-medium outline-none focus:border-[#097FE8] focus:ring-4 focus:ring-[#097FE8]/5 transition-all placeholder:text-[#CBD5E1]"
              />
            </div>

            <button 
              type="submit" 
              className="w-full py-4 bg-[#0F172A] text-white font-black uppercase tracking-widest rounded-2xl hover:bg-black shadow-lg shadow-slate-200 transition-all active:scale-[0.98] mt-2"
            >
              Sign In
            </button>
          </form>
        </div>

        <p className="text-center mt-8 text-sm font-bold text-[#64748B]">
          Don't have an account?{" "}
          <Link to="/signup" className="text-[#097FE8] hover:underline">Create one</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;