// src/entities/memo.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { User } from "./user.entity";
import { Category } from "./category.entity";
import { Bookmark } from "./bookmark.entity";

@Entity("memos")
export class Memo {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  title!: string;

  @Column("text")
  content!: string;

  @ManyToOne(() => User, (user) => user.memos, { onDelete: "CASCADE" })
  user!: User;

  // 대표 상위 카테고리 (1개)
  @ManyToOne(() => Category, (category) => category.memosAsParent, {
    nullable: true,
    onDelete: "SET NULL",
  })
  parentCategory!: Category | null;

  // 여러 카테고리에 태깅 (N:N)
  @ManyToMany(() => Category, (category) => category.memos, {
    cascade: true,
  })
  @JoinTable({
    name: "memo_categories", // 조인 테이블 이름
  })
  categories!: Category[];

  @Column({ default: false })
  is_bookmarked!: boolean;

  @OneToMany(() => Bookmark, (bookmark) => bookmark.memo)
  bookmarks!: Bookmark[];

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;
}
