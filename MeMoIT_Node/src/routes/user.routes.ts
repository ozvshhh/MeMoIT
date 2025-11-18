// src/routes/user.routes.ts
import { Router } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entities/user.entity";

const router = Router();
const userRepo = AppDataSource.getRepository(User);

// 유저 생성
router.post("/", async (req, res) => {
  try {
    const { email, password_hash, nickname } = req.body;

    const exists = await userRepo.findOne({
      where: [{ email }, { nickname }],
    });

    if (exists) {
      return res
        .status(400)
        .json({ message: "email or nickname already exists" });
    }

    const user = userRepo.create({ email, password_hash, nickname });
    await userRepo.save(user);

    res.status(201).json(user);
  } catch (e: any) {
    res.status(500).json({ message: e.message });
  }
});

// 유저 리스트
router.get("/", async (req, res) => {
  try {
    const users = await userRepo.find();
    res.json(users);
  } catch (e: any) {
    res.status(500).json({ message: e.message });
  }
});

export default router;
