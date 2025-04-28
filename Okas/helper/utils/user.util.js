import localStore from "./localstore.util";
import { get } from "lodash";

/* Set User Info */
export const setUserInfo = (info) => {
  const _data = { ...info };
  localStore.store_data("userinfo", _data);
  return true;
};

export const getUserInfo = () => {
  localStore.get_data("userinfo");
}

export const removeUserInfo = () => {
  localStore.remove_data("userinfo");
}

/* Set User Role */
export const setUserRole = (info) => {
  const _data = { ...info };
  localStore.store_data("userRole", _data);
  return true;
};

export const getUserRole = () => {
  get(localStore.get_data("userRole"), "role");
}

export const removeUserRole = () => {
  localStore.remove_data("userRole");
}
