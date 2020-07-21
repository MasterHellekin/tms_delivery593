import axios from "axios";

import {
  GET_CLIENTS_BY_USER,
  GET_CLIENTS_FAIL,
  ADD_CLIENT_SUCCESS,
  ADD_CLIENT_FAIL,
} from "./types";
import { setAlert } from "./alert";

export const addClientByUser = (formData, history) => async (dispatch) => {
  try {
    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const res = await axios.post("/api/clients/register", formData, config);

    dispatch({
      type: ADD_CLIENT_SUCCESS,
      payload: res.data,
    });

    dispatch(setAlert("Nuevo cliente añadido", "success"));

    history.push("/user/clients");
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: ADD_CLIENT_FAIL,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const getClientsByUser = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/clients/clients");
    dispatch({
      type: GET_CLIENTS_BY_USER,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: GET_CLIENTS_FAIL,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
