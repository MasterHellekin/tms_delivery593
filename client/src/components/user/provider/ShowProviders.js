import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { getProvidersByUser } from "../../../actions/provider";

const ShowProviders = ({
  getProvidersByUser,
  provider: { providers, loading },
}) => {
  useEffect(() => {
    getProvidersByUser();
  }, [getProvidersByUser]);
  
  return loading ? (
    <Fragment>No hay nada</Fragment>
  ) : (
    <Fragment>
      <h1>Proveedores</h1>
      <table className="table table-bordered table-condensed table-striped bg-light">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {providers.map((theprovider) => (
            <tr key={theprovider.id}>
              <td className="align-middle">{theprovider.nomPro}</td>
              <td className="align-middle">{theprovider.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Fragment>
  );
};

ShowProviders.propTypes = {
  getProvidersByUser: PropTypes.func.isRequired,
  provider: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  provider: state.provider,
});

export default connect(mapStateToProps, { getProvidersByUser })(ShowProviders);
