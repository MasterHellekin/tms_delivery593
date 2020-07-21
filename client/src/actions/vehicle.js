import axios from "axios";

import {
  GET_VEHICLES_BY_USER,
  GET_VEHICLES_FAIL,
  ADD_VEHICLE_SUCCESS,
  ADD_VEHICLE_FAIL,
} from "./types";

import { setAlert } from "./alert";

export const addVehicleByUser = (formData, history) => async (dispatch) => {
  try {
    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const res = await axios.post("/api/vehicles/register", formData, config);

    dispatch({
      type: ADD_VEHICLE_SUCCESS,
      payload: res.data,
    });

    dispatch(setAlert("Nuevo vehículo añadido", "success"));

    history.push("/user/vehicles");
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: ADD_VEHICLE_FAIL,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const getVehiclesByUser = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/vehicles/vehicles");
    dispatch({
      type: GET_VEHICLES_BY_USER,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: GET_VEHICLES_FAIL,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
