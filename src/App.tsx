import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Páginas
import Login from "./pages/Login";
import Verificar from "./pages/Verificar";
import Usuario from "./pages/Usuario";

// Protegidas
import Dashboard from "./components/Dashboard";
import HistoricalCharts from "./components/HistoricalCharts";
import DeletedParcelas from "./components/DeletedParcelas";
import PrivateRoute from "./components/PrivateRoute"; // o desde donde lo tengas

function App() {
  return (
    <Router>
      <Routes>
        {/* Públicas */}
        <Route path="/login" element={<Login />} />
        <Route path="/verificar" element={<Verificar />} />
        <Route path="/usuario" element={<Usuario />} />

        {/* Protegidas */}
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/historial" element={<HistoricalCharts />} />
          <Route path="/eliminadas" element={<DeletedParcelas />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
