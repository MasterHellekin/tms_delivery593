import axios from "axios";

import {
  GET_DRIVERS_BY_USER,
  GET_DRIVERS_FAIL,
  REGISTER_DRIVER_FAIL,
  REGISTER_DRIVER_SUCCESS,
} from "./types";
import { setAlert } from "./alert";

export const registerDriverByUser = (formData, history) => async (dispatch) => {
  try {
    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const res = await axios.post("/api/drivers/register", formData, config);

    dispatch({
      type: REGISTER_DRIVER_SUCCESS,
      payload: res.data,
    });

    dispatch(setAlert("Nuevo conductor añadido", "success"));

    history.push("/user/drivers");
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: REGISTER_DRIVER_FAIL,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const getDriversByUser = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/drivers/drivers");
    dispatch({
      type: GET_DRIVERS_BY_USER,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: GET_DRIVERS_FAIL,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
