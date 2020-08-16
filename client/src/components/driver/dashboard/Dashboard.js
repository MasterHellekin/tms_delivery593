import React, { Fragment } from "react";
// import PropTypes from "prop-types";

const Dashboard = (props) => {
  return (
    <Fragment>
      <div className="container p-4">
        <div className="jumbotron bg-dark p-4">
          <h1 className="display-4 text-secondary">Bienvenido conductor</h1>
          <p className="lead text-secondary">
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
