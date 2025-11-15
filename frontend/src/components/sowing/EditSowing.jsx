import React, { useEffect, useState } from "react";
import { getAllSowings, updateSowingStatus } from "../../services/sowingService";
import "../../styles/SowingModal.css";

export default function EditSowing({ sowingId, onClose, onUpdated }) {
  const [sowing, setSowing] = useState(null);
  const [newStatus, setNewStatus] = useState("");

  useEffect(() => {
    const load = async () => {
      const res = await getAllSowings();
      const found = res.data.find(s => s.id === sowingId);
      setSowing(found || null);
      setNewStatus(found?.status || "Sembrada");
    };
    load();
  }, [sowingId]);

  if (!sowing) return null;

  const handleUpdate = async () => {
    await updateSowingStatus(sowingId, newStatus);
    onUpdated();
  };

  return (
    <div className="modal-bg">
      <div className="modal-box">
        <h2>Editar Siembra</h2>

        <p><b>Semilla:</b> {sowing.seedName}</p>
        <p><b>Estado actual:</b> {sowing.status}</p>

        <label>Nuevo estado</label>
        <select value={newStatus} onChange={e => setNewStatus(e.target.value)}>
          <option>Sembrada</option>
          <option>En crecimiento</option>
          <option>Lista para cosecha</option>
          <option>Finalizada</option>
        </select>

        <button className="btn-save" onClick={handleUpdate}>Actualizar</button>
        <button className="btn-cancel" onClick={onClose}>Cancelar</button>
      </div>
    </div>
  );
}
