import { SEARCH_PIA_SUCCESS, SEARCH_PIA_FAIL } from "../actions/types";

const initialState = {
  pia: null,
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case SEARCH_PIA_SUCCESS:
      return {
        ...state,
        pia: payload,
        loading: false,
      };
    case SEARCH_PIA_FAIL:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
}
