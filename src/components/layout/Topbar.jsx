// src/components/layout/Topbar.jsx
import { FaBell } from "react-icons/fa";
import { useAuth } from "../../contexts/AuthContext";

const Topbar = () => {
  const { user } = useAuth();

  return (
    <div className="h-16 bg-white border-b flex items-center justify-between px-6 sticky top-0 z-30">

      <div>
        Welcome, <b>{user?.email}</b>
      </div>

      <div className="flex items-center gap-4">

        <button className="relative">
          <FaBell />

          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 rounded-full text-center">
            2
          </span>
        </button>

      </div>

    </div>
  );
};

export default Topbar;