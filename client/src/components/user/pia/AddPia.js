import React, { useState, useRef, useEffect } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Map, TileLayer } from "react-leaflet";
import L from "leaflet";
import { geosearch } from "esri-leaflet-geocoder";

import { addPiaUser } from "../../../actions/search";
import { getDriversByUser } from "../../../actions/driver";
import { getClientsByUser } from "../../../actions/client";
import { getVehiclesByUser } from "../../../actions/vehicle";

import "esri-leaflet-geocoder/dist/esri-leaflet-geocoder.css";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.4.0/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.4.0/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.4.0/dist/images/marker-shadow.png",
});

const AddPia = ({
  addPiaUser,
  getDriversByUser,
  getClientsByUser,
  getVehiclesByUser,
  driver: { drivers },
  client: { clients },
  vehicle: { vehicles },
  history,
}) => {
  const mapRef = useRef();
  let lat = useRef();
  let lon = useRef();

  useEffect(() => {
    getDriversByUser();
    getClientsByUser();
    getVehiclesByUser();

    const { current = {} } = mapRef;
    const { leafletElement: map } = current;

    const control = geosearch();
    control.addTo(map);

    const results = new L.LayerGroup().addTo(map);

    control.on("results", function (data) {
      results.clearLayers();
      for (let i = data.results.length - 1; i >= 0; i--) {
        results.addLayer(L.marker(data.results[i].latlng));
        lat.current = data.results[i].latlng.lat;
        lon.current = data.results[i].latlng.lng;
      }
    });

    map.locate(
      {
        setView: true,
      },
      []
    );
  }, [getDriversByUser, getClientsByUser, getVehiclesByUser]);

  const [formData, setFormData] = useState({
    pedidoPia: "",
    pedidoCliente: "",
    descripcion: "",
    fecLlegada: "",
    dirLlegada: "",
    latLlegada: lat.current,
    lonLlegada: lon.current,
    estado: "",
    vehiculoId: "",
    conductoreId: "",
    clienteId: "",
  });

  const {
    pedidoPia,
    pedidoCliente,
    descripcion,
    fecLlegada,
    dirLlegada,
    latLlegada,
    lonLlegada,
    estado,
    vehiculoId,
    conductoreId,
    clienteId,
  } = formData;

  const onChangeHandler = (e) =>
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  const onChangeLatitudeHandler = (e) =>
    setFormData({
      ...formData,
      [e.target.name]: lat.current,
    });

  const onChangeLongitudeHandler = (e) =>
    setFormData({
      ...formData,
      [e.target.name]: lon.current,
    });

  const onSubmitHandler = (e) => {
    e.preventDefault();
    addPiaUser(formData, history);
  };

  return (
    <div className="container p-4">
      <div className="row text-center">
        <div className="col">
          <div className="card">
            <div className="card-header bg-primary">
              <h3>Añadir nueva Pía</h3>
            </div>
            <div className="card-body">
              <form onSubmit={(e) => onSubmitHandler(e)}>
                <div className="form-group">
                  <input
                    type="text"
                    name="pedidoPia"
                    value={pedidoPia}
                    className="form-control"
                    placeholder="Pedido Pia"
                    onChange={(e) => onChangeHandler(e)}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    name="pedidoCliente"
                    value={pedidoCliente}
                    className="form-control"
                    placeholder="Pedido Cliente"
                    onChange={(e) => onChangeHandler(e)}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    name="descripcion"
                    value={descripcion}
                    className="form-control"
                    placeholder="Descripción"
                    onChange={(e) => onChangeHandler(e)}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="date"
                    className="form-control"
                    name="fecLlegada"
                    value={fecLlegada}
                    onChange={(e) => onChangeHandler(e)}
                  />
                </div>
                <div className="form-group text-dark">
                  <Map ref={mapRef} center={[0, 0]} zoom={16}>
                    <TileLayer
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    />
                  </Map>
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    name="dirLlegada"
                    value={dirLlegada}
                    className="form-control"
                    placeholder="Dirección"
                    onChange={(e) => onChangeHandler(e)}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    ref={lat}
                    name="latLlegada"
                    value={latLlegada}
                    className="form-control"
                    placeholder="Presione cualquier tecla para continuar"
                    onChange={(e) => onChangeLatitudeHandler(e)}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    ref={lon}
                    name="lonLlegada"
                    value={lonLlegada}
                    className="form-control"
                    placeholder="Presione cualquier tecla para continuar"
                    onChange={(e) => onChangeLongitudeHandler(e)}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    name="estado"
                    value={estado}
                    className="form-control"
                    placeholder="Estado"
                    onChange={(e) => onChangeHandler(e)}
                  />
                </div>

                <div className="form-group">
                  <select
                    name="clienteId"
                    className="form-control"
                    value={clienteId}
                    onChange={(e) => onChangeHandler(e)}
                  >
                    <option value="0">* Seleccione un cliente</option>
                    {clients.map((theclient) => (
                      <option key={theclient.id} value={theclient.id}>
                        {theclient.nomCli}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <select
                    name="conductoreId"
                    className="form-control"
                    value={conductoreId}
                    onChange={(e) => onChangeHandler(e)}
                  >
                    <option value="0">* Seleccione un conductor</option>
                    {drivers.map((thedriver) => (
                      <option key={thedriver.id} value={thedriver.id}>
                        {thedriver.nomCon}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <select
                    name="vehiculoId"
                    className="form-control"
                    value={vehiculoId}
                    onChange={(e) => onChangeHandler(e)}
                  >
                    <option value="0">* Seleccione un vehiculo</option>
                    {vehicles.map((thevehicle) => (
                      <option key={thevehicle.id} value={thevehicle.id}>
                        {thevehicle.placa}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <button
                    className="btn btn-primary btn-block"
                    type="submit"
                  >
                    Guardar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

AddPia.propTypes = {
  addPiaUser: PropTypes.func.isRequired,
  getDriversByUser: PropTypes.func.isRequired,
  getClientsByUser: PropTypes.func.isRequired,
  getVehiclesByUser: PropTypes.func.isRequired,
  driver: PropTypes.object.isRequired,
  client: PropTypes.object.isRequired,
  vehicle: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  driver: state.driver,
  client: state.client,
  vehicle: state.vehicle,
});

export default connect(mapStateToProps, {
  addPiaUser,
  getDriversByUser,
  getClientsByUser,
  getVehiclesByUser,
})(withRouter(AddPia));
