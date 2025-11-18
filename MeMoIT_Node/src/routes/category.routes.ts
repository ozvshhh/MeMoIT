// src/routes/category.routes.ts
import { Router } from "express";
import { categoryService } from "../services/category.service";

const router = Router();

// 카테고리 생성
router.post("/", async (req, res) => {
  try {
    const { name, userId, parentId } = req.body;
    const category = await categoryService.createCategory({
      name,
      userId,
      parentId,
    });
    res.status(201).json(category);
  } catch (e: any) {
    console.error(e);
    res.status(400).json({ message: e.message });
  }
});

// 카테고리 검색
router.get("/search", async (req, res) => {
  try {
    const { q, userId } = req.query;
    const categories = await categoryService.searchCategories(
      q as string | undefined,
      userId as string | undefined
    );
    res.json(categories);
  } catch (e: any) {
    res.status(500).json({ message: e.message });
  }
});

// 전체 카테고리 조회
router.get("/", async (req, res) => {
  try {
    const categories = await categoryService.searchCategories();
    res.json(categories);
  } catch (e: any) {
    res.status(500).json({ message: e.message });
  }
});

export default router;
