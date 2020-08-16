import React, { Fragment } from "react";
// import PropTypes from "prop-types";

function Dashboard(props) {
  return (
    <Fragment>
      <div className="container p-4">
        <div className="jumbotron bg-dark p-4">
          <h1 className="display-4 text-secondary">Bienvenido usuario</h1>
          <p className="lead text-secondary">
            Ingrese en "PIA" {"->"} "Nueva PIA" para ingresar una nueva PIA
          </p>
        </div>
      </div>
    </Fragment>
  );
}

// Dashboard.propTypes = {};

export default Dashboard;
