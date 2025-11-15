import React, { useEffect, useState } from "react";
import { getAllSeeds } from "../services/seedService";
import RegisterSeed from "../components/RegisterSeed";
import EditSeed from "../components/EditSeed";
import DeleteSeedModal from "../components/DeleteSeedModal";
import "../styles/SeedsPage.css";

import searchIcon from "../images/buscar.png";
import filterIcon from "../images/filtrar.png";
import addIcon from "../images/agregar.png";

import seedIconMain from "../images/semilla.png";
import seedIconAlt from "../images/semilla2.png";

import editIcon from "../images/editar.png";
import deleteIcon from "../images/eliminar.png";

export default function SeedsPage() {

  const [seeds, setSeeds] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const [openRegister, setOpenRegister] = useState(false);
  const [openEdit, setOpenEdit] = useState(null);
  const [openDelete, setOpenDelete] = useState(null);

  useEffect(() => {
    loadSeeds();
  }, []);

  const loadSeeds = () => {
    getAllSeeds().then(res => {
      setSeeds(res.data);
    });
  };

  // -------------------- FILTRO DEL BUSCADOR --------------------
  const filteredSeeds = seeds.filter(seed =>
    (seed.plantName + " " + seed.variety)
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <div className="seeds-container">

      {/* Toolbar superior */}
      <div className="toolbar">

        <div className="search-box">
          <img src={searchIcon} alt="" />
          <input
            type="text"
            placeholder="Buscar semillas..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="toolbar-actions">
          <button className="icon-btn"><img src={filterIcon} alt="" /></button>
          <button className="icon-btn" onClick={() => setOpenRegister(true)}>
            <img src={addIcon} alt="" />
          </button>
        </div>
      </div>

      {/* LISTA */}
      <div className="seeds-list">
  {filteredSeeds.map((seed, index) => (
    <div key={seed.id} className="seeds-item">

      <div className="item-info">
        <img
          src={(index % 2 === 0) ? seedIconMain : seedIconAlt}
          className="item-icon"
          alt=""
        />
        <span>{seed.plantName} - {seed.variety}</span>
      </div>

      <div className="item-actions">
        <button onClick={() => setOpenEdit(seed.id)}>
          <img src={editIcon} alt="" />
        </button>
        <button onClick={() => setOpenDelete(seed.id)}>
          <img src={deleteIcon} alt="" />
        </button>
      </div>

    </div>
  ))}
</div>


      {/* Formularios y modales */}
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

    </div>
  );
}
