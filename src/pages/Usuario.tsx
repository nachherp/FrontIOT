import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/Usuario.css";
import { FiMenu, FiX } from "react-icons/fi";

const Profile: React.FC = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <div className={`profile-container ${menuOpen ? "blur-background" : ""}`}>
      {/* Header con menú de hamburguesa */}
      <header className="profile-header">
        <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <FiX size={30} /> : <FiMenu size={30} />}
        </button>

        <button className="logout-button" onClick={handleLogout}>
          Cerrar sesión
        </button>
      </header>

      {/* Menú lateral deslizante */}
      <nav className={`menu ${menuOpen ? "open" : ""}`}>
        <a href="/dashboard" onClick={() => setMenuOpen(false)}>Dashboard</a>
        <a href="/usuario" className="active" onClick={() => setMenuOpen(false)}>Perfil</a>
      </nav>

      {/* Contenido de perfil */}
      <div className="profile-content">
        <div className="profile-info">
          <h2>Información del Perfil</h2>
          <div className="info-item">
            <span className="label">Nombre:</span>
            <span className="value">Juan Pérez</span>
          </div>
          <div className="info-item">
            <span className="label">Correo electrónico:</span>
            <span className="value">juan.perez@example.com</span>
          </div>
          <div className="info-item">
            <span className="label">Teléfono:</span>
            <span className="value">555-1234567</span>
          </div>
        </div>

        <div className="sensor-info">
          <h2>Información del Sensor</h2>
          <div className="info-item">
            <span className="label">Ubicación:</span>
            <span className="value">Sala de estar</span>
          </div>
          <div className="info-item">
            <span className="label">Humedad:</span>
            <span className="value">78%</span>
          </div>
          <div className="info-item">
            <span className="label">Temperatura:</span>
            <span className="value">23°C</span>
          </div>
          <div className="info-item">
            <span className="label">Movimiento:</span>
            <span className="value">Detectado</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="profile-footer">
        <p>&copy; 2025 Aplicación de Perfil. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
};

export default Profile;
