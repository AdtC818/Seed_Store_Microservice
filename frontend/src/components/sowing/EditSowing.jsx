import React, { useEffect, useState } from "react";
import { getAllSowings, updateSowingStatus, updateSowing } from "../../services/sowingService";
import "../../styles/SowingModal.css";

export default function EditSowing({ sowingId, onClose, onUpdated }) {
  const [sowing, setSowing] = useState(null);

  // Campos editables
  const [availability, setAvailability] = useState("");
  const [processState, setProcessState] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [startDate, setStartDate] = useState("");
  const [harvestDate, setHarvestDate] = useState("");
  const [fumigation, setFumigation] = useState("");
  const [observations, setObservations] = useState("");

  useEffect(() => {
    const load = async () => {
      const res = await getAllSowings();
      const found = res.data.find(s => s.id === sowingId);
      setSowing(found || null);

      if (found) {
        setAvailability(found.availabilityStatus || "Disponible");
        setProcessState(found.status || "Sembrada");
        setQuantity(found.quantity || 0);
        setStartDate(found.startDate ? found.startDate.split("T")[0] : "");
        setHarvestDate(found.harvestDate ? found.harvestDate.split("T")[0] : "");
        setFumigation(found.fumigationFrequency || "");
        setObservations(found.observations || "");
      }
    };
    load();
  }, [sowingId]);

  if (!sowing) return null;

  const handleUpdate = async () => {

    // PUT (datos generales)
    await updateSowing(sowingId, {
      quantity,
      startDate,
      harvestDate,
      fumigationFrequency: fumigation,
      observations,
      availabilityStatus: availability,
      contactId: availability === "Apartada" ? sowing.contactId : null
    });

    // PATCH (estado del ciclo)
    await updateSowingStatus(sowingId, processState);

    onUpdated();
    onClose();
  };

  return (
    <div className="modal-bg">
      <div className="modal-box">
        <h2>Editar Siembra</h2>

        <p><b>Semilla:</b> {sowing.seedName}</p>

        {/* Cantidad */}
        <label>Cantidad</label>
        <input
          type="number"
          value={quantity}
          onChange={e => setQuantity(e.target.value)}
        />

        {/* Inicio */}
        <label>Fecha de inicio</label>
        <input
          type="date"
          value={startDate}
          onChange={e => setStartDate(e.target.value)}
        />

        {/* Cosecha */}
        <label>Fecha de cosecha</label>
        <input
          type="date"
          value={harvestDate}
          onChange={e => setHarvestDate(e.target.value)}
        />

        {/* Fumigación */}
        <label>Frecuencia de fumigación (días)</label>
        <input
          type="number"
          value={fumigation}
          onChange={e => setFumigation(e.target.value)}
        />

        {/* Observaciones */}
        <label>Observaciones</label>
        <textarea
          value={observations}
          onChange={e => setObservations(e.target.value)}
        />

        {/* Disponibilidad */}
        <label>Disponibilidad</label>
        <select value={availability} onChange={e => setAvailability(e.target.value)}>
          <option value="Disponible">Disponible</option>
          <option value="Apartada">Apartada</option>
        </select>

        {/* Estado */}
        <label>Estado del ciclo</label>
        <select value={processState} onChange={e => setProcessState(e.target.value)}>
          <option value="Sembrada">Sembrada</option>
          <option value="En crecimiento">En crecimiento</option>
          <option value="Lista para cosecha">Lista para cosecha</option>
          <option value="Finalizada">Finalizada</option>
        </select>

        <button className="btn-save" onClick={handleUpdate}>Actualizar</button>
        <button className="btn-cancel" onClick={onClose}>Cancelar</button>
      </div>
    </div>
  );
}
