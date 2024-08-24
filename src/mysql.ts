import mysql from "mysql";
import { config } from "dotenv";
config();

const pool = mysql.createPool({
  host: process.env.HOST_DATABASE,
  port: Number(process.env.PORT_DATABASE),
  user: process.env.USER_DATABASE,
  password: process.env.PASSWORD_DATABASE,
  database: process.env.DATABASE,
});

export { pool };
