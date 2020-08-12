import React, { useState, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { addClientByUser } from "../../../actions/client";

const AddClient = ({ addClientByUser, history }) => {
  const [formData, setFormData] = useState({
    cedula: "",
    nomCli: "",
    provincia: "",
    ciudad: "",
    calle: "",
    telf1: "",
    telf2: "",
    email: "",
  });

  const {
    cedula,
    nomCli,
    provincia,
    ciudad,
    calle,
    telf1,
    telf2,
    email,
  } = formData;

  const onChangeHandler = (e) =>
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  const onSubmitHandler = (e) => {
    e.preventDefault();
    addClientByUser(formData, history);
  };

  return (
    <Fragment>
      <div className="container p-4">
        <div className="row text-center">
          <div className="col">
            <div className="card">
              <div className="card-header bg-primary text-secondary">
                <h3>Registrar nuevo cliente</h3>
              </div>
              <div className="card-body">
                <form onSubmit={(e) => onSubmitHandler(e)}>
                  <div className="form-group">
                    <input
                      type="number"
                      name="cedula"
                      value={cedula}
                      className="form-control"
                      placeholder="Cédula"
                      onChange={(e) => onChangeHandler(e)}
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      name="nomCli"
                      value={nomCli}
                      className="form-control"
                      placeholder="Nombre"
                      onChange={(e) => onChangeHandler(e)}
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      name="provincia"
                      value={provincia}
                      className="form-control"
                      placeholder="Provincia"
                      onChange={(e) => onChangeHandler(e)}
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      name="ciudad"
                      value={ciudad}
                      className="form-control"
                      placeholder="Ciudad"
                      onChange={(e) => onChangeHandler(e)}
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      name="calle"
                      value={calle}
                      className="form-control"
                      placeholder="Dirección"
                      onChange={(e) => onChangeHandler(e)}
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="number"
                      name="telf1"
                      value={telf1}
                      className="form-control"
                      placeholder="Teléfono 1"
                      onChange={(e) => onChangeHandler(e)}
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="number"
                      name="telf2"
                      value={telf2}
                      className="form-control"
                      placeholder="Teléfono 2"
                      onChange={(e) => onChangeHandler(e)}
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="email"
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

AddClient.propTypes = {
  addClientByUser: PropTypes.func.isRequired,
};

export default connect(null, { addClientByUser })(withRouter(AddClient));
