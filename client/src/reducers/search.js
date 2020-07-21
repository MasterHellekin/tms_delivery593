import {
  SEARCH_PIA_SUCCESS,
  SEARCH_PIA_FAIL,
  GET_PIAS_BY_USER,
  GET_PIAS_BY_DRIVER,
  GET_PIA_BY_USER,
  UPDATE_STATUS_PIA,
  GET_PIAS_ERROR,
} from "../actions/types";

const initialState = {
  pia: null,
  pias: [],
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case SEARCH_PIA_SUCCESS:
    case GET_PIA_BY_USER:
    case UPDATE_STATUS_PIA:
      return {
        ...state,
        pia: payload,
        loading: false,
      };
    case GET_PIAS_BY_USER:
    case GET_PIAS_BY_DRIVER:
      return {
        ...state,
        pias: payload,
        loading: false,
      };
    case SEARCH_PIA_FAIL:
    case GET_PIAS_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
        pia: null,
        pias: [],
      };
    default:
      return state;
  }
}
