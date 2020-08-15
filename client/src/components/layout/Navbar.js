import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { logout } from "../../actions/auth";

const Navbar = ({ auth: { isAuthenticated, loading, role }, logout }) => {
  const authUserLinks = (
    <ul className="navbar-nav ml-auto">
      <li className="nav-item dropdown">
        <a
          className="nav-link dropdown-toggle"
          href="!#"
          id="navbarDropdownMenuLink"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          Conductor
        </a>
        <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
          <Link className="dropdown-item" to="/user/register-driver">
            Nuevo conductor
          </Link>
          <Link className="dropdown-item" to="/user/drivers">
            Mostrar conductores
          </Link>
          <Link className="dropdown-item" to="/user/map-drivers">
            Mostrar conductores en mapa
          </Link>
        </div>
      </li>
      <li className="nav-item dropdown">
        <a
          className="nav-link dropdown-toggle"
          href="!#"
          id="navbarDropdownMenuLink"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          Vehículos
        </a>
        <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
          <Link className="dropdown-item" to="/user/add-vehicle">
            Nuevo vehículo
          </Link>
          <Link className="dropdown-item" to="/user/vehicles">
            Mostrar vehículos
          </Link>
        </div>
      </li>
      <li className="nav-item dropdown">
        <a
          className="nav-link dropdown-toggle"
          href="!#"
          id="navbarDropdownMenuLink"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          Clientes
        </a>
        <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
          <Link className="dropdown-item" to="/user/add-client">
            Nuevo cliente
          </Link>
          <Link className="dropdown-item" to="/user/clients">
            Mostrar clientes
          </Link>
        </div>
      </li>
      <li className="nav-item dropdown">
        <a
          className="nav-link dropdown-toggle"
          href="!#"
          id="navbarDropdownMenuLink"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          Proveedores
        </a>
        <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
          <Link className="dropdown-item" to="/user/add-provider">
            Nuevo proveedor
          </Link>
          <Link className="dropdown-item" to="/user/providers">
            Mostrar proveedores
          </Link>
        </div>
      </li>
      <li className="nav-item dropdown">
        <a
          className="nav-link dropdown-toggle"
          href="!#"
          id="navbarDropdownMenuLink"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          PIA
        </a>
        <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
          <Link className="dropdown-item" to="/user/add-pia">
            Nueva PIA
          </Link>
          <Link className="dropdown-item" to="/user/pias">
            Mostrar PIAs
          </Link>
        </div>
      </li>
      <li className="nav-item dropdown">
        <a
          className="nav-link dropdown-toggle"
          href="!#"
          id="navbarDropdownMenuLink"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          Usuario
        </a>
        <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
          <Link className="dropdown-item" to="/user/dashboard">
            Dashboard
          </Link>
          <Link onClick={logout} to="/" className="dropdown-item">
            Salir
          </Link>
        </div>
      </li>
    </ul>
  );

  const authDriverLinks = (
    <ul className="navbar-nav ml-auto">
      <li className="nav-item">
        <Link to="/driver/pias" className="nav-link">
          Mostrar mis entregas
        </Link>
      </li>
      <li className="nav-item">
        <Link onClick={logout} to="/" className="nav-link">
          Salir
        </Link>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul className="navbar-nav ml-auto">
      <li className="nav-item">
        <Link to="/user/login" className="nav-link">
          Gerente
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/driver/login" className="nav-link">
          Conductor
        </Link>
      </li>
    </ul>
  );

  return (
    <header>
      <nav
        className="navbar navbar-expand-sm sticky-top navbar-dark bg-dark"
        id="main-nav"
      >
        <div className="container">
          <Link to="/" className="navbar-brand">
            <img src="/img/delivery593logo.png" width="50" height="50" alt="" />
            <strong className="text-secondary">Delivery 593</strong>
          </Link>
          <button
            className="navbar-toggler"
            data-toggle="collapse"
            data-target="#navbarCollapse"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarCollapse">
            {!loading && (
              <Fragment>
                {isAuthenticated
                  ? role === "user"
                    ? authUserLinks
                    : authDriverLinks
                  : guestLinks}
              </Fragment>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navbar);
