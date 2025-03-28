import React from "react";
import "../styles/SensorCard.css";

interface Props {
  label: string;
  value?: string;
  icon?: string;
}

function SensorCard({ label, value, icon }: Props) {
  return (
    <div className="sensor-card">
      <p>{label}</p>
      {value && <h2>{value}</h2>}
      {icon && <div className="icon">{icon}</div>}
    </div>
  );
}

export default SensorCard;
