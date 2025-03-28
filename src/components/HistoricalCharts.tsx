import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Line,
  Bar,
  Doughnut,
  Radar,
} from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  RadialLinearScale,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import Sidebar from "./Sidebar";
import "../styles/HistoricalCharts.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  RadialLinearScale,
  Filler,
  Tooltip,
  Legend
);

function HistoricalCharts() {
  const [labels, setLabels] = useState<string[]>([]);
  const [temperatura, setTemperatura] = useState<number[]>([]);
  const [humedad, setHumedad] = useState<number[]>([]);
  const [lluvia, setLluvia] = useState<number[]>([]);
  const [sol, setSol] = useState<number[]>([]);

  useEffect(() => {
    axios.get("http://localhost:3000/sensores/historial").then((res) => {
      const data = res.data;
  
      const intervaloMs = 2 * 60 * 1000; // 2 minutos en milisegundos
      let ultimoTimestamp = 0;
  
      const filtrado = data.filter((item: any) => {
        const actual = new Date(item.fecha).getTime();
        if (actual - ultimoTimestamp >= intervaloMs) {
          ultimoTimestamp = actual;
          return true;
        }
        return false;
      });
  
      setLabels(filtrado.map((item) => new Date(item.fecha).toLocaleString()));
      setTemperatura(filtrado.map((item) => item.temperatura));
      setHumedad(filtrado.map((item) => item.humedad));
      setLluvia(filtrado.map((item) => item.lluvia));
      setSol(filtrado.map((item) => item.intensidad_solar));
    });
  }, []);
  

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div className="historical-container">
      <Sidebar />
      <div className="historical-content">
        <h2 style={{ marginBottom: "16px" }}>📊 Historial de Sensores</h2>
        <div className="chart-grid">
          <div className="chart-box">
            <h3>📈 Temperatura</h3>
            <Line
              options={chartOptions}
              data={{
                labels,
                datasets: [
                  {
                    label: "Temperatura (°C)",
                    data: temperatura,
                    borderColor: "red",
                    backgroundColor: "rgba(255, 99, 132, 0.2)",
                    tension: 0.3,
                    fill: true,
                  },
                ],
              }}
            />
          </div>

          <div className="chart-box">
            <h3>🌀 Humedad</h3>
            <Radar
              options={chartOptions}
              data={{
                labels,
                datasets: [
                  {
                    label: "Humedad (%)",
                    data: humedad,
                    backgroundColor: "rgba(54,162,235,0.2)",
                    borderColor: "rgba(54,162,235,1)",
                    borderWidth: 2,
                  },
                ],
              }}
            />
          </div>

          <div className="chart-box">
            <h3>🌧️ Lluvia</h3>
            <Bar
              options={chartOptions}
              data={{
                labels,
                datasets: [
                  {
                    label: "Lluvia (mm)",
                    data: lluvia,
                    backgroundColor: "rgba(75,192,192,0.5)",
                    borderColor: "rgba(75,192,192,1)",
                    borderWidth: 1,
                  },
                ],
              }}
            />
          </div>

          <div className="chart-box">
            <h3>☀️ Intensidad Solar</h3>
            <Doughnut
              options={chartOptions}
              data={{
                labels,
                datasets: [
                  {
                    label: "Intensidad Solar (W/m²)",
                    data: sol,
                    backgroundColor: [
                      "#FFD700",
                      "#FFA500",
                      "#FF8C00",
                      "#FF4500",
                      "#FF6347",
                    ],
                  },
                ],
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default HistoricalCharts;
