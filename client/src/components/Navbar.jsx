import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <header className="h-16 bg-white border-b border-[#E2E8F0] flex items-center justify-between px-6 antialiased shrink-0">
      
      {/* Structural Spacer Element */}
      <div />

      {/* Account Control Vector Grid */}
      <div className="flex items-center gap-4">

        {user ? (
          <>
            {/* Identity Profile Badge Context */}
            <div className="flex items-center gap-2.5 bg-[#F8FAFC] border border-[#E2E8F0] pl-2.5 pr-3 py-1.5 rounded-xl transition-all hover:border-[#CBD5E1]">
              <div className="w-6 h-6 bg-[#097FE8] text-white rounded-lg flex items-center justify-center font-black text-[10px] uppercase select-none tracking-wider">
                {user.name ? user.name.substring(0, 2) : "US"}
              </div>
              <span className="text-xs font-bold text-[#334155] tracking-tight">
                {user.name}
              </span>
            </div>

            {/* Termination Command Control */}
            <button
              onClick={handleLogout}
              className="inline-flex items-center justify-center gap-1.5 px-3 py-2 border border-transparent hover:border-[#FEE2E2] text-red-500 hover:text-red-600 hover:bg-red-50/50 rounded-xl text-xs font-black uppercase tracking-wider transition-all active:scale-[0.98]"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Logout
            </button>
          </>
        ) : (
          /* Unauthenticated Terminal State */
          <div className="inline-flex items-center gap-1.5 bg-[#F1F5F9]/60 border border-[#E2E8F0] px-3 py-1.5 rounded-xl text-[10px] font-black text-[#64748B] uppercase tracking-widest">
            <span className="w-1.5 h-1.5 bg-[#94A3B8] rounded-full"></span>
            Guest Sandbox Mode
          </div>
        )}

      </div>
    </header>
  );
};

export default Navbar;