import React, { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "../styles/MapDisplay.css";
import axios from "axios";


const customIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

interface Parcela {
  id: number;
  nombre: string;
  tipo_cultivo: string;
  responsable: string;
  latitud: number;
  longitud: number;
  ultimo_riego: string;
}


function CenterMap({ lat, lng }: { lat: number; lng: number }) {
  const map = useMap();

  useEffect(() => {
    map.setView([lat, lng], map.getZoom(), { animate: true });
  }, [lat, lng, map]);

  return null;
}

function MapDisplay() {
  const [parcelas, setParcelas] = useState<Parcela[]>([]);

  useEffect(() => {
    const fetchParcelas = async () => {
      try {
        
        await axios.get("http://localhost:3000/sensores/sync");

        
        const response = await axios.get("http://localhost:3000/sensores/dashboard");
        const parcelasAPI = response.data?.parcelas;

        if (parcelasAPI) {
          setParcelas(parcelasAPI);
        } else {
          console.warn("⚠️ No se encontraron parcelas.");
        }
      } catch (error: any) {
        console.error("❌ Error al obtener parcelas:", error.message || error);
      }
    };

    
    fetchParcelas();

  
    const interval = setInterval(() => {
      fetchParcelas();
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="map-container">
      <MapContainer
        center={[20.0, -90.0]} 
        zoom={13}
        scrollWheelZoom={true}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://osm.org">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

      
        {parcelas.length > 0 && (
          <CenterMap
            lat={parcelas[0].latitud}
            lng={parcelas[0].longitud}
          />
        )}


        {parcelas.map((parcela) => (
          <Marker
            key={parcela.id}
            position={[parcela.latitud, parcela.longitud]}
            icon={customIcon}
          >
            <Popup>
              <strong>{parcela.nombre}</strong>
              <br />
              Cultivo: {parcela.tipo_cultivo}
              <br />
              Responsable: {parcela.responsable}
              <br />
              Último riego:{" "}
              {new Date(parcela.ultimo_riego).toLocaleString("es-MX")}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

export default MapDisplay;
