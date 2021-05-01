import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  uid: { type: String, required: true, unique: true },
  nickname: { type: String, required: true, unique: true },
  userType: {
    type: [{ type: String, enum: ["user", "owner"] }],
  },
});

const Users = mongoose.model("User", userSchema);

export default Users;
