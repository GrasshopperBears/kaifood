import User from "../../models/user";

const signup = async (req, res, next) => {
  try {
    const { uid, nickname, realname } = req.body;
    await User.create({ uid, nickname, realname });
    res.json({ success: true });
  } catch (e) {
    if (e.code === 11000) res.json({ success: false, message: "이미 가입된 이메일입니다" });
    else res.json({ success: false, message: "가입 중 오류가 발생했습니다" });
  }
};

export default signup;
