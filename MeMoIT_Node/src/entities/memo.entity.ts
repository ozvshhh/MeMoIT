// memo.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm";
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

  @ManyToOne(() => User, user => user.memos, { onDelete: "CASCADE" })
  user!: User;

  @ManyToOne(() => Category, { nullable: true, onDelete: "SET NULL" })
  category!: Category | null;

  @Column({ default: false })
  is_bookmarked!: boolean;

  @OneToMany(() => Bookmark, b => b.memo)
  bookmarks!: Bookmark[];

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;
}
