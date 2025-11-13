import React from "react";
import improscolLogo from "../images/logo-completo.png";
import "../styles/Dashboard.css";

export default function Dashboard() {
  return (
    <div className="dashboard-container">
      <h1>IMPROSVITA</h1>
      <p>
        Este sistema ha sido diseñado para apoyar la gestión integral de Improscol S.A.S.,
        facilitando el control digital de los procesos clave de la empresa.
        A través de sus diferentes módulos, Improsvita reemplaza los registros
        manuales por un sistema centralizado y seguro, reduciendo pérdidas de
        información y optimizando la toma de decisiones.
      </p>
      <img src={improscolLogo} alt="Improcol S.A.S" className="dashboard-logo" />
    </div>
  );
}
