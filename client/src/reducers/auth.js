import {
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_DRIVER_SUCCESS,
  LOGIN_DRIVER_FAIL,
  DRIVER_LOADED,
  USER_LOADED,
  AUTH_ERROR,
  LOGOUT,
} from "../actions/types";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  loading: true,
  role: localStorage.getItem("role"),
  user: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        role: "user",
        user: payload,
      };
    case DRIVER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        role: "driver",
        user: payload,
      };
    case LOGIN_USER_SUCCESS:
      localStorage.setItem("token", payload.token);
      localStorage.setItem("role", "user");
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        role: "user",
        loading: false,
      };
    case LOGIN_DRIVER_SUCCESS:
      localStorage.setItem("token", payload.token);
      localStorage.setItem("role", "driver");
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        role: "driver",
        loading: false,
      };
    case LOGIN_USER_FAIL:
    case LOGIN_DRIVER_FAIL:
    case AUTH_ERROR:
    case LOGOUT:
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        role: "",
        loading: false,
        user: null,
      };
    default:
      return state;
  }
}
