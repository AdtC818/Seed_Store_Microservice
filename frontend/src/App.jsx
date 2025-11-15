import React from "react";
import { Routes, Route, NavLink, Navigate, Link } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import ContactsPage from "./pages/ContactsPage";
import SeedsPage from "./pages/SeedsPage";
import SowingPage from "./pages/SowingPage";
import BookingsPage from "./pages/BookingsPage";
import SalesPage from "./pages/SalesPage";
import "./styles/App.css";

// Importar imágenes
import logo from "./images/logo.png";
import iconSowing from "./images/icon-sowing.png";
import iconSeeds from "./images/icon-seeds.png";
import iconClients from "./images/icon-clients.png";
import iconBookings from "./images/icon-bookings.png";
import iconSales from "./images/icon-sales.png";
import user from "./images/user.png";

export default function App() {
  return (
    <div className="layout">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="logo-container">
          {/* Al hacer clic en el logo o texto, vuelve al dashboard */}
          <Link to="/dashboard" className="logo-link">
            <img src={logo} alt="Logo" className="logo" />
            <h2>IMPROSVITA</h2>
            <p>SOFTWARE DE GESTIÓN</p>
          </Link>
        </div>

        <nav className="nav">
          <ul>
            <li>
              <NavLink
                to="/sowing"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                <img src={iconSowing} alt="" /> Gestionar Siembra
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/seeds"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                <img src={iconSeeds} alt="" /> Gestionar Semillas
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/contacts"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                <img src={iconClients} alt="" /> Gestionar Clientes
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/bookings"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                <img src={iconBookings} alt="" /> Gestionar Reservas
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/sales"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                <img src={iconSales} alt="" /> Gestionar Ventas
              </NavLink>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Contenido principal */}
      <div className="main">
        <header className="header">
          <div className="user-info">
            <img src={user} alt="Usuario" className="user-img" />
            <span>ADMINISTRADOR</span>
          </div>
          <button className="exit-btn">Exit</button>
        </header>

        <main className="content">
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/contacts" element={<ContactsPage />} />
            <Route path="/seeds" element={<SeedsPage />} />
            <Route path="/sowing" element={<SowingPage />} />
            <Route path="/bookings" element={<BookingsPage />} />
            <Route path="/sales" element={<SalesPage />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}
