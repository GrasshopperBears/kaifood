require("dotenv").config();
const env = process.env;

const development = {
  username: env.MYSQL_USERNAME_DEV,
  password: env.MYSQL_PASSWORD_DEV,
  database: env.MYSQL_DATABASE_DEV,
  host: env.MYSQL_HOST_DEV,
  dialect: "mysql",
};
const production = {
  username: env.MYSQL_USERNAME,
  password: env.MYSQL_PASSWORD,
  database: env.MYSQL_DATABASE,
  host: env.MYSQL_HOST,
  dialect: "mysql",
};

module.exports = { development, production };
