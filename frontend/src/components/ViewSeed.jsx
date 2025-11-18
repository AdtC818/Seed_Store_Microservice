import React, { useEffect, useState } from "react";
import { getAllSeeds } from "../services/seedService";
import "../styles/SowingModal.css";

export default function ViewSeed({ seedId, onClose }) {

  const [seed, setSeed] = useState(null);

  useEffect(() => {
    const load = async () => {
      const res = await getAllSeeds();
      const found = res.data.find(s => s.id === seedId);
      setSeed(found || null);
    };
    load();
  }, [seedId]);

  if (!seed) return null;

  return (
    <div className="modal-bg">
      <div className="modal-box pretty">

        <h2 className="title">Detalles de la Semilla</h2>

        <div className="info-group">

          <div className="detail-item">
            <span className="label">Planta</span>
            <p className="value strong">{seed.plantName}</p>
          </div>

          <div className="detail-item">
            <span className="label">Variedad</span>
            <p className="value">{seed.variety}</p>
          </div>

          <div className="detail-item">
            <span className="label">Cantidad Disponible</span>
            <p className="value">{seed.quantity ?? "No aplica"}</p>
          </div>

          <div className="detail-item">
            <span className="label">Días de Germinación</span>
            <p className="value">{seed.germinationDays ?? "No definido"}</p>
          </div>

          {seed.description && (
            <div className="detail-item description-block">
              <span className="label">Descripción</span>
              <p className="value">{seed.description}</p>
            </div>
          )}

        </div>

        <button className="btn-close" onClick={onClose}>Cerrar</button>

      </div>
    </div>
  );
}
