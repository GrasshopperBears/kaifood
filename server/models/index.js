import tunnel from "tunnel-ssh";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

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
    mongoose.connect(process.env.DB_STRING, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
  });
} else {
  mongoose.connect(process.env.DB_STRING, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });
}

export default mongoose;
