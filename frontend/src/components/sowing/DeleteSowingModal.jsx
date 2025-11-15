import React from "react";
import { deleteSowing } from "../../services/sowingService";
import "../../styles/SowingModal.css";

export default function DeleteSowingModal({ sowingId, onClose, onDeleted }) {
  const handleDelete = async () => {
    await deleteSowing(sowingId);
    onDeleted();
  };

  return (
    <div className="modal-bg">
      <div className="modal-box">
        <h2>¿Eliminar siembra?</h2>
        <p>Esta acción no se puede deshacer.</p>

        <button className="btn-delete" onClick={handleDelete}>Eliminar</button>
        <button className="btn-cancel" onClick={onClose}>Cancelar</button>
      </div>
    </div>
  );
}
