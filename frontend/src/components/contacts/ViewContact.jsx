import React from "react";
import "../../styles/Modal.css";

export default function ViewContact({ contact, onClose }) {
  const getTypeLabel = (contactType) => {
    return contactType === "CLIENT" ? "Cliente" : "Proveedor";
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Detalles del Contacto</h2>
        
        <div className="view-details">
          <div className="detail-section">
            <h3>Información General</h3>
            
            <div className="detail-item">
              <span className="detail-label">Nombre:</span>
              <span className="detail-value">{contact.name}</span>
            </div>

            <div className="detail-item">
              <span className="detail-label">Identificación:</span>
              <span className="detail-value">{contact.identification}</span>
            </div>

            <div className="detail-item">
              <span className="detail-label">Tipo:</span>
              <span className="detail-value">
                <span className={`badge ${contact.contactType.toLowerCase()}`}>
                  {getTypeLabel(contact.contactType)}
                </span>
              </span>
            </div>

            <div className="detail-item">
              <span className="detail-label">Estado:</span>
              <span className="detail-value">
                <span className={`badge ${contact.active ? 'active' : 'inactive'}`}>
                  {contact.active ? 'Activo' : 'Inactivo'}
                </span>
              </span>
            </div>
          </div>

          <div className="detail-section">
            <h3>Información de Contacto</h3>
            
            <div className="detail-item">
              <span className="detail-label">Teléfono:</span>
              <span className="detail-value">{contact.phone || "No especificado"}</span>
            </div>

            <div className="detail-item">
              <span className="detail-label">Correo:</span>
              <span className="detail-value">{contact.email || "No especificado"}</span>
            </div>

            <div className="detail-item">
              <span className="detail-label">Dirección:</span>
              <span className="detail-value">{contact.address || "No especificado"}</span>
            </div>

            <div className="detail-item">
              <span className="detail-label">Ciudad:</span>
              <span className="detail-value">{contact.city || "No especificado"}</span>
            </div>
          </div>

          {contact.observations && (
            <div className="detail-section">
              <h3>Observaciones</h3>
              <p className="observations-text">{contact.observations}</p>
            </div>
          )}

          <div className="detail-section">
            <h3>Información del Sistema</h3>
            
            <div className="detail-item">
              <span className="detail-label">Fecha de Registro:</span>
              <span className="detail-value">{formatDate(contact.createdAt)}</span>
            </div>

            <div className="detail-item">
              <span className="detail-label">Última Actualización:</span>
              <span className="detail-value">{formatDate(contact.updatedAt)}</span>
            </div>
          </div>
        </div>

        <div className="modal-actions">
          <button type="button" onClick={onClose} className="btn-cancel">
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}