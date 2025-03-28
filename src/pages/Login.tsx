import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/Login.css";

const Login: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const isAuth = localStorage.getItem("auth") === "true";
    const isVerified = localStorage.getItem("verified") === "true";

    if (isAuth && isVerified) {
      navigate("/dashboard", { replace: true });
    } else if (isAuth) {
      navigate("/verificar", { replace: true });
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("auth", "true"); // solo autenticar, no verificar aún
    navigate("/verificar", { replace: true });
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Iniciar sesión</h2>
        <form onSubmit={handleSubmit}>
          <input type="email" placeholder="Correo" required />
          <input type="password" placeholder="Contraseña" required />
          <button type="submit">Entrar</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
