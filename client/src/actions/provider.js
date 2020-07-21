import axios from "axios";

import {
  ADD_PROVIDER_FAIL,
  ADD_PROVIDER_SUCCESS,
  GET_PROVIDER_BY_USER,
  GET_PROVIDER_FAIL,
} from "./types";
import { setAlert } from "./alert";

export const addProviderByUser = (formData, history) => async (dispatch) => {
  try {
    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const res = await axios.post("/api/providers/register", formData, config);

    dispatch({
      type: ADD_PROVIDER_SUCCESS,
      payload: res.data,
    });

    dispatch(setAlert("Nuevo proveedor añadido", "success"));

    history.push("/user/providers");
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: ADD_PROVIDER_FAIL,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const getProvidersByUser = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/providers/providers");
    dispatch({
      type: GET_PROVIDER_BY_USER,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: GET_PROVIDER_FAIL,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
