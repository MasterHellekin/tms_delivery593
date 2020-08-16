import { REGISTER_USER_SUCCESS, REGISTER_USER_FAIL } from "../actions/types";

const initialState = {
  users: [],
  user: null,
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case REGISTER_USER_SUCCESS:
      return {
        ...state,
        driver: payload,
        loading: false,
      };
    case REGISTER_USER_FAIL:
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
