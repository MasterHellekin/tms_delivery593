import React, { useState, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { addVehicleByUser } from "../../../actions/vehicle";

function AddVehicle({ addVehicleByUser, history }) {
  const [formData, setFormData] = useState({
    placa: "",
    marca: "",
    tipo: "",
  });

  const { placa, marca, tipo } = formData;

  const onChangeHandler = (e) =>
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  const onSubmitHandler = (e) => {
    e.preventDefault();
    addVehicleByUser(formData, history);
  };

  return (
    <Fragment>
      <div className="container p-4">
        <div className="row text-center">
          <div className="col">
            <div className="card">
              <div className="card-header bg-primary">
                <h3>Registrar nuevo vehículo</h3>
              </div>
              <div className="card-body">
                <form onSubmit={(e) => onSubmitHandler(e)}>
                  <div className="form-group">
                    <input
                      type="text"
                      name="placa"
                      value={placa}
                      className="form-control"
                      placeholder="Placa"
                      onChange={(e) => onChangeHandler(e)}
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      name="marca"
                      value={marca}
                      className="form-control"
                      placeholder="Marca"
                      onChange={(e) => onChangeHandler(e)}
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      name="tipo"
                      value={tipo}
                      className="form-control"
                      placeholder="Tipo"
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
}

AddVehicle.propTypes = {
  addVehicleByUser: PropTypes.func.isRequired,
};

export default connect(null, { addVehicleByUser })(withRouter(AddVehicle));
