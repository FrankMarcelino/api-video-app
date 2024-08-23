import mysql from "mysql";

const pool = mysql.createPool({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "api-yt-project",
});

export { pool };
