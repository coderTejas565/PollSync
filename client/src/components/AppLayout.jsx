import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import Breadcrumbs from "./Breadcrumbs";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <div className="h-screen flex bg-[#F8FAFC] overflow-hidden">

      <Sidebar />

      <div className="flex flex-col flex-1">

        <Navbar />

        <Breadcrumbs />

        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>

      </div>
    </div>
  );
};

export default AppLayout;