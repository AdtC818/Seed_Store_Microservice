import React, { useEffect, useState } from "react";
import { getAllSeeds } from "../services/seedService";

import RegisterSeed from "../components/RegisterSeed";
import EditSeed from "../components/EditSeed";
import DeleteSeedModal from "../components/DeleteSeedModal";
import ViewSeed from "../components/ViewSeed";

import "../styles/SeedsPage.css";

import searchIcon from "../images/buscar.png";
import addIcon from "../images/agregar.png";

import seedIconMain from "../images/semilla.png";
import seedIconAlt from "../images/semilla2.png";

import detailsIcon from "../images/detalles.png";
import editIcon from "../images/editar.png";
import deleteIcon from "../images/eliminar.png";

export default function SeedsPage() {
  const [seeds, setSeeds] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const [openRegister, setOpenRegister] = useState(false);
  const [openEdit, setOpenEdit] = useState(null);
  const [openDelete, setOpenDelete] = useState(null);
  const [openDetails, setOpenDetails] = useState(null);

  useEffect(() => {
    loadSeeds();
  }, []);

  const loadSeeds = () => {
    getAllSeeds().then((res) => {
      setSeeds(res.data);
    });
  };

  const filteredSeeds = seeds.filter((seed) =>
    (seed.plantName + " " + seed.variety)
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <div className="seeds-container">

      {/* TOP BAR */}
      <div className="toolbar">

        {/* Buscar */}
        <div className="search-box">
          <img src={searchIcon} alt="" />
          <input
            type="text"
            placeholder="Buscar semillas..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Botón agregar */}
        <button className="icon-btn" onClick={() => setOpenRegister(true)}>
          <img src={addIcon} alt="" />
        </button>
      </div>

      {/* LISTA */}
      <div className="seeds-list">

        {filteredSeeds.length === 0 ? (
          <div className="empty-state">
            <p>No se encontraron semillas</p>
          </div>
        ) : (
          filteredSeeds.map((seed, index) => (
            <div key={seed.id} className="seeds-item">

              {/* CONTENIDO IZQUIERDO */}
              <div className="item-info">
                <img
                  src={index % 2 === 0 ? seedIconMain : seedIconAlt}
                  className="item-icon"
                  alt=""
                />

                <div className="seed-details">
                  <span className="seed-name">
                    {seed.plantName} - {seed.variety}
                  </span>

                  <span className="seed-meta">
                    Cantidad: {seed.quantity} unidades
                  </span>
                </div> 
              </div>                

              {/* ACCIONES */}
              <div className="item-actions">
                <button onClick={() => setOpenDetails(seed.id)}>
                  <img src={detailsIcon} alt="" />
                </button>
                <button onClick={() => setOpenEdit(seed.id)}>
                  <img src={editIcon} alt="" />
                </button>
                <button onClick={() => setOpenDelete(seed.id)}>
                  <img src={deleteIcon} alt="" />
                </button>
              </div>

            </div>
          ))
        )}

      </div>

      {/* MODALES */}
      {openRegister && (
        <RegisterSeed
          onClose={() => setOpenRegister(false)}
          onSaved={loadSeeds}
        />
      )}

      {openEdit && (
        <EditSeed
          seedId={openEdit}
          onClose={() => setOpenEdit(null)}
          onUpdated={loadSeeds}
        />
      )}

      {openDelete && (
        <DeleteSeedModal
          seedId={openDelete}
          onClose={() => setOpenDelete(null)}
          onDeleted={loadSeeds}
        />
      )}

      {openDetails && (
        <ViewSeed
          seedId={openDetails}
          onClose={() => setOpenDetails(null)}
        />
      )}

    </div>
  );
}
