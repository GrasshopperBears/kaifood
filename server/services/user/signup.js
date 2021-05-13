import User from "../../models/user";

const signup = async (req, res, next) => {
  try {
    const { uid, nickname, realname } = req.body;
    await User.create({ uid, nickname, realname });
    res.json({ success: true });
  } catch (e) {
    res.json({ success: false, message: "가입 중 오류가 발생했습니다." });
  }
};

export default signup;
