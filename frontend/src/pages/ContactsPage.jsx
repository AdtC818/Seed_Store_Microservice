import React, { useEffect, useState, useRef } from "react";
import { getAllContacts } from "../services/contactService";
import RegisterContact from "../components/contacts/RegisterContact";
import EditContact from "../components/contacts/EditContact";
import DeleteContactModal from "../components/contacts/DeleteContactModal";
import ViewContact from "../components/contacts/ViewContact";
import "../styles/ContactsPage.css";

import searchIcon from '../images/buscar.png';
import filterIcon from '../images/filtrar.png';
import addIcon from '../images/agregar.png';
import editIcon from '../images/editar.png';
import deleteIcon from '../images/eliminar.png';
import detailsIcon from '../images/detalles.png';

// Iconos para tipos de contacto
import clientIcon from '../images/cliente.png';
import supplierIcon from '../images/proveedor.png';

export default function ContactsPage() {
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("ALL"); // ALL, CLIENT, SUPPLIER
  const [showFilterMenu, setShowFilterMenu] = useState(false);

  // Estados para controlar los modales
  const [openRegister, setOpenRegister] = useState(false);
  const [openEdit, setOpenEdit] = useState(null);
  const [openDelete, setOpenDelete] = useState(null);
  const [openView, setOpenView] = useState(null);

  const filterMenuRef = useRef(null);

  useEffect(() => {
    console.log("👥 ContactsPage montado - cargando contactos...");
    loadContacts();
  }, []);

  // Cerrar el menú de filtro al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (filterMenuRef.current && !filterMenuRef.current.contains(event.target)) {
        setShowFilterMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const loadContacts = () => {
    console.log("📡 Llamando a getAllContacts()...");
    getAllContacts()
      .then(res => {
        console.log("✅ Contactos cargados:", res.data);
        setContacts(res.data);
      })
      .catch(err => {
        console.error("❌ Error al cargar contactos:", err);
      });
  };

  const getIcon = (contactType) => {
    return contactType === "CLIENT" ? clientIcon : supplierIcon;
  };

  const getTypeLabel = (contactType) => {
    return contactType === "CLIENT" ? "Cliente" : "Proveedor";
  };

  const handleFilterChange = (newFilter) => {
    console.log("🎯 Cambiando filtro a:", newFilter);
    setFilterType(newFilter);
    setShowFilterMenu(false);
  };

  // Filtrado por búsqueda y tipo
  const filteredContacts = contacts.filter(contact => {
    const matchesSearch = contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contact.identification.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === "ALL" || contact.contactType === filterType;
    return matchesSearch && matchesType;
  });

  console.log("🔍 Contactos filtrados:", filteredContacts.length, "de", contacts.length);

  return (
    <div className="contacts-container">
      
      {/* Barra superior */}
      <div className="toolbar">
        <div className="search-box">
          <img src={searchIcon} alt="" />
          <input 
            type="text" 
            placeholder="Buscar por nombre o identificación" 
            value={searchTerm}
            onChange={e => {
              console.log("🔎 Buscando:", e.target.value);
              setSearchTerm(e.target.value);
            }}
          />
        </div>

        <div className="toolbar-actions">
          {/* Botón de filtro con menú desplegable */}
          <div className="filter-dropdown" ref={filterMenuRef}>
            <button 
              className={`icon-btn ${showFilterMenu ? 'active' : ''}`}
              onClick={() => {
                console.log("🔽 Toggle filtro menu");
                setShowFilterMenu(!showFilterMenu);
              }}
            >
              <img src={filterIcon} alt="" />
              {filterType !== "ALL" && <span className="filter-badge"></span>}
            </button>

            {showFilterMenu && (
              <div className="filter-menu">
                <div className="filter-menu-header">
                  <span>Filtrar por tipo</span>
                </div>
                <button
                  className={`filter-option ${filterType === "ALL" ? "active" : ""}`}
                  onClick={() => handleFilterChange("ALL")}
                >
                  <span>📋</span> Todos los contactos
                  {filterType === "ALL" && <span className="check">✓</span>}
                </button>
                <button
                  className={`filter-option ${filterType === "CLIENT" ? "active" : ""}`}
                  onClick={() => handleFilterChange("CLIENT")}
                >
                  <span>👤</span> Solo Clientes
                  {filterType === "CLIENT" && <span className="check">✓</span>}
                </button>
                <button
                  className={`filter-option ${filterType === "SUPPLIER" ? "active" : ""}`}
                  onClick={() => handleFilterChange("SUPPLIER")}
                >
                  <span>🏢</span> Solo Proveedores
                  {filterType === "SUPPLIER" && <span className="check">✓</span>}
                </button>
              </div>
            )}
          </div>

          <button className="icon-btn" onClick={() => {
            console.log("➕ Abriendo modal de registro");
            setOpenRegister(true);
          }}>
            <img src={addIcon} alt="" />
          </button>
        </div>
      </div>

      {/* Indicador de filtro activo */}
      {filterType !== "ALL" && (
        <div className="active-filter-indicator">
          <span>
            Mostrando: {filterType === "CLIENT" ? "Clientes" : "Proveedores"}
          </span>
          <button onClick={() => setFilterType("ALL")}>
            ✕ Limpiar filtro
          </button>
        </div>
      )}

      {/* Listado dinámico */}
      <div className="contacts-list">
        {filteredContacts.length === 0 ? (
          <div className="empty-state">
            <p>No se encontraron contactos</p>
            {filterType !== "ALL" && (
              <button 
                className="clear-filters-btn"
                onClick={() => setFilterType("ALL")}
              >
                Limpiar filtros
              </button>
            )}
          </div>
        ) : (
          filteredContacts.map(contact => (
            <div key={contact.id} className={`contact-item ${!contact.active ? 'inactive' : ''}`}>
              
              <div className="item-info">
                <img src={getIcon(contact.contactType)} className="item-icon" alt="" />
                <div className="contact-details">
                  <span className="contact-name">{contact.name}</span>
                  <span className="contact-meta">
                    {getTypeLabel(contact.contactType)} • {contact.identification}
                  </span>
                  {contact.phone && (
                    <span className="contact-phone">📞 {contact.phone}</span>
                  )}
                </div>
              </div>

              <div className="item-actions">
                <button onClick={() => {
                  console.log("👁️ Ver detalles de:", contact.name);
                  setOpenView(contact);
                }}>
                  <img src={detailsIcon} alt="" />
                </button>
                <button onClick={() => {
                  console.log("✏️ Editar contacto ID:", contact.id);
                  setOpenEdit(contact.id);
                }}>
                  <img src={editIcon} alt="" />
                </button>
                <button onClick={() => {
                  console.log("🗑️ Eliminar contacto ID:", contact.id);
                  setOpenDelete(contact.id);
                }}>
                  <img src={deleteIcon} alt="" />
                </button>
              </div>

            </div>
          ))
        )}
      </div>

      {/* MODALES */}
      {openRegister && (
        <RegisterContact
          onClose={() => {
            console.log("❌ Cerrando modal de registro");
            setOpenRegister(false);
          }}
          onSaved={() => {
            console.log("💾 Contacto guardado - recargando...");
            setOpenRegister(false);
            loadContacts();
          }}
        />
      )}

      {openEdit && (
        <EditContact
          contactId={openEdit}
          onClose={() => {
            console.log("❌ Cerrando modal de edición");
            setOpenEdit(null);
          }}
          onUpdated={() => {
            console.log("🔄 Contacto actualizado - recargando...");
            setOpenEdit(null);
            loadContacts();
          }}
        />
      )}

      {openDelete && (
        <DeleteContactModal
          contactId={openDelete}
          onClose={() => {
            console.log("❌ Cerrando modal de eliminación");
            setOpenDelete(null);
          }}
          onDeleted={() => {
            console.log("🗑️ Contacto eliminado - recargando...");
            setOpenDelete(null);
            loadContacts();
          }}
        />
      )}

      {openView && (
        <ViewContact
          contact={openView}
          onClose={() => {
            console.log("❌ Cerrando modal de detalles");
            setOpenView(null);
          }}
        />
      )}

    </div>
  );
}