import { useForm } from "react-hook-form";
import { loginUser } from "../api/auth.api";
import { useNavigate, Link } from "react-router-dom";
import { showSuccess, showError } from "../utils/toast";

const LoginPage = () => {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await loginUser(data);

      const { accessToken, user } = response;

      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("user", JSON.stringify(user));

      showSuccess("Welcome back");
      navigate("/dashboard");
    } catch (error) {
      showError("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center px-4 sm:px-6 antialiased selection:bg-[#DBEAFE] selection:text-[#097FE8]">
      <div className="w-full max-w-md">
        
        {/* Analytics Platform Brand Header */}
        <div className="text-center mb-8 flex flex-col items-center">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-white border border-[#E2E8F0] rounded-2xl shadow-sm mb-4 transition-transform hover:scale-105 duration-300">
            <div className="w-8 h-8 bg-[#F0F7FF] rounded-xl flex items-center justify-center text-[#097FE8]">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
          </div>
          <h1 className="text-3xl font-black text-[#0F172A] tracking-tight">
            Welcome Back
          </h1>
          <p className="text-[#64748B] text-sm font-semibold mt-2 max-w-xs leading-relaxed">
            Sign in to access your administrative workspace and streaming charts.
          </p>
        </div>

        {/* Credentials Terminal Card */}
        <div className="bg-white p-6 sm:p-8 rounded-[2rem] border border-[#E2E8F0] shadow-xl shadow-slate-200/40 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1.5 bg-[#097FE8]"></div>

          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
            
            {/* Input Node: Identification Target */}
            <div className="space-y-1.5 group">
              <label className="text-[10px] font-black uppercase tracking-widest text-[#94A3B8] ml-1 group-focus-within:text-[#097FE8] transition-colors">
                Email Address
              </label>
              <input 
                type="email" 
                placeholder="tejas@example.com" 
                {...register("email")} 
                className="w-full p-4 bg-[#F8FAFC] border border-[#E2E8F0] focus:border-[#097FE8] rounded-xl text-[#0F172A] font-semibold text-sm outline-none focus:bg-white focus:ring-4 focus:ring-[#097FE8]/5 transition-all placeholder:text-[#CBD5E1]"
              />
            </div>

            {/* Input Node: Security Access Token */}
            <div className="space-y-1.5 group">
              <div className="flex justify-between items-center px-1">
                <label className="text-[10px] font-black uppercase tracking-widest text-[#94A3B8] group-focus-within:text-[#097FE8] transition-colors">
                  Password
                </label>
                <a 
                  href="#" 
                  className="text-[10px] font-extrabold text-[#097FE8] hover:text-[#0866ba] transition-colors uppercase tracking-wider"
                >
                  Forgot?
                </a>
              </div>
              <input 
                type="password" 
                placeholder="••••••••" 
                {...register("password")} 
                className="w-full p-4 bg-[#F8FAFC] border border-[#E2E8F0] focus:border-[#097FE8] rounded-xl text-[#0F172A] font-semibold text-sm outline-none focus:bg-white focus:ring-4 focus:ring-[#097FE8]/5 transition-all placeholder:text-[#CBD5E1]"
              />
            </div>

            {/* Primary Authorization Execution Trigger */}
            <button 
              type="submit" 
              className="w-full py-4 bg-[#097FE8] hover:bg-[#0866ba] text-white text-xs font-black uppercase tracking-widest rounded-xl shadow-lg shadow-blue-100 active:scale-[0.98] transition-all mt-2 flex items-center justify-center gap-2 group"
            >
              Sign In
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 transform group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </form>
        </div>

        {/* Alternatives Redirection Link */}
        <p className="text-center mt-8 text-sm font-bold text-[#64748B]">
          Don't have an account?{" "}
          <Link to="/signup" className="text-[#097FE8] hover:text-[#0866ba] hover:underline underline-offset-4 transition-all">
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;