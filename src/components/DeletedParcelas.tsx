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
        <h2>📦 Parcelas Eliminadas de la API</h2>

        <div className="table-container">
          <table className="deleted-table">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Ubicación</th>
                <th>Tipo de Cultivo</th>
                <th>Responsable</th>
                <th>Último Riego</th>
                <th>Fecha de Eliminación</th>
              </tr>
            </thead>
            <tbody>
              {parcelas.map((p) => (
                <tr key={p.id}>
                  <td>{p.nombre}</td>
                  <td>{p.ubicacion}</td>
                  <td>{p.tipo_cultivo}</td>
                  <td>{p.responsable}</td>
                  <td>{new Date(p.ultimo_riego).toLocaleString("es-MX")}</td>
                  <td>{new Date(p.fechaEliminada).toLocaleString("es-MX")}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {parcelas.length === 0 && (
            <p className="no-data">No hay parcelas eliminadas registradas.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default DeletedParcelas;
