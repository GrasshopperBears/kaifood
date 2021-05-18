export const USER_CHECK_LOGIN = "USER_CHECK_LOGIN";
export const USER_LOGIN = "USER_LOGIN";
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

export const userLogout = () => {
  return {
    type: USER_LOGOUT,
  };
};
