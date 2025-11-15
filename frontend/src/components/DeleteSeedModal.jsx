import React from "react";
import { deleteSeed } from "../services/seedService";
import "../styles/DeleteSeedModal.css";

export default function DeleteSeedModal({ seedId, onClose, onDeleted }) {

  const handleDelete = () => {
    deleteSeed(seedId).then(() => {
      onDeleted();
      onClose();
    });
  };

  return (
    <div className="modal-overlay">
      <div className="modal-card delete">
        <h2 className="modal-title delete-title">¿Eliminar semilla?</h2>
        <p className="delete-text">Esta acción es irreversible.</p>

        <div className="modal-actions">
          <button className="btn-delete" onClick={handleDelete}>Eliminar</button>
          <button className="btn-secondary" onClick={onClose}>Cancelar</button>
        </div>
      </div>
    </div>
  );
}
