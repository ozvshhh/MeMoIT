import express from "express";
import errorHandlerTestRouter from "./errorHandlerTestRouter";
import winstonLoggerTestRouter from "./winstonLoggerTestRouter";
// import dbTestRouter from "./dbTestRouter";
import openaiTestRouter from "./openaiTestRouter";

const testRouter = express.Router();

testRouter.use("/error", errorHandlerTestRouter);
testRouter.use("/logger", winstonLoggerTestRouter);
// testRouter.use("/db-test", dbTestRouter);
testRouter.use("/openai", openaiTestRouter);

export default testRouter; 