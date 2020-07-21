import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { getClientsByUser } from "../../../actions/client";

const ShowClients = ({ getClientsByUser, client: { clients, loading } }) => {
  useEffect(() => {
    getClientsByUser();
  }, [getClientsByUser]);

  return loading ? (
    <Fragment>No hay nada</Fragment>
  ) : (
    <Fragment>
      <h1>Clientes</h1>
      <table className="table table-bordered table-condensed table-striped bg-light">
        <thead>
          <tr>
            <th>Cedula</th>
            <th>Nombre</th>
            <th>Provincia</th>
            <th>Ciudad</th>
            <th>Calle</th>
            <th>Teléfono 1</th>
            <th>Teléfono 2</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((theclient) => (
            <tr key={theclient.id}>
              <td className="align-middle">{theclient.cedula}</td>
              <td className="align-middle">{theclient.nomCli}</td>
              <td className="align-middle">{theclient.provincia}</td>
              <td className="align-middle">{theclient.ciudad}</td>
              <td className="align-middle">{theclient.calle}</td>
              <td className="align-middle">{theclient.telf1}</td>
              <td className="align-middle">{theclient.telf2}</td>
              <td className="align-middle">{theclient.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Fragment>
  );
};

ShowClients.propTypes = {
  getClientsByUser: PropTypes.func.isRequired,
  client: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  client: state.client,
});

export default connect(mapStateToProps, { getClientsByUser })(ShowClients);
