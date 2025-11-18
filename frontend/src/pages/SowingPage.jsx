import React, { useEffect, useState, useRef } from "react";
import { getAllSowings } from "../services/sowingService";

import RegisterSowing from "../components/sowing/RegisterSowing";
import EditSowing from "../components/sowing/EditSowing";
import DeleteSowingModal from "../components/sowing/DeleteSowingModal";
import ViewSowing from "../components/sowing/ViewSowing";

import "../styles/SowingPage.css";

import searchIcon from "../images/buscar.png";
import filterIcon from "../images/filtrar.png";
import addIcon from "../images/agregar.png";

import tomatoIcon from "../images/tomate.png";
import lettuceIcon from "../images/lechuga.png";
import broccoliIcon from "../images/brocoli.png";

import detailsIcon from "../images/detalles.png";
import editIcon from "../images/editar.png";
import deleteIcon from "../images/eliminar.png";

export default function SowingPage() {

  const [sowings, setSowings] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("ALL");

  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const filterMenuRef = useRef(null);

  const [openRegister, setOpenRegister] = useState(false);
  const [openEdit, setOpenEdit] = useState(null);
  const [openDelete, setOpenDelete] = useState(null);
  const [openView, setOpenView] = useState(null);

  useEffect(() => {
    loadSowings();
  }, []);

  useEffect(() => {
    const closeMenu = (e) => {
      if (filterMenuRef.current && !filterMenuRef.current.contains(e.target)) {
        setShowFilterMenu(false);
      }
    };
    document.addEventListener("mousedown", closeMenu);
    return () => document.removeEventListener("mousedown", closeMenu);
  }, []);

  const loadSowings = () => {
    getAllSowings()
      .then((res) => setSowings(res.data))
      .catch((err) => console.error("Error cargando siembras:", err));
  };

  const getIcon = (seed) => {
    const s = seed.toLowerCase();
    if (s.includes("tomate")) return tomatoIcon;
    if (s.includes("lechuga")) return lettuceIcon;
    return broccoliIcon;
  };

  const handleFilterChange = (status) => {
    setFilterStatus(status);
    setShowFilterMenu(false);
  };

  const filteredSowings = sowings.filter((s) => {
    const matchSearch =
      s.seedName.toLowerCase().includes(searchTerm.toLowerCase());

    const matchStatus =
      filterStatus === "ALL" ||
      (filterStatus === "AVAILABLE" && s.availabilityStatus === "Disponible") ||
      (filterStatus === "RESERVED" && s.availabilityStatus === "Apartada");

    return matchSearch && matchStatus;
  });

  return (
    <div className="sowing-container">

      {/* Toolbar */}
      <div className="toolbar">

        <div className="search-box">
          <img src={searchIcon} alt="" />
          <input
            type="text"
            placeholder="Buscar siembra..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="toolbar-actions">

          {/* Filtro */}
          <div className="filter-dropdown" ref={filterMenuRef}>
            <button
              className={`icon-btn ${showFilterMenu ? "active" : ""}`}
              onClick={() => setShowFilterMenu(!showFilterMenu)}
            >
              <img src={filterIcon} alt="" />
              {filterStatus !== "ALL" && <span className="filter-badge"></span>}
            </button>

            {showFilterMenu && (
              <div className="filter-menu">
                <div className="filter-menu-header">Filtrar siembras</div>

                <button
                  className={`filter-option ${filterStatus === "ALL" ? "active" : ""}`}
                  onClick={() => handleFilterChange("ALL")}
                >
                  📦 Todas {filterStatus === "ALL" && <span className="check">✓</span>}
                </button>

                <button
                  className={`filter-option ${filterStatus === "AVAILABLE" ? "active" : ""}`}
                  onClick={() => handleFilterChange("AVAILABLE")}
                >
                  🟢 Disponibles
                  {filterStatus === "AVAILABLE" && <span className="check">✓</span>}
                </button>

                <button
                  className={`filter-option ${filterStatus === "RESERVED" ? "active" : ""}`}
                  onClick={() => handleFilterChange("RESERVED")}
                >
                  🟠 Apartadas
                  {filterStatus === "RESERVED" && <span className="check">✓</span>}
                </button>
              </div>
            )}
          </div>

          <button className="icon-btn" onClick={() => setOpenRegister(true)}>
            <img src={addIcon} alt="" />
          </button>

        </div>
      </div>

      {/* Indicador filtro activo */}
      {filterStatus !== "ALL" && (
        <div className="active-filter-indicator">
          <span>
            Mostrando:{" "}
            {filterStatus === "AVAILABLE" ? "Disponibles" : "Apartadas"}
          </span>
          <button onClick={() => setFilterStatus("ALL")}>✕ Limpiar filtro</button>
        </div>
      )}

      {/* LISTA */}
      <div className="sowing-list">
        {filteredSowings.length === 0 ? (
          <div className="empty-state">
            <p>No se encontraron siembras</p>
            {filterStatus !== "ALL" && (
              <button className="clear-filters-btn" onClick={() => setFilterStatus("ALL")}>
                Limpiar filtros
              </button>
            )}
          </div>
        ) : (
          filteredSowings.map((s) => (
            <div key={s.id} className="sowing-item">
              
              <div className="item-info">
                <img src={getIcon(s.seedName)} className="item-icon" alt="" />

                <div className="sowing-details">

                  <span className="sowing-name">
                    {s.seedName} — {s.quantity} semillas
                  </span>

                  <span className="sowing-meta">
                    🌱 Ciclo: {s.status}
                  </span>

                  <span className="sowing-meta">
                    {s.availabilityStatus === "Disponible"
                      ? "🟢 Disponible"
                      : "🟠 Apartada"}
                  </span>

                  {s.contactName && (
                    <span className="sowing-meta contact-reserved">
                      👤 Apartada por: {s.contactName}
                    </span>
                  )}

                </div>
              </div>

              <div className="item-actions">
                <button onClick={() => setOpenView(s)}>
                  <img src={detailsIcon} alt="" />
                </button>
                <button onClick={() => setOpenEdit(s.id)}>
                  <img src={editIcon} alt="" />
                </button>
                <button onClick={() => setOpenDelete(s.id)}>
                  <img src={deleteIcon} alt="" />
                </button>
              </div>

            </div>
          ))
        )}
      </div>

      {/* MODALES */}
      {openRegister && (
        <RegisterSowing
          onClose={() => setOpenRegister(false)}
          onSaved={() => {
            setOpenRegister(false);
            loadSowings();
          }}
        />
      )}

      {openEdit && (
        <EditSowing
          sowingId={openEdit}
          onClose={() => setOpenEdit(null)}
          onUpdated={() => {
            setOpenEdit(null);
            loadSowings();
          }}
        />
      )}

      {openDelete && (
        <DeleteSowingModal
          sowingId={openDelete}
          onClose={() => setOpenDelete(null)}
          onDeleted={() => {
            setOpenDelete(null);
            loadSowings();
          }}
        />
      )}

      {openView && (
        <ViewSowing
          sowing={openView}
          onClose={() => setOpenView(null)}
        />
      )}

    </div>
  );
}
