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
      showSuccess( "Welcome to PollSync");
      navigate("/login");
    } catch (error) {
      showError(error.response?.data?.message ||   "Email already registered"
);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-white rounded-2xl shadow-sm border border-[#F1F5F9] mb-4">



 <div className="inline-flex items-center justify-center w-14 h-14 bg-white rounded-2xl shadow-sm border border-[#F1F5F9] mb-4 relative">
  <div className="w-3 h-3 bg-[#097FE8] rounded-full"></div>
  <div className="absolute w-6 h-6 border-2 border-[#097FE8]/30 rounded-full animate-ping"></div>
  <div className="absolute w-10 h-10 border border-[#097FE8]/10 rounded-full"></div>
</div>

          </div>
          <h1 className="text-3xl font-black text-[#0F172A] tracking-tight">Create Account</h1>
          <p className="text-[#64748B] font-medium mt-2">Join PollSync and start collecting live insights.</p>
        </div>

        <div className="bg-white p-8 rounded-[2rem] border border-[#F1F5F9] shadow-xl shadow-slate-200/50 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1.5 bg-[#097FE8]"></div>

          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
            
            <div className="space-y-1">
              <label className="text-[11px] font-black uppercase tracking-widest text-[#94A3B8] ml-1">Full Name</label>
              <input 
                type="text" 
                placeholder="Tejas Dev" 
                {...register("name")} 
                className="w-full p-4 bg-[#F8FAFC] border border-[#F1F5F9] rounded-2xl text-[#0F172A] font-medium outline-none focus:border-[#097FE8] focus:ring-4 focus:ring-[#097FE8]/5 transition-all placeholder:text-[#CBD5E1]"
              />
            </div>

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
              <label className="text-[11px] font-black uppercase tracking-widest text-[#94A3B8] ml-1">Password</label>
              <input 
                type="password" 
                placeholder="••••••••" 
                {...register("password")} 
                className="w-full p-4 bg-[#F8FAFC] border border-[#F1F5F9] rounded-2xl text-[#0F172A] font-medium outline-none focus:border-[#097FE8] focus:ring-4 focus:ring-[#097FE8]/5 transition-all placeholder:text-[#CBD5E1]"
              />
              <p className="text-[10px] text-[#94A3B8] mt-2 ml-1">Must be at least 8 characters long.</p>
            </div>

            <button 
              type="submit" 
              className="w-full py-4 bg-[#097FE8] text-white font-black uppercase tracking-widest rounded-2xl hover:bg-[#0866ba] shadow-lg shadow-blue-100 transition-all active:scale-[0.98] mt-2 flex items-center justify-center gap-2"
            >
              Get Started
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </form>
        </div>

        <p className="text-center mt-8 text-sm font-bold text-[#64748B]">
          Already have an account?{" "}
          <Link to="/login" className="text-[#097FE8] hover:underline">Sign In</Link>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;