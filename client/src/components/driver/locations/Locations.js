import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Map, Marker, Popup, TileLayer } from "react-leaflet";

import { getPiaByDriver, updatePiaStatus } from "../../../actions/search";
import Spinner from "../../layout/Spinner";

const Locations = ({
  getPiaByDriver,
  updatePiaStatus,
  search: { loading, pias },
  history,
}) => {
  useEffect(() => {
    getPiaByDriver();
  }, [getPiaByDriver]);

  const [formData, setFormData] = useState({
    estado: "",
  });

  const { estado } = formData;

  const onChangeHandler = (e) =>
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  const onSubmitHandler = (e, id) => {
    e.preventDefault();
    updatePiaStatus(id, formData, history);
    window.location.reload(false);
  };

  return (
    <Fragment>
      {pias === [] || pias.length === 0 || loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <Map center={[pias[0].latLlegada, pias[0].lonLlegada]} zoom={15}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            {pias.map((pia) => (
              <Marker key={pia.id} position={[pia.latLlegada, pia.lonLlegada]}>
                <Popup className="custom">
                  <form onSubmit={(e) => onSubmitHandler(e, pia.id)}>
                    <div className="form-row">
                      <div className="col form-group">
                        <label htmlFor="pedidoPia">
                          <strong>Número PIA:</strong> {pia.pedidoPia}
                        </label>
                      </div>
                      <div className="col form-group">
                        <label htmlFor="pedidoPia">
                          <strong>Pedido PIA:</strong> {pia.pedidoCliente}
                        </label>
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="col form-group">
                        <label htmlFor="Estado">
                          <strong>Estado:</strong> {pia.estado}
                        </label>
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="col form-group">
                        <div className="input-group input-group-sm mb-3">
                          <div className="input-group-prepend">
                            <button
                              className="btn btn-outline-primary"
                              type="submit"
                            >
                              Actualizar
                            </button>
                          </div>
                          <select
                            name="estado"
                            className="custom-select"
                            value={estado}
                            onChange={(e) => onChangeHandler(e)}
                          >
                            <option key="0" value="">
                              * Escoja un nuevo estado
                            </option>
                            <option key="1" value="proceso">
                              Proceso
                            </option>
                            <option key="2" value="rechazo">
                              Rechazo
                            </option>
                            <option key="3" value="novedad">
                              Novedad
                            </option>
                            <option key="4" value="entregado">
                              Entregado
                            </option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </form>
                </Popup>
              </Marker>
            ))}
          </Map>
        </Fragment>
      )}
    </Fragment>
  );
};

Locations.propTypes = {
  getPiaByDriver: PropTypes.func.isRequired,
  updatePiaStatus: PropTypes.func.isRequired,
  search: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  search: state.search,
});

export default connect(mapStateToProps, { getPiaByDriver, updatePiaStatus })(
  Locations
);
