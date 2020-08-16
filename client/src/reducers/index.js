import { combineReducers } from "redux";

import alert from "./alert";
import search from "./search";
import auth from "./auth";
import driver from "./driver";
import client from "./client";
import vehicle from "./vehicle";
import provider from "./provider";
import user from "./user";

export default combineReducers({
  alert,
  auth,
  search,
  driver,
  user,
  client,
  vehicle,
  provider,
});
