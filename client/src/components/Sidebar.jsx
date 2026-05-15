import { useState } from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-black uppercase tracking-wider transition-all duration-200 group ${
      isActive
        ? "bg-[#097FE8] text-white shadow-md shadow-blue-100"
        : "text-[#475569] hover:text-[#0F172A] hover:bg-[#F1F5F9]"
    }`;

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      {/* MOBILE HEADER BAR (Visible only on screens below md breakpoint) */}
      <div className="md:hidden h-16 w-full bg-white border-b border-[#E2E8F0] px-4 flex items-center justify-between sticky top-0 z-40 antialiased">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 bg-[#097FE8] rounded-lg flex items-center justify-center text-white font-black text-xs shadow-sm">
            P
          </div>
          <h1 className="text-lg font-black text-[#0F172A] tracking-tight">
            Poll<span className="text-[#097FE8]">Sync</span>
          </h1>
        </div>
        
        {/* HAMBURGER TRIGGER BUTTON */}
        <button
          onClick={toggleSidebar}
          className="p-2 text-[#475569] hover:text-[#0F172A] focus:outline-none"
          aria-label="Toggle Navigation Sidebar"
        >
          {isOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* MOBILE DARK BACKDROP OVERLAY (Dim background when navigation drawer is pulled open) */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 transition-opacity duration-300"
          onClick={toggleSidebar}
        />
      )}

      {/* RESPONSIVE NAVIGATION SIDEBAR DRAWER */}
      <aside
        className={`fixed inset-y-0 left-0 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:relative md:translate-x-0 w-64 h-screen bg-white border-r border-[#E2E8F0] flex flex-col z-50 transition-transform duration-300 ease-in-out antialiased`}
      >
        {/* BRAND ARCHITECTURE */}
        <div className="h-16 px-6 border-b border-[#E2E8F0] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 bg-[#097FE8] rounded-lg flex items-center justify-center text-white font-black text-xs shadow-sm">
              P
            </div>
            <h1 className="text-lg font-black text-[#0F172A] tracking-tight">
              Poll<span className="text-[#097FE8]">Sync</span>
            </h1>
          </div>

          {/* INNER CLOSE TRIGGER (Visible solely inside the mobile active layout overlay menu) */}
          <button
            onClick={toggleSidebar}
            className="md:hidden p-1 text-[#475569] hover:text-[#0F172A]"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* NAVIGATION MANIFEST */}
        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
          <p className="text-[10px] font-black text-[#94A3B8] tracking-widest uppercase px-3 mb-3">
            Main Workspace
          </p>

          <NavLink to="/dashboard" className={linkClass} onClick={() => setIsOpen(false)}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 shrink-0 transition-transform group-hover:scale-105" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2v-4zM14 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2v-4z" />
            </svg>
            Dashboard
          </NavLink>

          <NavLink to="/create" className={linkClass} onClick={() => setIsOpen(false)}>
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

          <NavLink to="/dashboard" className={linkClass} onClick={() => setIsOpen(false)}>
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
    </>
  );
};

export default Sidebar;