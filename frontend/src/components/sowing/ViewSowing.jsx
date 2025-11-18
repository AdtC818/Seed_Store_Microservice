import React from "react";
import "../../styles/SowingModal.css";

export default function ViewSowing({ sowing, onClose }) {
  // Si no hay datos, no renderiza nada
  if (!sowing) return null;

  // Formateo de fechas seguro
  const fmt = (date) =>
    date
      ? new Date(date).toLocaleDateString('es-ES', {
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      : "No aplica";

  return (
    <div className="modal-bg" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>

        <h2>Detalles de la Siembra</h2>

        {/* Semilla */}
        <div className="detail">
          <span>Semilla:</span>
          <b>{sowing.seedName || "Desconocido"}</b>
        </div>

        {/* Cantidad */}
        <div className="detail">
          <span>Cantidad:</span>
          <b>{sowing.quantity ?? "N/A"}</b>
        </div>

        {/* Fechas */}
        <div className="detail">
          <span>Inicio:</span>
          <b>{fmt(sowing.startDate)}</b>
        </div>

        <div className="detail">
          <span>Cosecha:</span>
          <b>{fmt(sowing.harvestDate)}</b>
        </div>

        {/* Estado */}
        <div className="detail">
          <span>Estado:</span>
          <b className={`state ${sowing.status?.toLowerCase() || ""}`}>
            {sowing.status || "Sin estado"}
          </b>
        </div>

        {/* Availability */}
        <div className="detail">
          <span>Disponibilidad:</span>
          <b className={`state ${sowing.availabilityStatus?.toLowerCase()}`}>
            {sowing.availabilityStatus || "N/A"}
          </b>
        </div>

        {/* Contacto si aplica */}
        {sowing.contactName && (
          <div className="detail">
            <span>Contacto (Apartada por):</span>
            <b>{sowing.contactName}</b>
          </div>
        )}

        {/* Fumigación */}
        <div className="detail">
          <span>Fumigación (cada días):</span>
          <b>{sowing.fumigationFrequency || "No aplica"}</b>
        </div>

        {/* Observaciones */}
        <div className="detail">
          <span>Observaciones:</span>
          <b>{sowing.observations || "Sin observaciones"}</b>
        </div>

        <button className="btn-cancel" onClick={onClose}>
          Cerrar
        </button>

      </div>
    </div>
  );
}
