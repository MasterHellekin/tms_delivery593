import axios from "axios";

import { setAlert } from "./alert";

import {
  SEARCH_PIA_SUCCESS,
  SEARCH_PIA_FAIL,
  GET_PIAS_BY_USER,
  GET_PIAS_BY_DRIVER,
  GET_PIA_BY_USER,
  UPDATE_STATUS_PIA,
  GET_PIAS_ERROR,
} from "./types";

export const searchByPia = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/pia/${id}`);

    dispatch({
      type: SEARCH_PIA_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: SEARCH_PIA_FAIL,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const getPiaByUser = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/pia/user/me");

    dispatch({
      type: GET_PIAS_BY_USER,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: GET_PIAS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const getPiaByDriver = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/pia/driver/me");
    dispatch({
      type: GET_PIAS_BY_DRIVER,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: GET_PIAS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const addPiaUser = (formData, history) => async (dispatch) => {
  try {
    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const res = await axios.post("/api/pia/add", formData, config);

    dispatch({
      type: GET_PIA_BY_USER,
      payload: res.data,
    });

    dispatch(setAlert("Nueva PIA añadida", "success"));

    history.push("/user/pias");
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: GET_PIAS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const updatePiaStatus = (id, formData, history) => async (dispatch) => {
  try {
    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const res = await axios.put(`/api/pia/${id}`, formData, config);

    dispatch({
      type: UPDATE_STATUS_PIA,
      payload: res.data,
    });

    dispatch(setAlert("Estado de la PIA actualizada", "success"));

    history.push("/driver/pias");
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: GET_PIAS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
