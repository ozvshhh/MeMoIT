// src/routes/bookmark.routes.ts
import { Router } from "express";
import { BookmarkService } from "../services/bookmark.service";

const router = Router();
const service = new BookmarkService();

// 북마크 등록
router.post("/", async (req, res) => {
  try {
    const { userId, memoId } = req.body;
    const bookmark = await service.addBookmark(userId, memoId);
    res.status(201).json(bookmark);
  } catch (e: any) {
    res.status(400).json({ message: e.message });
  }
});

// 북마크 해제
router.delete("/", async (req, res) => {
  try {
    const { userId, memoId } = req.body;
    await service.removeBookmark(userId, memoId);
    res.status(204).send();
  } catch (e: any) {
    res.status(400).json({ message: e.message });
  }
});

// 특정 유저의 북마크 리스트 조회
router.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const bookmarks = await service.getUserBookmarks(userId);
    res.json(bookmarks);
  } catch (e: any) {
    res.status(400).json({ message: e.message });
  }
});

export default router;
