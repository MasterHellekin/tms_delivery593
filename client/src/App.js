import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";

import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Alert from "./components/layout/Alert";
import AddUser from "./components/user/AddUser";
import LoginUser from "./components/auth/LoginUser";
import LoginDriver from "./components/auth/LoginDriver";
import DashboardUser from "./components/user/dashboard/Dashboard";
import DashboardDriver from "./components/driver/dashboard/Dashboard";
import Location from "./components/location/Location";
import ShowPias from "./components/user/pia/ShowPias";
import AddPia from "./components/user/pia/AddPia";
import ShowProviders from "./components/user/provider/ShowProviders";
import AddProvider from "./components/user/provider/AddProvider";
import ShowClients from "./components/user/client/ShowClients";
import AddClient from "./components/user/client/AddClient";
import ShowVehicles from "./components/user/vehicle/ShowVehicles";
import AddVehicle from "./components/user/vehicle/AddVehicle";
import ShowDrivers from "./components/driver/ShowDrivers";
import ShowMapDriver from "./components/driver/ShowMapDrivers";
import AddDriver from "./components/driver/AddDriver";
import Locations from "./components/driver/locations/Locations";
import PrivateRoute from "./components/routing/PrivateRoute";

import store from "./store";
import { loadUser, loadDriver } from "./actions/auth";
import setAuthToken from "./utils/setAuthToken";

import "./App.css";
import "./bootstrap.css";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role === "user") {
      store.dispatch(loadUser());
    } else {
      store.dispatch(loadDriver());
    }
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Route exact path="/" component={Landing} />
          <Route exact path="/locations/:id" component={Location} />
          <section className="container">
            <Alert />
            <Switch>
              <Route exact path="/user/register" component={AddUser} />
              <Route exact path="/user/login" component={LoginUser} />
              <Route exact path="/driver/login" component={LoginDriver} />
              <PrivateRoute
                exact
                path="/user/dashboard"
                component={DashboardUser}
              />
              <PrivateRoute
                exact
                path="/driver/dashboard"
                component={DashboardDriver}
              />
              <PrivateRoute exact path="/user/add-pia" component={AddPia} />
              <PrivateRoute exact path="/user/pias" component={ShowPias} />
              <PrivateRoute
                exact
                path="/user/register-driver"
                component={AddDriver}
              />
              <PrivateRoute
                exact
                path="/user/providers"
                component={ShowProviders}
              />
              <PrivateRoute
                exact
                path="/user/add-provider"
                component={AddProvider}
              />
              <PrivateRoute
                exact
                path="/user/clients"
                component={ShowClients}
              />
              <PrivateRoute
                exact
                path="/user/add-client"
                component={AddClient}
              />
              <PrivateRoute
                exact
                path="/user/drivers"
                component={ShowDrivers}
              />
              <PrivateRoute
                exact
                path="/user/map-drivers"
                component={ShowMapDriver}
              />
              <PrivateRoute
                exact
                path="/user/vehicles"
                component={ShowVehicles}
              />
              <PrivateRoute
                exact
                path="/user/add-vehicle"
                component={AddVehicle}
              />
              <PrivateRoute exact path="/driver/pias" component={Locations} />
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
