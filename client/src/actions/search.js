import axios from "axios";

import { SEARCH_PIA_SUCCESS, SEARCH_PIA_FAIL } from "./types";

export const searchByPia = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/locations/${id}`);

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
