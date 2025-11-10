
import dotenv from "dotenv";
import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entities/user.entity";
import { Category } from "./entities/category.entity";
import { Memo } from "./entities/memo.entity";
import { Bookmark } from "./entities/bookmark.entity";

dotenv.config(); // 이걸 최상단에 추가
console.log("유저네임",process.env.DB_USER!);

export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST! ,
  port: Number(process.env.DB_PORT!) ,
  username: process.env.DB_USER! ,
  password: process.env.DB_PASS! ,
  database: process.env.DB_NAME! ,
  entities: [__dirname + "/entities/*.entity.{ts,js}"],
  synchronize: true,   // 개발에서는 true, 배포시 false + migration 권장
  logging: false
});
