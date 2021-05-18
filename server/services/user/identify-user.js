import User from "../../models/user";

const identifyUser = async (req, res, next) => {
  const uid = req.header("Authorization");
  if (!uid || !uid.length) return res.sendStatus(401);

  const existingUser = await User.findOne({ uid });
  if (!existingUser) return res.sendStatus(401);

  req.body.uid = uid;
  next();
};

export default identifyUser;
