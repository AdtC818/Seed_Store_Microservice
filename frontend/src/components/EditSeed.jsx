import React, { useEffect, useState } from "react";
import { getSeedById, updateSeed } from "../services/seedService";
import "../styles/EditSeed.css";

export default function EditSeed({ seedId, onClose, onUpdated }) {
  const [form, setForm] = useState(null);

  useEffect(() => {
    getSeedById(seedId).then(res => setForm(res.data));
  }, [seedId]);

  if (!form) return null;

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = () => {
    updateSeed(seedId, form).then(() => {
      onUpdated();
      onClose();
    });
  };

  return (
    <div className="modal-overlay">
      <div className="modal-card edit">
        <h2 className="modal-title">Editar Semilla</h2>

        {Object.keys(form).map(key =>
          key !== "id" ? (
            <div className="form-group" key={key}>
              <label>{key}</label>
              <input
                name={key}
                value={form[key]}
                onChange={handleChange}
                type={key.includes("Date") ? "date" : "text"}
              />
            </div>
          ) : null
        )}

        <div className="modal-actions">
          <button className="btn-edit" onClick={handleUpdate}>Actualizar</button>
          <button className="btn-secondary" onClick={onClose}>Cancelar</button>
        </div>
      </div>
    </div>
  );
}
