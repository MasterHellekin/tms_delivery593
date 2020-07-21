import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { getPiaByUser } from "../../../actions/search";

const ShowPias = ({ getPiaByUser, search: { pias, loading } }) => {
  useEffect(() => {
    getPiaByUser();
  }, [getPiaByUser]);

  return loading ? (
    <Fragment>No hay nada</Fragment>
  ) : (
    <Fragment>
      <h1>Últimas Pias</h1>
      <table className="table table-bordered table-condensed table-striped bg-light">
        <thead>
          <tr>
            <th>Pedido cliente</th>
            <th>Pedido pia</th>
            <th>Descripción</th>
            <th>Fecha salida</th>
            <th>Fecha llegada</th>
            <th>Dirección llegada</th>
            <th>Estado</th>
            <th>Vehiculo</th>
            <th>Conductor</th>
            <th>Cliente</th>
          </tr>
        </thead>
        <tbody>
          {pias.map((pia) => (
            <tr key={pia.id}>
              <td className="align-middle">{pia.pedidoCliente}</td>
              <td className="align-middle">{pia.pedidoPia}</td>
              <td className="align-middle">{pia.descripcion}</td>
              <td className="align-middle">{pia.fecSalida}</td>
              <td className="align-middle">{pia.fecLlegada}</td>
              <td className="align-middle">{pia.dirLlegada}</td>
              <td className="align-middle">{pia.estado}</td>
              <td className="align-middle">{pia.placa}</td>
              <td className="align-middle">{pia.nomCon}</td>
              <td className="align-middle">{pia.nomCli}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Fragment>
  );
};

ShowPias.propTypes = {
  getPiaByUser: PropTypes.func.isRequired,
  search: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  search: state.search,
});

export default connect(mapStateToProps, { getPiaByUser })(ShowPias);
