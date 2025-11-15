import React, { useState } from "react";
import { createContact } from "../../services/contactService";
import "../../styles/Modal.css";

export default function RegisterContact({ onClose, onSaved }) {
  const [formData, setFormData] = useState({
    name: "",
    identification: "",
    contactType: "CLIENT",
    phone: "",
    email: "",
    address: "",
    city: "",
    observations: ""
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Validación básica
    if (!formData.name || !formData.identification || !formData.contactType) {
      setError("El nombre, identificación y tipo de contacto son obligatorios");
      setLoading(false);
      return;
    }

    // Validación de email si se proporciona
    if (formData.email && !isValidEmail(formData.email)) {
      setError("El formato del correo electrónico no es válido");
      setLoading(false);
      return;
    }

    try {
      const data = {
        name: formData.name.trim(),
        identification: formData.identification.trim(),
        contactType: formData.contactType,
        phone: formData.phone.trim() || null,
        email: formData.email.trim() || null,
        address: formData.address.trim() || null,
        city: formData.city.trim() || null,
        observations: formData.observations.trim() || null
      };

      console.log("📤 Enviando datos:", data);
      
      await createContact(data);
      console.log("✅ Contacto registrado exitosamente");
      onSaved();
    } catch (err) {
      console.error("❌ Error al registrar:", err);
      const errorMsg = err.response?.data?.message 
        || err.response?.data 
        || err.message 
        || "Error desconocido";
      setError(`Error: ${errorMsg}`);
    } finally {
      setLoading(false);
    }
  };

  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Registrar Nuevo Contacto</h2>
        
        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nombre Completo *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Nombre completo del contacto"
              required
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label>Identificación (CC/NIT) *</label>
            <input
              type="text"
              name="identification"
              value={formData.identification}
              onChange={handleChange}
              placeholder="Número de identificación"
              required
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label>Tipo de Contacto *</label>
            <select
              name="contactType"
              value={formData.contactType}
              onChange={handleChange}
              required
              disabled={loading}
            >
              <option value="CLIENT">Cliente</option>
              <option value="SUPPLIER">Proveedor</option>
            </select>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Teléfono</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Número de teléfono"
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label>Correo Electrónico</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="correo@ejemplo.com"
                disabled={loading}
              />
            </div>
          </div>

          <div className="form-group">
            <label>Dirección</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Dirección completa"
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label>Ciudad</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="Ciudad"
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label>Observaciones</label>
            <textarea
              name="observations"
              value={formData.observations}
              onChange={handleChange}
              placeholder="Observaciones adicionales..."
              rows="3"
              disabled={loading}
            />
          </div>

          <div className="modal-actions">
            <button type="button" onClick={onClose} className="btn-cancel" disabled={loading}>
              Cancelar
            </button>
            <button type="submit" className="btn-save" disabled={loading}>
              {loading ? "Guardando..." : "Guardar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}