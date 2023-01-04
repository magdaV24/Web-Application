import mysql from "mysql";

const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "test.2345",
    database: "social_media_app",
  });

export default db
