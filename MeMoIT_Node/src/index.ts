import express, { type Express, type Request, type Response } from 'express';
import dotenv from "dotenv";
import cors from "cors";

import { AppDataSource } from './data-source';

import { errorHandler } from './middleware/errorHandler';
import { requestLogger, consoleLogger } from './middleware/morganLogger';
import testRouter from "./routes/test/index";

import memoRouter from "./routes/memo.routes";
import categoryRouter from "./routes/category.routes";
import userRouter from "./routes/user.routes";

dotenv.config(); // 실행코드 최상단에 위치할 것
//env 사용하는 방법. <- 민감한 데이터는 이렇게 쓰자

// const dbUser = process.env.DB_USER;
// const apiKey = process.env.OPENAI_API_KEY;
// console.log("Server port:", port);

const app: Express = express();
const port = process.env.PORT || 5000;



//!미들웨어급 연결

//CORS 설정
const corsOptions = {
  origin : ["http://localhost:3000"],
  methods : ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};
app.use(cors(corsOptions));// cors
app.use(express.json()); //json 파서

app.use(consoleLogger); // 파일로그
app.use(requestLogger); // 콘솔로그

//!라우터연결
app.use("/test", testRouter);

app.get('/', (req: Request, res: Response) => {
  res.send('Typescript + Node.js + Express Server');
});

AppDataSource.initialize()
  .then(() => {
    console.log("✅ Database connected");
    // 라우터 연결
    app.use("/memos", memoRouter);

    app.listen(port, () => {
      console.log(`🚀 Server listening on http://localhost:${port}`);
    });
  })
  .catch(err => {
    console.error("DB init error:", err);
  });

//에러핸들러 - 모든 라우터의 아래에 존재할 것
app.use(errorHandler);