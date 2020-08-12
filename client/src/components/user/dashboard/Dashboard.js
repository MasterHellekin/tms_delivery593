import React, { Fragment } from "react";
// import PropTypes from "prop-types";

function Dashboard(props) {
  return (
    <Fragment>
      <div className="container p-4">
        <div class="jumbotron bg-dark p-4">
          <h1 class="display-4 text-secondary">Bienvenido usuario</h1>
          <p class="lead text-secondary">
            Ingrese en "PIA" {"->"} "Nueva PIA" para ingresar una nueva PIA
          </p>
        </div>
      </div>
    </Fragment>
  );
}

// Dashboard.propTypes = {};

export default Dashboard;
