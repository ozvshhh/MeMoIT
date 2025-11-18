// src/routes/memo.routes.ts
import { Router } from "express";
import { memoService } from "../services/memo.service";

const router = Router();

// 메모 생성
router.post("/", async (req, res) => {
  try {
    const { userId, title, content, parentCategoryId, categoryIds } = req.body;

    const memo = await memoService.createMemo({
      userId,
      title,
      content,
      parentCategoryId,
      categoryIds,
    });

    res.status(201).json(memo);
  } catch (e: any) {
    console.error(e);
    res.status(400).json({ message: e.message });
  }
});

// 전체 메모 조회
router.get("/", async (req, res) => {
  try {
    const memos = await memoService.getAllMemos();
    res.json(memos);
  } catch (e: any) {
    res.status(500).json({ message: e.message });
  }
});

// 특정 카테고리의 메모 조회 (N:N 카테고리 태깅 기준)
router.get("/category/:categoryId", async (req, res) => {
  try {
    const { categoryId } = req.params;
    const memos = await memoService.getMemosByCategory(categoryId);
    res.json(memos);
  } catch (e: any) {
    res.status(500).json({ message: e.message });
  }
});

export default router;
