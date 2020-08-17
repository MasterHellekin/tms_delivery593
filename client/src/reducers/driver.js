import {
  GET_DRIVERS_BY_USER,
  GET_DRIVERS_FAIL,
  REGISTER_DRIVER_SUCCESS,
  REGISTER_DRIVER_FAIL,
  UPDATE_LOCATION_DRIVER,
} from "../actions/types";

const initialState = {
  drivers: [],
  driver: null,
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case REGISTER_DRIVER_SUCCESS:
    case UPDATE_LOCATION_DRIVER:
      return {
        ...state,
        driver: payload,
        loading: false,
      };
    case GET_DRIVERS_BY_USER:
      return {
        ...state,
        drivers: payload,
        loading: false,
      };
    case GET_DRIVERS_FAIL:
    case REGISTER_DRIVER_FAIL:
      return {
        ...state,
        drivers: [],
        driver: null,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
}
