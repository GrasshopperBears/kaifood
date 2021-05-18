import User from "../../models/user";

const signin = async (req, res) => {
  try {
    const { uid } = req.body;
    const { userType } = await User.findOne({ uid });
    res.json({ success: true, isOwner: userType.includes("owner") });
  } catch (e) {
    console.error(e);
    res.json({ success: false });
  }
};

export default signin;
