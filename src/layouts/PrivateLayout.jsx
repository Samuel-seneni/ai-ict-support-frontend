import { useAuth } from "../contexts/AuthContext";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/layout/Sidebar";

const PrivateLayout = () => {
  const { user } = useAuth();

  return (
    <div className="flex min-h-screen bg-gray-50">

      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col">

        {/* TOP BAR */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 shadow-sm">

          <div className="text-sm text-gray-600">
            Welcome back,{" "}
            <span className="font-semibold text-blue-600">
              {user?.fullName || user?.email || "User"}
            </span>
          </div>

          <div className="text-xs text-gray-500 hidden sm:block">
            Smart ICT Desk Dashboard
          </div>

        </header>

        {/* PAGE CONTENT */}
        <main className="flex-1 p-6 lg:p-10 overflow-y-auto">
          <Outlet />
        </main>

      </div>
    </div>
  );
};

export default PrivateLayout;