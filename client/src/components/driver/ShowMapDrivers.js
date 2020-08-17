import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Map, Marker, Popup, TileLayer } from "react-leaflet";

import { getDriversByUser } from "../../actions/driver";

const ShowMapDrivers = ({ getDriversByUser, driver: { drivers, loading } }) => {
  useEffect(() => {
    getDriversByUser();
  }, [getDriversByUser]);

  return (
    <Fragment>
      <Map center={[-1.24908, -78.61675]} zoom={15}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {drivers.map((thedriver) => (
          <Marker
            key={thedriver.id}
            position={[thedriver.ultLatitud, thedriver.ultLongitud]}
          >
            <Popup>Nombre conductor: {thedriver.nomCon}</Popup>
          </Marker>
        ))}
      </Map>
    </Fragment>
  );
};

ShowMapDrivers.propTypes = {
  getDriversByUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  driver: state.driver,
});

export default connect(mapStateToProps, { getDriversByUser })(ShowMapDrivers);
