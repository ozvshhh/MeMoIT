// bookmark.entity.ts
import { Entity, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn } from "typeorm";
import { User } from "./user.entity";
import { Memo } from "./memo.entity";

@Entity("bookmarks")
export class Bookmark {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @ManyToOne(() => User, user => user.bookmarks, { onDelete: "CASCADE" })
  user!: User;

  @ManyToOne(() => Memo, memo => memo.bookmarks, { onDelete: "CASCADE" })
  memo!: Memo;

  @CreateDateColumn()
  created_at!: Date;
}
