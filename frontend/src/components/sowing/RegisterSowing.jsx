import React, { useState } from "react";
import { registerSowing } from "../../services/sowingService";
import "../../styles/SowingModal.css";

export default function RegisterSowing({ onClose, onSaved }) {
  const [form, setForm] = useState({
    seedName: "",
    quantity: "",
    startDate: "",
    harvestDate: "",
    observations: "",
    fumigationFrequency: ""
  });

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSave = async () => {
    // simple validation
    if (!form.seedName || !form.startDate) {
      alert("Completa al menos nombre y fecha de inicio");
      return;
    }

    await registerSowing({
      ...form,
      quantity: Number(form.quantity || 0),
      fumigationFrequency: Number(form.fumigationFrequency || 0),
      status: "Sembrada"
    });
    onSaved();
  };

  return (
    <div className="modal-bg">
      <div className="modal-box">
        <h2>Registrar Siembra</h2>

        <input name="seedName" placeholder="Nombre semilla" onChange={handleChange} />
        <input name="quantity" type="number" placeholder="Cantidad" onChange={handleChange} />
        <label>Fecha inicio</label>
        <input name="startDate" type="date" onChange={handleChange} />
        <label>Fecha cosecha</label>
        <input name="harvestDate" type="date" onChange={handleChange} />
        <textarea name="observations" placeholder="Observaciones" onChange={handleChange} />
        <input name="fumigationFrequency" type="number" placeholder="Frecuencia fumigación (días)" onChange={handleChange} />

        <button className="btn-save" onClick={handleSave}>Guardar</button>
        <button className="btn-cancel" onClick={onClose}>Cancelar</button>
      </div>
    </div>
  );
}
