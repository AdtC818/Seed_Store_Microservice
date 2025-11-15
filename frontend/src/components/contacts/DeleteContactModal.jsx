import React, { useState, useEffect } from "react";
import { getContactById, deleteContact } from "../../services/contactService";
import "../../styles/Modal.css";

export default function DeleteContactModal({ contactId, onClose, onDeleted }) {
  const [contact, setContact] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    loadContact();
  }, [contactId]);

  const loadContact = async () => {
    try {
      console.log("📡 Cargando contacto ID:", contactId);
      const res = await getContactById(contactId);
      console.log("✅ Contacto cargado:", res.data);
      setContact(res.data);
      setLoading(false);
    } catch (err) {
      console.error("❌ Error al cargar contacto:", err);
      setError("Error al cargar el contacto");
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    setDeleting(true);
    setError("");

    try {
      console.log("🗑️ Eliminando contacto ID:", contactId);
      await deleteContact(contactId);
      console.log("✅ Contacto eliminado exitosamente");
      onDeleted();
    } catch (err) {
      console.error("❌ Error al eliminar:", err);
      const errorMsg = err.response?.data?.message 
        || err.response?.data 
        || err.message 
        || "Error desconocido";
      setError(`Error: ${errorMsg}`);
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="modal-overlay">
        <div className="modal-content modal-small">
          <p>Cargando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content modal-small" onClick={(e) => e.stopPropagation()}>
        <h2>Confirmar Eliminación</h2>
        
        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        {contact && (
          <div className="delete-confirmation">
            <p>¿Estás seguro de que deseas eliminar este contacto?</p>
            <div className="contact-info-box">
              <strong>{contact.name}</strong>
              <p>Identificación: {contact.identification}</p>
              <p>Tipo: {contact.contactType === "CLIENT" ? "Cliente" : "Proveedor"}</p>
            </div>
            <p className="warning-text">
              ⚠️ Esta acción desactivará el contacto. No se eliminará permanentemente de la base de datos.
            </p>
          </div>
        )}

        <div className="modal-actions">
          <button 
            type="button" 
            onClick={onClose} 
            className="btn-cancel"
            disabled={deleting}
          >
            Cancelar
          </button>
          <button 
            type="button" 
            onClick={handleDelete} 
            className="btn-delete"
            disabled={deleting}
          >
            {deleting ? "Eliminando..." : "Eliminar"}
          </button>
        </div>
      </div>
    </div>
  );
}