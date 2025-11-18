// src/services/memo.service.ts
import { AppDataSource } from "../data-source";
import { Memo } from "../entities/memo.entity";
import { User } from "../entities/user.entity";
import { Category } from "../entities/category.entity";

const memoRepo = AppDataSource.getRepository(Memo);
const userRepo = AppDataSource.getRepository(User);
const categoryRepo = AppDataSource.getRepository(Category);

export const memoService = {
  async createMemo(params: {
    userId: string;
    title: string;
    content: string;
    parentCategoryId?: string;
    categoryIds?: string[];
  }) {
    const { userId, title, content, parentCategoryId, categoryIds } = params;

    const user = await userRepo.findOne({ where: { id: userId } });
    if (!user) throw new Error("user not found");

    let parentCategory: Category | null = null;
    if (parentCategoryId) {
      parentCategory = await categoryRepo.findOne({
        where: { id: parentCategoryId },
      });
      if (!parentCategory) throw new Error("parentCategory not found");
    }

    let categories: Category[] = [];
    if (categoryIds && categoryIds.length > 0) {
      categories = await categoryRepo.findByIds(categoryIds);
    }

    const memo = memoRepo.create({
      title,
      content,
      user,
      parentCategory,
      categories,
    });

    return await memoRepo.save(memo);
  },

  async getAllMemos() {
    return await memoRepo.find({
      relations: ["user", "parentCategory", "categories", "bookmarks"],
      order: { created_at: "DESC" },
    });
  },

  async getMemosByCategory(categoryId: string) {
    return await memoRepo
      .createQueryBuilder("memo")
      .leftJoinAndSelect("memo.categories", "category")
      .leftJoinAndSelect("memo.user", "user")
      .where("category.id = :categoryId", { categoryId })
      .orderBy("memo.created_at", "DESC")
      .getMany();
  },
};
