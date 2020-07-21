import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { getVehiclesByUser } from "../../../actions/vehicle";

export const ShowVehicles = ({
  getVehiclesByUser,
  vehicle: { vehicles, loading },
}) => {
  useEffect(() => {
    getVehiclesByUser();
  }, [getVehiclesByUser]);

  return loading ? (
    <Fragment>No hay nada</Fragment>
  ) : (
    <Fragment>
      <h1>Vehículos</h1>
      <table className="table table-bordered table-condensed table-striped bg-light">
        <thead>
          <tr>
            <th>Placa</th>
            <th>Marca</th>
            <th>Tipo</th>
          </tr>
        </thead>
        <tbody>
          {vehicles.map((thevehicle) => (
            <tr key={thevehicle.id}>
              <td className="align-middle">{thevehicle.placa}</td>
              <td className="align-middle">{thevehicle.marca}</td>
              <td className="align-middle">{thevehicle.tipo}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Fragment>
  );
};

ShowVehicles.propTypes = {
  getVehiclesByUser: PropTypes.func.isRequired,
  vehicle: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  vehicle: state.vehicle,
});

export default connect(mapStateToProps, { getVehiclesByUser })(ShowVehicles);
