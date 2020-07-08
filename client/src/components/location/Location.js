import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Moment from "react-moment";
import { Map, Marker, Popup, TileLayer } from "react-leaflet";

import { searchByPia } from "../../actions/search";

const Location = ({ searchByPia, match, search: { loading, pia } }) => {
  useEffect(() => {
    searchByPia(match.params.id);
  }, [searchByPia, match.params.id]);

  return (
    <Fragment>
      {pia === null || loading ? (
        <h1>No hay nada</h1>
      ) : (
        <Fragment>
          <div className="container p-4">
            <div className="row">
              <div className="col-sm-6">
                <div className="card card-form">
                  <div className="card-header bg-primary text-center">
                    <h1>Detalle de su pedido</h1>
                  </div>
                  <div className="card-body text-dark">
                    <div className="form-group d-flex border-bottom border-primary">
                      <strong>
                        <h5>
                          Fecha de salida:{" "}
                          <Moment format="DD-MM-YYYY">{pia.fecSalida}</Moment>
                        </h5>
                      </strong>
                    </div>
                  </div>
                  <div className="card-body text-dark">
                    <div className="form-group d-flex border-bottom border-primary">
                      <strong>
                        <h5>Dirección de salida: {pia.dirSalida}</h5>
                      </strong>
                    </div>
                  </div>
                  <div className="card-body text-dark">
                    <div className="form-group d-flex border-bottom border-primary">
                      <strong>
                        <h5>
                          Fecha de llegada:{" "}
                          <Moment format="DD-MM-YYYY">{pia.fecLlegada}</Moment>
                        </h5>
                      </strong>
                    </div>
                  </div>
                  <div className="card-body text-dark">
                    <div className="form-group d-flex border-bottom border-primary">
                      <strong>
                        <h5>Dirección de llegada: {pia.dirLlegada}</h5>
                      </strong>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-sm-6">
                <Map center={[pia.latSalida, pia.lonSalida]} zoom={12}>
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                  />
                  <Marker position={[pia.latSalida, pia.lonSalida]}>
                    <Popup>Lugar de salida: {pia.dirSalida}</Popup>
                  </Marker>
                  <Marker position={[pia.latLlegada, pia.lonLlegada]}>
                    <Popup>Lugar de llegada: {pia.dirLlegada}</Popup>
                  </Marker>
                </Map>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

Location.propTypes = {
  searchByPia: PropTypes.func.isRequired,
  search: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  search: state.search,
});

export default connect(mapStateToProps, { searchByPia })(Location);
