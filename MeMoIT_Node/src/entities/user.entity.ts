// user.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { Memo } from "./memo.entity";
import { Bookmark } from "./bookmark.entity";
import { Category } from "./category.entity";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  password_hash!: string;

  @Column({ unique: true })
  nickname!: string;

  @OneToMany(() => Memo, memo => memo.user)
  memos!: Memo[];

  @OneToMany(() => Bookmark, b => b.user)
  bookmarks!: Bookmark[];

  @OneToMany(() => Category, category => category.user)
  categories!: Category[];

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;
}
