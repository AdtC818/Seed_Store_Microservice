import React, { useState, useEffect } from "react";
import { registerSowing } from "../../services/sowingService";
import { getAllSeeds } from "../../services/seedService";
import { getAllContacts } from "../../services/contactService";  
import "../../styles/SowingModal.css";

export default function RegisterSowing({ onClose, onSaved }) {
  const [seeds, setSeeds] = useState([]);
  const [contacts, setContacts] = useState([]);

  const [form, setForm] = useState({
    seedId: "",
    quantity: "",
    startDate: "",
    harvestDate: "",
    observations: "",
    fumigationFrequency: "",
    contactId: "", // <-- nuevo
  });

  useEffect(() => {
    loadSeeds();
    loadContacts();
  }, []);

  const loadSeeds = async () => {
    try {
      const res = await getAllSeeds();
      setSeeds(res.data);
    } catch (error) {
      console.error("❌ Error cargando semillas:", error);
      alert("No se pudieron cargar las semillas");
    }
  };

  const loadContacts = async () => {
    try {
      const res = await getAllContacts();
      setContacts(res.data);
    } catch (error) {
      console.error("❌ Error cargando contactos:", error);
      alert("No se pudieron cargar los contactos");
    }
  };

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSave = async () => {
    if (!form.seedId || !form.startDate) {
      alert("Debe seleccionar una semilla y la fecha de inicio");
      return;
    }

    const payload = {
      seedId: Number(form.seedId),
      quantity: Number(form.quantity || 0),
      startDate: form.startDate,
      harvestDate: form.harvestDate || null,
      observations: form.observations,
      fumigationFrequency: Number(form.fumigationFrequency || 0),
      status: "Sembrada",
      contactId: form.contactId ? Number(form.contactId) : null, // <-- nuevo
    };

    try {
      await registerSowing(payload);
      onSaved();
    } catch (error) {
      console.error("❌ Error registrando siembra:", error);
      alert("Ocurrió un error al registrar la siembra");
    }
  };

  return (
    <div className="modal-bg">
      <div className="modal-box">
        <h2>Registrar Siembra</h2>

        <label>Seleccione una semilla</label>
        <select name="seedId" onChange={handleChange} value={form.seedId}>
          <option value="">Seleccione la semilla</option>
          {seeds.map(seed => (
            <option key={seed.id} value={seed.id}>
              {seed.plantName} {seed.variety} - ({seed.quantity} disponibles)
            </option>
          ))}
        </select>

        <input
          name="quantity"
          type="number"
          placeholder="Cantidad"
          value={form.quantity}
          onChange={handleChange}
        />

        <label>Fecha inicio</label>
        <input
          name="startDate"
          type="date"
          value={form.startDate}
          onChange={handleChange}
        />

        <label>Fecha cosecha</label>
        <input
          name="harvestDate"
          type="date"
          value={form.harvestDate}
          onChange={handleChange}
        />

        <textarea
          name="observations"
          placeholder="Observaciones"
          value={form.observations}
          onChange={handleChange}
        />

        <input
          name="fumigationFrequency"
          type="number"
          placeholder="Frecuencia fumigación (días)"
          value={form.fumigationFrequency}
          onChange={handleChange}
        />

        <label>Contacto (opcional – para apartar)</label>
        <select
          name="contactId"
          value={form.contactId}
          onChange={handleChange}
        >
          <option value="">Sin contacto (Disponible)</option>
          {contacts.map(c => (
            <option key={c.id} value={c.id}>
              {c.name} — {c.identification}
            </option>
          ))}
        </select>

        <button className="btn-save" onClick={handleSave}>
          Guardar
        </button>
        <button className="btn-cancel" onClick={onClose}>
          Cancelar
        </button>
      </div>
    </div>
  );
}
