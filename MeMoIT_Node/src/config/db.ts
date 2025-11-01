import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

["DB_HOST","DB_PORT","DB_USER","DB_PASS","DB_NAME"].forEach((key) => {
  if (!process.env[key]) {
    throw new Error(`${key} is not defined in .env`);
  }
});

export const pool = mysql.createPool({
  host: process.env.DB_HOST!,        // 
  port: Number(process.env.DB_PORT!),// 
  user: process.env.DB_USER!,        // 
  password: process.env.DB_PASS!,// 
  database: process.env.DB_NAME!,    // 
});