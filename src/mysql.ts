import mysql from "mysql";

const pool = mysql.createPool({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "Avianca6124",
  database: "api-yt-project",
});

export { pool };