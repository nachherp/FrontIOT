import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";
import SensorCard from "./SensorCard";
import MapDisplay from "./MapDisplay";
import "../styles/Dashboard.css";

interface Sensor {
  temperatura: string;
  humedad: string;
  lluvia: string;
  intensidadSolar: string;
}

function Dashboard() {
  const [data, setData] = useState<Sensor>({
    temperatura: "0 °C",
    humedad: "0%",
    lluvia: "0 mm",
    intensidadSolar: "0 W/m²",
  });

  useEffect(() => {
    const sincronizarYObtenerDatos = async () => {
      try {
        await axios.get("http://localhost:3000/sensores/sync");

        const response = await axios.get("http://localhost:3000/sensores/dashboard");
        const lastRecord = response.data?.lastRecord;

        if (lastRecord) {
          setData({
            temperatura: `${lastRecord.temperatura} °C`,
            humedad: `${lastRecord.humedad}%`,
            lluvia: `${lastRecord.lluvia} mm`,
            intensidadSolar: `${lastRecord.intensidad_solar} W/m²`,
          });
        } else {
          console.warn(" No hay datos disponibles para mostrar.");
        }
      } catch (error: any) {
        console.error(" Error en la sincronización o carga de datos:", error.message || error);
      }
    };

    
    sincronizarYObtenerDatos();

    
    const interval = setInterval(() => {
      sincronizarYObtenerDatos();
    }, 10000); 

    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="dashboard-content">
        <div className="dashboard-header">
          <h1>Cultivos del Sur | Mapa de Ubicaciones</h1>
          <div className="user-badge">RV</div>
        </div>
        <div className="dashboard-main">
          <MapDisplay />
          <div className="sensor-grid">
            <SensorCard label="Temperatura" value={data.temperatura} />
            <SensorCard label="Humedad" value={data.humedad} />
            <SensorCard label="Lluvia" value={data.lluvia} icon="🌧️" />
            <SensorCard label="Intensidad del sol" value={data.intensidadSolar} icon="🌞" />
          </div>
        </div>
        <footer className="dashboard-footer">
          © 2025 MarketinIA - Todos los derechos reservados
        </footer>
      </div>
    </div>
  );
}

export default Dashboard;
