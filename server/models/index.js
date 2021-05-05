import tunnel from "tunnel-ssh";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.DB_STRING, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      dbName: process.env.DB_NAME,
    });
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error(err);
  }
};

if (process.env.NODE_ENV == "development") {
  const { SSH_USER, SSH_PASSWORD, SSH_HOST, SSH_PORT, DB_HOST, DB_PORT } = process.env;
  const sshConfig = {
    username: SSH_USER,
    password: SSH_PASSWORD,
    host: SSH_HOST,
    port: SSH_PORT,
    dstHost: DB_HOST,
    dstPort: DB_PORT,
  };

  tunnel(sshConfig, (error) => {
    if (error) throw error;
    connectDb();
  });
} else connectDb();

export default mongoose;
