import axios from "axios";

import { REGISTER_USER_SUCCESS, REGISTER_USER_FAIL } from "./types";
import { setAlert } from "./alert";

export const registerUser = (formData, history) => async (dispatch) => {
  try {
    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const res = await axios.post("/api/users/register", formData, config);

    dispatch({
      type: REGISTER_USER_SUCCESS,
      payload: res.data,
    });

    dispatch(setAlert("Nuevo usuario añadido", "success"));

    history.push("/");
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: REGISTER_USER_FAIL,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
