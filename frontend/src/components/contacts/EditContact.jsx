import React, { useState, useEffect } from "react";
import { getContactById, updateContact } from "../../services/contactService";
import "../../styles/Modal.css";

export default function EditContact({ contactId, onClose, onUpdated }) {
  const [formData, setFormData] = useState({
    name: "",
    contactType: "CLIENT",
    phone: "",
    email: "",
    address: "",
    city: "",
    observations: "",
    active: true
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadContact();
  }, [contactId]);

  const loadContact = async () => {
    try {
      console.log("📡 Cargando contacto ID:", contactId);
      const res = await getContactById(contactId);
      console.log("✅ Contacto cargado:", res.data);
      
      setFormData({
        name: res.data.name || "",
        contactType: res.data.contactType || "CLIENT",
        phone: res.data.phone || "",
        email: res.data.email || "",
        address: res.data.address || "",
        city: res.data.city || "",
        observations: res.data.observations || "",
        active: res.data.active !== undefined ? res.data.active : true
      });
      setLoading(false);
    } catch (err) {
      console.error("❌ Error al cargar contacto:", err);
      setError("Error al cargar el contacto");
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSaving(true);

    // Validación básica
    if (!formData.name || !formData.contactType) {
      setError("El nombre y tipo de contacto son obligatorios");
      setSaving(false);
      return;
    }

    // Validación de email si se proporciona
    if (formData.email && !isValidEmail(formData.email)) {
      setError("El formato del correo electrónico no es válido");
      setSaving(false);
      return;
    }

    try {
      const data = {
        name: formData.name.trim(),
        contactType: formData.contactType,
        phone: formData.phone.trim() || null,
        email: formData.email.trim() || null,
        address: formData.address.trim() || null,
        city: formData.city.trim() || null,
        observations: formData.observations.trim() || null,
        active: formData.active
      };

      console.log("📤 Actualizando contacto:", data);
      
      await updateContact(contactId, data);
      console.log("✅ Contacto actualizado exitosamente");
      onUpdated();
    } catch (err) {
      console.error("❌ Error al actualizar:", err);
      const errorMsg = err.response?.data?.message 
        || err.response?.data 
        || err.message 
        || "Error desconocido";
      setError(`Error: ${errorMsg}`);
    } finally {
      setSaving(false);
    }
  };

  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  if (loading) {
    return (
      <div className="modal-overlay">
        <div className="modal-content">
          <p>Cargando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Editar Contacto</h2>
        
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
              disabled={saving}
            />
          </div>

          <div className="form-group">
            <label>Tipo de Contacto *</label>
            <select
              name="contactType"
              value={formData.contactType}
              onChange={handleChange}
              required
              disabled={saving}
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
                disabled={saving}
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
                disabled={saving}
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
              disabled={saving}
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
              disabled={saving}
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
              disabled={saving}
            />
          </div>

          <div className="form-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="active"
                checked={formData.active}
                onChange={handleChange}
                disabled={saving}
              />
              <span>Contacto activo</span>
            </label>
          </div>

          <div className="modal-actions">
            <button type="button" onClick={onClose} className="btn-cancel" disabled={saving}>
              Cancelar
            </button>
            <button type="submit" className="btn-save" disabled={saving}>
              {saving ? "Guardando..." : "Guardar Cambios"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}