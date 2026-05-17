import { useAuth } from "../contexts/AuthContext";

const PrivateLayout = ({ children }) => {
  const { user } = useAuth();

  return (
    <div style={{ display: "flex" }}>
      {/* Sidebar (optional later) */}

      <div style={{ flex: 1 }}>
        {/* Top bar */}
        <div style={{ padding: 10, borderBottom: "1px solid #ddd" }}>
          Welcome: {user?.email}
        </div>

        <main style={{ padding: 20 }}>{children}</main>
      </div>
    </div>
  );
};

export default PrivateLayout;