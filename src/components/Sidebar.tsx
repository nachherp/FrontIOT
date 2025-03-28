import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../styles/Sidebar.css";

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    localStorage.removeItem("auth");
    navigate("/login", { replace: true }); // 🔁 reemplaza historial
  };

  return (
    <div className="sidebar">
      <div className="logo">🔷</div>
      <ul className="nav-links">
        <li
          className={isActive("/dashboard") ? "active" : ""}
          onClick={() => navigate("/dashboard")}
        >
          Dashboard
        </li>
        <li
          className={isActive("/historial") ? "active" : ""}
          onClick={() => navigate("/historial")}
        >
          Historial
        </li>
        <li
          className={isActive("/eliminadas") ? "active" : ""}
          onClick={() => navigate("/eliminadas")}
        >
          Parcelas Eliminadas
        </li>
        <li onClick={handleLogout}>Salir</li>
      </ul>
    </div>
  );
}

export default Sidebar;
