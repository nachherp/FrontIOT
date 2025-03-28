import React from "react";
import { Navigate, Outlet } from "react-router-dom";

function PrivateRoute() {
  const isAuth = localStorage.getItem("auth") === "true";
  const isVerified = localStorage.getItem("verified") === "true";

  if (!isAuth) {
    return <Navigate to="/login" replace />;
  }

  if (!isVerified) {
    return <Navigate to="/verificar" replace />;
  }

  return <Outlet />;
}

export default PrivateRoute;
