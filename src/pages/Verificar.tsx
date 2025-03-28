import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/Verificar.css";

const Verificar: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const isAuth = localStorage.getItem("auth") === "true";
    const isVerified = localStorage.getItem("verified") === "true";

    if (!isAuth) {
      navigate("/", { replace: true }); // No autenticado → redirigir a login
    } else if (isVerified) {
      navigate("/dashboard", { replace: true }); // Ya verificado → dashboard
    }
  }, []);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    localStorage.setItem("verified", "true"); // ✅ marcar como verificado
    navigate("/dashboard", { replace: true });
  };

  return (
    <div className="verification-container">
      <div className="verification-form">
        <h2>Verifica tu cuenta</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Color favorito" required />
          <input type="text" placeholder="Deporte favorito" required />
          <button type="submit">Verificar</button>
        </form>
      </div>
    </div>
  );
};

export default Verificar;
