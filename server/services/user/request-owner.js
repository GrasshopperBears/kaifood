import User from "../../models/user";

const requestOwner = async (req, res) => {
  const uid = req.body.uid;
  try {
    await User.findOneAndUpdate({ uid }, { $push: { userType: "owner" } });
    res.sendStatus(200);
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
};

export default requestOwner;
