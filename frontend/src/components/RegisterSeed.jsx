import React, { useState } from "react";
import { createSeed } from "../services/seedService";
import "../styles/RegisterSeed.css";

export default function RegisterSeed({ onClose, onSaved }) {
  const [form, setForm] = useState({
    plantName: "",
    variety: "",
    supplier: "",
    quantity: "",
    acquisitionDate: "",
    expirationDate: ""
  });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    createSeed(form).then(() => {
      onSaved();
      onClose();
    });
  };

  return (
    <div className="modal-overlay">
      <div className="modal-card">
        <h2 className="modal-title">Registrar Semilla</h2>

        <div className="form-group">
          <label>Nombre de la Planta</label>
          <input name="plantName" onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Variedad</label>
          <input name="variety" onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Proveedor</label>
          <input name="supplier" onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Cantidad</label>
          <input type="number" name="quantity" onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Fecha de Adquisición</label>
          <input type="date" name="acquisitionDate" onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Fecha de Expiración</label>
          <input type="date" name="expirationDate" onChange={handleChange} />
        </div>

        <div className="modal-actions">
          <button className="btn-primary" onClick={handleSave}>Guardar</button>
          <button className="btn-secondary" onClick={onClose}>Cancelar</button>
        </div>
      </div>
    </div>
  );
}
