import {
  GET_VEHICLES_BY_USER,
  GET_VEHICLES_FAIL,
  ADD_VEHICLE_SUCCESS,
  ADD_VEHICLE_FAIL,
} from "../actions/types";

const initialState = {
  vehicles: [],
  vehicle: null,
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case ADD_VEHICLE_SUCCESS:
      return {
        ...state,
        vehicle: payload,
        loading: false,
      };
    case GET_VEHICLES_BY_USER:
      return {
        ...state,
        vehicles: payload,
        loading: false,
      };
    case ADD_VEHICLE_FAIL:
    case GET_VEHICLES_FAIL:
      return {
        ...state,
        vehicles: [],
        vehicle: null,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
}
