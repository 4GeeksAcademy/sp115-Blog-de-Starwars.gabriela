// src/components/Navbar.jsx
import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Dropdown } from "bootstrap";
import { useFavs } from "../context/FavsContext.jsx";
import starwarsLogo from "../assets/img/starwars.png";

export default function Navbar() {
  //Obtiene favoritos y la función para añadir/eliminar 
  const { favs, toggleFav } = useFavs();

  //Referencia para el dropdown para inicializar Bootstrap
  const btnRef = useRef(null);

  useEffect(() => {
    if (btnRef.current) {
      //inicializa el dropdown de Bootstrap
      const dd = new Dropdown(btnRef.current, {
        autoClose: "outside",
      });
      return () => dd.dispose();//limpia el dropdown al desmontar el componente
    }
  }, []);

  return (
    <nav className="navbar navbar-dark bg-dark">
      <div className="container">
        {/* Logo al home */}
        <Link to="/" className="navbar-brand">
          <img
            src={starwarsLogo}
            alt="Star Wars"
            height="40"
            className="d-inline-block align-text-top"
          />
        </Link>

        {/* Dropdown de favoritos */}
        <div className="dropdown">
          <button
            ref={btnRef}
            className="btn btn-outline-light"
            type="button"
            id="dropdownFavs"
            data-bs-toggle="dropdown"
            data-bs-display="static"
            aria-expanded="false"
          >
            Favoritos ({favs.length})
          </button>

          <ul
            className="dropdown-menu dropdown-menu-end"
            aria-labelledby="dropdownFavs"
          >
            {favs.length === 0 && (
              <li className="dropdown-item text-muted">Vacío</li>
            )}

            {favs.map((f) => (
              <li
                key={f.key}
                className="dropdown-item d-flex justify-content-between align-items-center"
              >
                <Link
                  to={`/${f.category}/${f.id}`}
                  className="me-2 text-decoration-none"
                >
                  {f.name}
                </Link>
                <button
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => toggleFav(f)}
                  title="Eliminar de favoritos"
                >
                  <i className="fa-solid fa-trash"></i>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
} 