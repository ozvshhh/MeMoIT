import express from "express";
import errorHandlerTestRouter from "./errorHandlerTestRouter";
import winstonLoggerTestRouter from "./winstonLoggerTestRouter";
import dbTestRouter from "./dbTestRouter";

const testRouter = express.Router();

testRouter.use("/error", errorHandlerTestRouter);
testRouter.use("/logger", winstonLoggerTestRouter);
testRouter.use("/db-test", dbTestRouter);

export default testRouter; 