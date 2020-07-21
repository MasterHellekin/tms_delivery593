import React, { Fragment, useState } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { loginDriver } from "../../actions/auth";

const LoginDriver = ({ loginDriver, isAuthenticated, role }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const onChangeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    loginDriver(email, password);
  };

  if (isAuthenticated) {
    return <Redirect to="/driver/dashboard" />;
  }

  return (
    <Fragment>
      <div className="container p-4">
        <div className="container">
          <div className="row text-center">
            <div className="col-md-8 m-auto">
              <div className="card bg-primary">
                <div className="card-header">
                  <h3>Ingreso de Conductores</h3>
                </div>
                <div className="card-body">
                  <form onSubmit={(e) => onSubmitHandler(e)} method="POST">
                    <div className="form-group">
                      <input
                        type="email"
                        name="email"
                        value={email}
                        id="email"
                        className="form-control"
                        placeholder="Correo electrónico"
                        onChange={(e) => onChangeHandler(e)}
                        autoFocus
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="password"
                        name="password"
                        value={password}
                        id="password"
                        className="form-control"
                        placeholder="Contraseña"
                        onChange={(e) => onChangeHandler(e)}
                      />
                    </div>
                    <div className="form-group">
                      <button
                        className="btn btn-outline-light btn-block"
                        type="submit"
                      >
                        Ingresar
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

LoginDriver.propTypes = {
  loginDriver: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  role: PropTypes.string,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { loginDriver })(LoginDriver);
