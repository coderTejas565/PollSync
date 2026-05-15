import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-black uppercase tracking-wider transition-all duration-200 group ${
      isActive
        ? "bg-[#097FE8] text-white shadow-md shadow-blue-100"
        : "text-[#475569] hover:text-[#0F172A] hover:bg-[#F1F5F9]"
    }`;

  return (
    <aside className="w-64 h-screen bg-white border-r border-[#E2E8F0] flex flex-col antialiased">

      {/* BRAND ARCHITECTURE */}
      <div className="h-16 px-6 border-b border-[#E2E8F0] flex items-center gap-2.5 shrink-0">
        <div className="w-7 h-7 bg-[#097FE8] rounded-lg flex items-center justify-center text-white font-black text-xs shadow-sm">
          P
        </div>
        <h1 className="text-lg font-black text-[#0F172A] tracking-tight">
          Poll<span className="text-[#097FE8]">Sync</span>
        </h1>
      </div>

      {/* NAVIGATION MANIFEST */}
      <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">

        <p className="text-[10px] font-black text-[#94A3B8] tracking-widest uppercase px-3 mb-3">
          Main Workspace
        </p>

        <NavLink to="/dashboard" className={linkClass}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 shrink-0 transition-transform group-hover:scale-105" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2v-4zM14 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2v-4z" />
          </svg>
          Dashboard
        </NavLink>

        <NavLink to="/create" className={linkClass}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 shrink-0 transition-transform group-hover:scale-105" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Create Poll
        </NavLink>

        <div className="pt-4">
          <p className="text-[10px] font-black text-[#94A3B8] tracking-widest uppercase px-3 mb-3">
            Analytics Engine
          </p>
        </div>

        <NavLink to="/dashboard" className={linkClass}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 shrink-0 transition-transform group-hover:scale-105" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          My Polls
        </NavLink>

      </nav>

      {/* DEPLOYMENT METRICS FOOTER */}
      <div className="p-4 border-t border-[#E2E8F0] bg-[#F8FAFC] flex items-center justify-between">
        <span className="text-[10px] font-bold text-[#64748B] tracking-wider uppercase">
          v1.0 • Hackathon Build
        </span>
        <span className="w-1.5 h-1.5 bg-[#10B981] rounded-full ring-4 ring-[#10B981]/10"></span>
      </div>

    </aside>
  );
};

export default Sidebar;