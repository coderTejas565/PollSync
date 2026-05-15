import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const Navbar = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
    window.location.reload(); // simple sync fix for now
  };

  return (
    <nav className="w-full bg-white border-b border-[#F1F5F9] sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <Link
          to="/dashboard"
          className="font-black text-xl text-[#097FE8]"
        >
          PulseBoard
        </Link>

        {/* Links */}
        <div className="flex items-center gap-6 text-sm font-semibold text-[#475569]">

          {user ? (
            <>
              <Link to="/dashboard" className="hover:text-[#097FE8]">
                Dashboard
              </Link>

              <Link to="/create" className="hover:text-[#097FE8]">
                Create Poll
              </Link>

              <Link
                to="#"
                onClick={handleLogout}
                className="text-red-500 font-bold"
              >
                Logout
              </Link>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-[#097FE8]">
                Login
              </Link>

              <Link to="/signup" className="hover:text-[#097FE8]">
                Signup
              </Link>
            </>
          )}

        </div>
      </div>
    </nav>
  );
};

export default Navbar;