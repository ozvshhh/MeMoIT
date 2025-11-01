import { Router, type Request, type Response } from "express";
import { logger } from "../../middleware/winstonLogger";

const router = Router()

router.get("/", (req,res)=>{
    logger.info("Test route accessed");
    res.send("Check your logs!");
})

export default router;