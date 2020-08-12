import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import { Map, Marker, Popup, TileLayer } from "react-leaflet";

import { searchByPia } from "../../actions/search";
import Spinner from "../layout/Spinner";

const Location = ({ searchByPia, match, search: { loading, pia } }) => {
  useEffect(() => {
    searchByPia(match.params.id);
  }, [searchByPia, match.params.id]);

  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : pia === null || pia.length === 0 ? (
        <Fragment>
          <div className="container p-4">
            <div class="jumbotron bg-primary p-4">
              <h1 class="display-4 text-secondary">Número PIA no encontrado</h1>
              <p class="lead text-secondary">
                Al parecer el número PIA no existe o no ha sido ingresado en el
                sistema, vuelva a intentarlo más tarde o llame al administrador
              </p>
              <Link class="btn btn-primary btn-lg" to="/" role="button">
                Buscar PIA
              </Link>
            </div>
          </div>
        </Fragment>
      ) : (
        <Fragment>
          <div className="container p-4">
            <div className="row">
              <div className="col-sm-6">
                <div className="card card-form">
                  <div className="card-header bg-primary text-center text-secondary">
                    <h1>Detalle de su pedido</h1>
                  </div>
                  <div className="card-body text-dark">
                    <div className="form-group d-flex border-bottom border-primary">
                      <strong>
                        <h5>
                          Fecha de salida:{" "}
                          <Moment format="DD-MM-YYYY">
                            {pia[0].fecSalida}
                          </Moment>
                        </h5>
                      </strong>
                    </div>
                  </div>
                  <div className="card-body text-dark">
                    <div className="form-group d-flex border-bottom border-primary">
                      <strong>
                        <h5>
                          Fecha de llegada:{" "}
                          <Moment format="DD-MM-YYYY">
                            {pia[0].fecLlegada}
                          </Moment>
                        </h5>
                      </strong>
                    </div>
                  </div>
                  <div className="card-body text-dark">
                    <div className="form-group d-flex border-bottom border-primary">
                      <strong>
                        <h5>Dirección de llegada: {pia[0].dirLlegada}</h5>
                      </strong>
                    </div>
                  </div>
                  <div className="card-body text-dark">
                    <div className="form-group d-flex border-bottom border-primary">
                      <strong>
                        <h5>Vehículo de la entrega: {pia[0].placa}</h5>
                      </strong>
                    </div>
                  </div>
                  <div className="card-body text-dark">
                    <div className="form-group d-flex border-bottom border-primary">
                      <strong>
                        <h5>Nombre conductor: {pia[0].nomCon}</h5>
                      </strong>
                    </div>
                  </div>
                  <div className="card-body text-dark">
                    <div className="form-group d-flex border-bottom border-primary">
                      <strong>
                        <h5>Estado: {pia[0].estado}</h5>
                      </strong>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-sm-6">
                <Map center={[pia[0].latLlegada, pia[0].lonLlegada]} zoom={12}>
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                  />
                  <Marker position={[pia[0].latLlegada, pia[0].lonLlegada]}>
                    <Popup>Lugar de llegada: {pia[0].dirLlegada}</Popup>
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
