import React, { Fragment } from "react";
// import PropTypes from "prop-types";

const Dashboard = (props) => {
  return (
    <Fragment>
      <div className="container p-4">
        <div class="jumbotron bg-dark p-4">
          <h1 class="display-4 text-secondary">Bienvenido conductor</h1>
          <p class="lead text-secondary">
            Ingrese en "Mostrar mis entregas" para saber el número de entregas
            de hoy
          </p>
        </div>
      </div>
    </Fragment>
  );
};

// Dashboard.propTypes = {};

export default Dashboard;
