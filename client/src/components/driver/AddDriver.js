import React, { useState, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { registerDriverByUser } from "../../actions/driver";

const AddDriver = ({ registerDriverByUser, history }) => {
  const [formData, setFormData] = useState({
    nomCon: "",
    email: "",
    password: "",
  });

  const { nomCon, email, password } = formData;

  const onChangeHandler = (e) =>
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  const onSubmitHandler = (e) => {
    e.preventDefault();
    registerDriverByUser(formData, history);
  };

  return (
    <Fragment>
      <div className="container p-4">
        <div className="row text-center">
          <div className="col">
            <div className="card">
              <div className="card-header bg-primary">
                <h3>Registrar nuevo conductor</h3>
              </div>
              <div className="card-body">
                <form onSubmit={(e) => onSubmitHandler(e)}>
                  <div className="form-group">
                    <input
                      type="text"
                      name="nomCon"
                      value={nomCon}
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
                    <input
                      type="password"
                      name="password"
                      value={password}
                      className="form-control"
                      placeholder="Contraseña"
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

AddDriver.propTypes = {
  registerDriverByUser: PropTypes.func.isRequired,
};

export default connect(null, { registerDriverByUser })(withRouter(AddDriver));
