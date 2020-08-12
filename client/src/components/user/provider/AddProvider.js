import React, { useState, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { addProviderByUser } from "../../../actions/provider";

const AddProvider = ({ addProviderByUser, history }) => {
  const [formData, setFormData] = useState({
    nomPro: "",
    email: "",
  });

  const { nomPro, email } = formData;

  const onChangeHandler = (e) =>
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  const onSubmitHandler = (e) => {
    e.preventDefault();
    addProviderByUser(formData, history);
  };

  return (
    <Fragment>
      <div className="container p-4">
        <div className="row text-center">
          <div className="col">
            <div className="card">
              <div className="card-header bg-primary text-secondary">
                <h3>Registrar nuevo proveedor</h3>
              </div>
              <div className="card-body">
                <form onSubmit={(e) => onSubmitHandler(e)}>
                  <div className="form-group">
                    <input
                      type="text"
                      name="nomPro"
                      value={nomPro}
                      className="form-control"
                      placeholder="Nombre"
                      onChange={(e) => onChangeHandler(e)}
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      name="email"
                      value={email}
                      className="form-control"
                      placeholder="Email"
                      onChange={(e) => onChangeHandler(e)}
                    />
                  </div>
                  <div className="form-group">
                    <button className="btn btn-primary btn-block" type="submit">
                      Registrar
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

AddProvider.propTypes = {
  addProviderByUser: PropTypes.func.isRequired,
};

export default connect(null, { addProviderByUser })(withRouter(AddProvider));
