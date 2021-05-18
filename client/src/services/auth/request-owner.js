import apiInstance from "../api-instance";

const requestOwner = async () => {
  try {
    await apiInstance.post("/user/request-owner");
    return true;
  } catch (e) {
    return false;
  }
};

export default requestOwner;
