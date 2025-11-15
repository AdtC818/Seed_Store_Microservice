import React from "react";
import "../../styles/SowingModal.css";

export default function ViewSowing({ sowing, onClose }) {
  if (!sowing) return null;
  return (
    <div className="modal-bg">
      <div className="modal-box">
        <h2>Detalles</h2>
        <p><b>Semilla:</b> {sowing.seedName}</p>
        <p><b>Cantidad:</b> {sowing.quantity}</p>
        <p><b>Inicio:</b> {sowing.startDate}</p>
        <p><b>Cosecha:</b> {sowing.harvestDate}</p>
        <p><b>Estado:</b> {sowing.status}</p>
        <p><b>Fumigación (días):</b> {sowing.fumigationFrequency}</p>
        <p><b>Observaciones:</b> {sowing.observations}</p>

        <button className="btn-cancel" onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );
}
