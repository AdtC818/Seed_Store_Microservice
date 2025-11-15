import React, { useEffect, useState } from "react";
import { getAllSowings } from "../services/sowingService";
import RegisterSowing from "../components/sowing/RegisterSowing";
import EditSowing from "../components/sowing/EditSowing";
import DeleteSowingModal from "../components/sowing/DeleteSowingModal";
import ViewSowing from "../components/sowing/ViewSowing";
import "../styles/SowingPage.css";

import searchIcon from '../images/buscar.png';
import filterIcon from '../images/filtrar.png';
import addIcon from '../images/agregar.png';

import tomatoIcon from '../images/tomate.png';
import lettuceIcon from '../images/lechuga.png';
import broccoliIcon from '../images/brocoli.png';

import editIcon from '../images/editar.png';
import deleteIcon from '../images/eliminar.png';
import detailsIcon from '../images/detalles.png';

export default function SowingPage() {

  const [sowings, setSowings] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Estados para controlar los modales
  const [openRegister, setOpenRegister] = useState(false);
  const [openEdit, setOpenEdit] = useState(null);
  const [openDelete, setOpenDelete] = useState(null);
  const [openView, setOpenView] = useState(null);

  useEffect(() => {
    
    loadSowings();
  }, []);

  const loadSowings = () => {
    
    getAllSowings()
      .then(res => {
        
        setSowings(res.data);
      })
      .catch(err => {
        console.error("❌ Error al cargar siembras:", err);
      });
  };

  const getIcon = (seedName) => {
    const lower = seedName.toLowerCase();
    if (lower.includes("tomate")) return tomatoIcon;
    if (lower.includes("lechuga")) return lettuceIcon;
    return broccoliIcon;
  };

  // -------------------- FILTRO DEL BUSCADOR --------------------
  const filteredSowings = sowings.filter(item =>
    (item.seedName)
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  

  return (
    <div className="sowing-container">
      
      {/* Barra superior */}
      <div className="toolbar">
        <div className="search-box">
          <img src={searchIcon} alt="" />
          <input 
            type="text" 
            placeholder="Buscar" 
            value={searchTerm}
            onChange={e => {
              
              setSearchTerm(e.target.value);
            }}
          />
        </div>

        <div className="toolbar-actions">
          <button className="icon-btn"><img src={filterIcon} alt="" /></button>

          {/* ABRIR MODAL DE REGISTRO */}
          <button className="icon-btn" onClick={() => {
            
            setOpenRegister(true);
          }}>
            <img src={addIcon} alt="" />
          </button>
        </div>
      </div>

      {/* Listado dinámico */}
      <div className="sowing-list">
        {filteredSowings.map(item => (
          <div key={item.id} className="sowing-item">
            
            <div className="item-info">
              <img src={getIcon(item.seedName)} className="item-icon" alt="" />
              <span>{item.seedName} — {item.quantity} semillas</span>
            </div>

            <div className="item-actions">
              <button onClick={() => {
                
                setOpenView(item);
              }}>
                <img src={detailsIcon} alt="" />
              </button>
              <button onClick={() => {
                
                setOpenEdit(item.id);
              }}>
                <img src={editIcon} alt="" />
              </button>
              <button onClick={() => {
                
                setOpenDelete(item.id);
              }}>
                <img src={deleteIcon} alt="" />
              </button>
            </div>

          </div>
        ))}
      </div>

      {/* MODALES */}
      {openRegister && (
        <RegisterSowing
          onClose={() => {
           
            setOpenRegister(false);
          }}
          onSaved={() => {
           
            setOpenRegister(false);
            loadSowings();
          }}
        />
      )}

      {openEdit && (
        <EditSowing
          sowingId={openEdit}
          onClose={() => {
            
            setOpenEdit(null);
          }}
          onUpdated={() => {
            
            setOpenEdit(null);
            loadSowings();
          }}
        />
      )}

      {openDelete && (
        <DeleteSowingModal
          sowingId={openDelete}
          onClose={() => {
            
            setOpenDelete(null);
          }}
          onDeleted={() => {
            
            setOpenDelete(null);
            loadSowings();
          }}
        />
      )}

      {openView && (
        <ViewSowing
          sowing={openView}
          onClose={() => {
            setOpenView(null);
          }}
        />
      )}

    </div>
  );
}