import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  nickname: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  userType: {
    type: [{ type: String, enum: ["user", "owner"] }],
  },
});

const Users = mongoose.model("User", userSchema);

export default Users;
