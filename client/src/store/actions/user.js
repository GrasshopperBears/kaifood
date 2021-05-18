export const USER_CHECK_LOGIN = "USER_CHECK_LOGIN";
export const USER_LOGIN = "USER_LOGIN";
export const USER_SET_OWNER = "USER_SET_OWNER";
export const USER_LOGOUT = "USER_LOGOUT";

export const userCheckLogin = () => {
  return {
    type: USER_CHECK_LOGIN,
  };
};

export const userLogin = (isOwner) => {
  return {
    type: USER_LOGIN,
    payload: { isOwner },
  };
};

export const userSetOwner = () => {
  return {
    type: USER_SET_OWNER,
  };
};

export const userLogout = () => {
  return {
    type: USER_LOGOUT,
  };
};
