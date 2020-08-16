import React, { useState, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { registerUser } from "../../actions/user";

const AddUser = ({ registerUser, history }) => {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    password: "",
  });

  const { nombre, email, password } = formData;

  const onChangeHandler = (e) =>
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  const onSubmitHandler = (e) => {
    e.preventDefault();
    registerUser(formData, history);
  };

  return (
    <Fragment>
      <div className="container p-4">
        <div className="row text-center">
          <div className="col">
            <div className="card">
              <div className="card-header bg-primary text-secondary">
                <h3>Registrar nuevo usuario</h3>
              </div>
              <div className="card-body">
                <form onSubmit={(e) => onSubmitHandler(e)}>
                  <div className="form-group">
                    <input
                      type="text"
                      name="nombre"
                      value={nombre}
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

AddUser.propTypes = {
  registerUser: PropTypes.func.isRequired,
};

export default connect(null, { registerUser })(withRouter(AddUser));
