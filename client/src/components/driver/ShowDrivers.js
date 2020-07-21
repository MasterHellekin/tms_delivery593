import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { getDriversByUser } from "../../actions/driver";

export const ShowDrivers = ({
  getDriversByUser,
  driver: { drivers, loading },
}) => {
  useEffect(() => {
    getDriversByUser();
  }, [getDriversByUser]);

  return loading ? (
    <Fragment>No hay nada</Fragment>
  ) : (
    <Fragment>
      <h1>Conductores</h1>
      <table className="table table-bordered table-condensed table-striped bg-light">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {drivers.map((thedriver) => (
            <tr key={thedriver.id}>
              <td className="align-middle">{thedriver.nomCon}</td>
              <td className="align-middle">{thedriver.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Fragment>
  );
};

ShowDrivers.propTypes = {
  getDriversByUser: PropTypes.func.isRequired,
  driver: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  driver: state.driver,
});

export default connect(mapStateToProps, { getDriversByUser })(ShowDrivers);
