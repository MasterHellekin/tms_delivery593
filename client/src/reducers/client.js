import {
  GET_CLIENTS_BY_USER,
  GET_CLIENTS_FAIL,
  ADD_CLIENT_SUCCESS,
  ADD_CLIENT_FAIL,
} from "../actions/types";

const initialState = {
  clients: [],
  client: null,
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case ADD_CLIENT_SUCCESS:
      return {
        ...state,
        client: payload,
        loading: false,
      };
    case GET_CLIENTS_BY_USER:
      return {
        ...state,
        clients: payload,
        loading: false,
      };
    case GET_CLIENTS_FAIL:
    case ADD_CLIENT_FAIL:
      return {
        ...state,
        clients: [],
        client: null,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
}
