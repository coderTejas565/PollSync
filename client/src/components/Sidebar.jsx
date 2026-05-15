import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium transition ${
      isActive
        ? "bg-[#097FE8] text-white shadow-sm"
        : "text-[#475569] hover:bg-[#F1F5F9]"
    }`;

  return (
    <aside className="w-64 h-screen bg-white border-r border-[#F1F5F9] flex flex-col">

      {/* BRAND */}
      <div className="px-6 py-3.5 border-b">
        <h1 className="text-xl font-black text-[#097FE8]">
          PollSync
        </h1>
       
      </div>

      {/* NAV */}
      <nav className="flex-1 px-3 py-4 space-y-2">

        <p className="text-xs text-gray-400 px-3 mb-2">
          MAIN
        </p>

        <NavLink to="/dashboard" className={linkClass}>
          Dashboard
        </NavLink>

        <NavLink to="/create" className={linkClass}>
          Create Poll
        </NavLink>

        <p className="text-xs text-gray-400 px-3 mt-6 mb-2">
          POLLS
        </p>

        <NavLink to="/dashboard" className={linkClass}>
          My Polls
        </NavLink>

      </nav>

      {/* FOOTER */}
      <div className="p-4 border-t text-xs text-gray-400">
        v1.0 • Hackathon Build
      </div>

    </aside>
  );
};

export default Sidebar;