import apiInstance from "../api-instance";

const signup = async (data) => {
  try {
    const result = await apiInstance.post("/user/signup", data);
    return result.data;
  } catch (e) {
    return { success: false, message: "알 수 없는 오류가 발생했습니다" };
  }
};

export default signup;
