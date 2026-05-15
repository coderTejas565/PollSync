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
    <header className="h-14 bg-white border-b flex items-center justify-between px-6">

      <div />

      <div className="flex items-center gap-4">

        {user ? (
          <>
            <span className="text-sm text-gray-600">
              {user.name}
            </span>

            <button
              onClick={handleLogout}
              className="text-red-500 text-sm"
            >
              Logout
            </button>
          </>
        ) : (
          <span className="text-sm text-gray-500">
            Not logged in
          </span>
        )}

      </div>
    </header>
  );
};

export default Navbar;