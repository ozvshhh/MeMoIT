// import express from "express";
// import { pool } from "../../config/db";

// const router = express.Router();

// router.get("/", async (req,res)=>{
//     try{
//         const [rows] = await pool.query("SELECT NOW() AS now");
//         res.json(rows);
//     } catch (err) {
//         console.error(err);
//         res.status(500).send("DB 연결 실패");
//     }
// })

// export default router;
