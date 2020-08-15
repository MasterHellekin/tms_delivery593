import axios from "axios";
import React, { useState, useRef, useEffect } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Map, TileLayer, Marker, Popup, withLeaflet } from "react-leaflet";
import { SearchControl, OpenStreetMapProvider } from "react-leaflet-geosearch";
import { addPiaUser } from "../../../actions/search";
import { getDriversByUser } from "../../../actions/driver";
import { getClientsByUser } from "../../../actions/client";
import { getVehiclesByUser } from "../../../actions/vehicle";

import "../../../../node_modules/leaflet-geosearch/dist/style.css";

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
  useEffect(() => {
    getDriversByUser();
    getClientsByUser();
    getVehiclesByUser();
  }, [getDriversByUser, getClientsByUser, getVehiclesByUser]);

  const mark = useRef(null);

  const [formData, setFormData] = useState({
    pedidoPia: "",
    pedidoCliente: "",
    descripcion: "",
    fecLlegada: "",
    dirLlegada: "",
    latLlegada: "",
    lonLlegada: "",
    estado: "",
    vehiculoId: "",
    conductoreId: "",
    clienteId: "",
  });

  const [location, setLocation] = useState({
    dirLlegada: "Ambato",
    center: { lat: -1.24908, lng: -78.61675 },
    position: { lat: -1.24908, lng: -78.61675 },
    zoom: 15,
    draggable: true,
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

  const onSubmitHandler = (e) => {
    e.preventDefault();
    addPiaUser(formData, history);
  };

  const toggleDraggableHandler = () => {
    setLocation({
      ...location,
      draggable: !location.draggable,
    });
  };

  async function getLabelHandler(latitude, longitude) {
    const res = await axios.get(
      `/v1/reverse.php?key=82681b92e48e69&lat=${latitude}&lon=${longitude}&format=json`
    );

    const name = res.data.display_name;
    console.log(name);
    return name;
  }

  async function updatePositionHandler() {
    const marker = mark.current;
    // if (marker != null) {
    const name = await getLabelHandler(
      marker.leafletElement.getLatLng().lat,
      marker.leafletElement.getLatLng().lng
    );

    console.log(name);
    console.log(marker);

    try {
      setLocation({
        ...location,
        dirLlegada: name,
        position: marker.leafletElement.getLatLng(),
      });

      setFormData({
        ...formData,
        dirLlegada: name,
        latLlegada: marker.leafletElement.getLatLng().lat,
        lonLlegada: marker.leafletElement.getLatLng().lng,
      });
    } catch (err) {}
    // }
  }

  const updateBySearchHandler = (res) => {
    console.log(res);
    setLocation({
      ...location,
      dirLlegada: res.label,
      position: { lat: res.y, lng: res.x },
    });
  };

  const prov = OpenStreetMapProvider();
  const GeoSearchControlElement = withLeaflet(SearchControl);
  const center = [location.center.lat, location.center.lng];
  const position = [location.position.lat, location.position.lng];

  return (
    <div className="container p-4">
      <div className="row text-center">
        <div className="col">
          <div className="card">
            <div className="card-header bg-primary text-secondary">
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
                  <Map center={center} zoom={location.zoom} zoomControl={true}>
                    <TileLayer
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    />
                    <Marker
                      ref={mark}
                      draggable={location.draggable}
                      ondragend={() => updatePositionHandler()}
                      position={position}
                    >
                      <Popup minWidth={90}>
                        {`${location.position.lat} + ${location.position.lng}`}
                        <span onClick={() => toggleDraggableHandler()}></span>
                      </Popup>
                    </Marker>
                    <GeoSearchControlElement
                      provider={prov}
                      showMarker={false}
                      showPopup={false}
                      popupFormat={({ query, result }) =>
                        updateBySearchHandler(result)
                      }
                      maxMarkers={1}
                      retainZoomLevel={false}
                      animateZoom={true}
                      autoClose={true}
                      searchLabel={"Ingrese una dirección"}
                      keepResult={true}
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
                    // ref={lat}
                    name="latLlegada"
                    value={latLlegada}
                    className="form-control"
                    placeholder="Presione cualquier tecla para continuar"
                    onChange={(e) => onChangeHandler(e)}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    // ref={lon}
                    name="lonLlegada"
                    value={lonLlegada}
                    className="form-control"
                    placeholder="Presione cualquier tecla para continuar"
                    onChange={(e) => onChangeHandler(e)}
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
                  <button className="btn btn-primary btn-block" type="submit">
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
