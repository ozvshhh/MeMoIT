import "express-async-errors"; // 반드시 import 첫줄
import { errorHandler } from "../../middleware/errorHandler";
import { Router, type Request, type Response } from "express";

const router = Router();

router.get("/", async (req, res) => {
  // try-catch 없이 throw 가능
  throw new Error("Async error!");
});

export default router;  