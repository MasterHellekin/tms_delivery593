import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header>
      <nav
        className="navbar navbar-expand-sm bg-dark navbar-dark"
        id="main-nav"
      >
        <div className="container">
          <Link to="/" className="navbar-brand">
            <strong>Delivery 593</strong>
          </Link>
          <button
            className="navbar-toggler"
            data-toggle="collapse"
            data-target="#navbarCollapse"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarCollapse">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                {/* <a href="#home" className="nav-link">
                <strong>Inicio</strong>
              </a> */}
              </li>
              <li className="nav-item">
                {/* <a href="#ofert-head-section" className="nav-link">
                <strong>Ingresar</strong>
              </a> */}
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
