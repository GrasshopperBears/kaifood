import apiInstance from "../api-instance";

const signup = async (uid) => {
  try {
    const result = await apiInstance.post("/user/signin", { uid });
    return result.data;
  } catch (e) {
    return { success: false, message: "알 수 없는 오류가 발생했습니다" };
  }
};

export default signup;
