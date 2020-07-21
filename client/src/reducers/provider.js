import {
  ADD_PROVIDER_FAIL,
  ADD_PROVIDER_SUCCESS,
  GET_PROVIDER_BY_USER,
  GET_CLIENTS_FAIL,
} from "../actions/types";

const initialState = {
  providers: [],
  provider: null,
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case ADD_PROVIDER_SUCCESS:
      return {
        ...state,
        provider: payload,
        loading: false,
      };
    case GET_PROVIDER_BY_USER:
      return {
        ...state,
        providers: payload,
        loading: false,
      };
    case ADD_PROVIDER_FAIL:
    case GET_CLIENTS_FAIL:
      return {
        ...state,
        providers: [],
        provider: null,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
}
