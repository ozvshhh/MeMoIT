import { Router } from "express";
import { AppDataSource } from "../data-source";
import { Memo } from "../entities/memo.entity";
import { User } from "../entities/user.entity";

const router = Router();
const memoRepo = AppDataSource.getRepository(Memo);
const userRepo = AppDataSource.getRepository(User);

// ======================
// 유저 생성
// ======================
router.post("/users", async (req, res) => {
  const { email, password_hash, nickname } = req.body;
  try {
    // 중복 이메일/닉네임 체크
    const existingUser = await userRepo.findOne({ where: [{ email }, { nickname }] });
    if (existingUser) {
      return res.status(400).json({ message: "Email or nickname already exists" });
    }

    const user = userRepo.create({ email, password_hash, nickname });
    await userRepo.save(user);

    res.status(201).json(user);
  } catch (e: any) {
    res.status(500).json({ message: e.message });
  }
});

// ======================
// 메모 생성
// ======================
router.post("/", async (req, res) => {
  const { userId, title, content } = req.body;
  try {
    const user = await userRepo.findOne({ where: { id: userId }});
    if (!user) return res.status(404).json({ message: "user not found" });

    const memo = memoRepo.create({ title, content, user });
    await memoRepo.save(memo);
    res.status(201).json(memo);
  } catch (e: any) {
    res.status(500).json({ message: e.message });
  }
});

// ======================
// 전체 메모 조회
// ======================
router.get("/", async (req, res) => {
  try {
    const memos = await memoRepo.find({ relations: ["user", "bookmarks"]});
    res.json(memos);
  } catch (e: any) {
    res.status(500).json({ message: e.message });
  }
});

export default router;