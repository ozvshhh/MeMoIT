// src/services/category.service.ts
import { AppDataSource } from "../data-source";
import { Category } from "../entities/category.entity";
import { User } from "../entities/user.entity";

const categoryRepo = AppDataSource.getRepository(Category);
const userRepo = AppDataSource.getRepository(User);

export const categoryService = {
  async createCategory(params: {
    name: string;
    userId?: string;
    parentId?: string;
  }) {
    const { name, userId, parentId } = params;

    const category = new Category();
    category.name = name;

    if (userId) {
      const user = await userRepo.findOne({ where: { id: userId } });
      if (!user) throw new Error("user not found");
      category.user = user;
    } else {
      category.user = null;
    }

    if (parentId) {
      const parent = await categoryRepo.findOne({ where: { id: parentId } });
      if (!parent) throw new Error("parent category not found");
      category.parent = parent;
    } else {
      category.parent = null;
    }

    return await categoryRepo.save(category);
  },

  async searchCategories(q?: string, userId?: string) {
    const query = categoryRepo
      .createQueryBuilder("category")
      .leftJoinAndSelect("category.user", "user")
      .leftJoinAndSelect("category.parent", "parent")
      .leftJoinAndSelect("category.children", "children");

    if (q) {
      query.andWhere("category.name LIKE :q", { q: `%${q}%` });
    }

    if (userId) {
      query.andWhere("(user.id = :userId OR category.user IS NULL)", { userId });
    }

    return await query.getMany();
  },
};
