import { useForm } from "react-hook-form";
import { signupUser } from "../api/auth.api";
import { useNavigate, Link } from "react-router-dom";
import { showSuccess, showError } from "../utils/toast";

const SignupPage = () => {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    try {
      await signupUser(data);
      showSuccess("Welcome to PollSync");
      navigate("/login");
    } catch (error) {
      showError(error.response?.data?.message || "Email already registered");
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center px-4 sm:px-6 antialiased selection:bg-[#DBEAFE] selection:text-[#097FE8]">
      <div className="w-full max-w-md">
        
        {/* Animated Brand Node Header */}
        <div className="text-center mb-8 flex flex-col items-center">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-white rounded-2xl shadow-sm border border-[#E2E8F0] mb-4 relative overflow-hidden">
            <div className="w-3 h-3 bg-[#097FE8] rounded-full z-10"></div>
            <div className="absolute w-6 h-6 border-2 border-[#097FE8]/30 rounded-full animate-ping"></div>
            <div className="absolute w-10 h-10 border border-[#097FE8]/10 rounded-full"></div>
          </div>
          <h1 className="text-3xl font-black text-[#0F172A] tracking-tight">
            Create Account
          </h1>
          <p className="text-[#64748B] text-sm font-semibold mt-2 max-w-xs leading-relaxed">
            Join PollSync and start deploying real-time feedback channels.
          </p>
        </div>

        {/* Core Identity Configuration Panel */}
        <div className="bg-white p-6 sm:p-8 rounded-[2rem] border border-[#E2E8F0] shadow-xl shadow-slate-200/40 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1.5 bg-[#097FE8]"></div>

          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
            
            {/* Field: Identity Name */}
            <div className="space-y-1.5 group">
              <label className="text-[10px] font-black uppercase tracking-widest text-[#94A3B8] ml-1 group-focus-within:text-[#097FE8] transition-colors">
                Full Name
              </label>
              <input 
                type="text" 
                placeholder="Tejas Dev" 
                {...register("name")} 
                className="w-full p-4 bg-[#F8FAFC] border border-[#E2E8F0] focus:border-[#097FE8] rounded-xl text-[#0F172A] font-semibold text-sm outline-none focus:bg-white focus:ring-4 focus:ring-[#097FE8]/5 transition-all placeholder:text-[#CBD5E1]"
              />
            </div>

            {/* Field: Namespace Routing Mailbox */}
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

            {/* Field: Verification Key Access */}
            <div className="space-y-1.5 group">
              <label className="text-[10px] font-black uppercase tracking-widest text-[#94A3B8] ml-1 group-focus-within:text-[#097FE8] transition-colors">
                Password
              </label>
              <input 
                type="password" 
                placeholder="••••••••" 
                {...register("password")} 
                className="w-full p-4 bg-[#F8FAFC] border border-[#E2E8F0] focus:border-[#097FE8] rounded-xl text-[#0F172A] font-semibold text-sm outline-none focus:bg-white focus:ring-4 focus:ring-[#097FE8]/5 transition-all placeholder:text-[#CBD5E1]"
              />
              <p className="text-[10px] font-bold text-[#94A3B8] mt-1.5 ml-1 flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-[#CBD5E1]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Security metric requirement: Minimum 8 characters.
              </p>
            </div>

            {/* Workspace Activation Action */}
            <button 
              type="submit" 
              className="w-full py-4 bg-[#097FE8] hover:bg-[#0866ba] text-white text-xs font-black uppercase tracking-widest rounded-xl shadow-lg shadow-blue-100 active:scale-[0.98] transition-all mt-2 flex items-center justify-center gap-2 group"
            >
              Get Started
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 transform group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </form>
        </div>

        {/* Back Link Intercept */}
        <p className="text-center mt-8 text-sm font-bold text-[#64748B]">
          Already have an account?{" "}
          <Link to="/login" className="text-[#097FE8] hover:text-[#0866ba] hover:underline underline-offset-4 transition-all">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;