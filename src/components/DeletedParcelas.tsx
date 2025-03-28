import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";
import "../Styles/DeletedParcelas.css";

function DeletedParcelas() {
  const [parcelas, setParcelas] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/parcelas/eliminadas").then((res) => {
      setParcelas(res.data);
    });
  }, []);

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="dashboard-content">
        <h2>Parcelas eliminadas de la API</h2>
        <div className="deleted-list">
          {parcelas.map((p) => (
            <div key={p.id} className="deleted-card">
              <h3>{p.nombre}</h3>
              <p><strong>Ubicación:</strong> {p.ubicacion}</p>
              <p><strong>Tipo de cultivo:</strong> {p.tipo_cultivo}</p>
              <p><strong>Responsable:</strong> {p.responsable}</p>
              <p><strong>Último riego:</strong> {new Date(p.ultimo_riego).toLocaleString()}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DeletedParcelas;
