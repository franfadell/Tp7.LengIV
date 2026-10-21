import { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

const LINKS = [
  { ruta: "/", texto: "Inicio" },
  { ruta: "/proyecto-blob", texto: "Proyecto Blob" },
  { ruta: "/acerca-de-nosotros", texto: "Acerca de nosotros" },
  { ruta: "/contacto", texto: "Contacto" },
];

function Navbar() {
  const [abierto, setAbierto] = useState(false);

  return (
    <nav className="navbar">
      <div className="logo">Lenguajes IV</div>

      <button
        className="menu-btn"
        aria-label="Abrir menú"
        onClick={() => setAbierto(!abierto)}
      >
        &#9776;
      </button>

      <ul className={abierto ? "abierto" : ""}>
        {LINKS.map((link) => (
          <li key={link.ruta}>
            <NavLink
              to={link.ruta}
              end={link.ruta === "/"}
              className={({ isActive }) => (isActive ? "activo" : "")}
              onClick={() => setAbierto(false)}
            >
              {link.texto}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Navbar;
