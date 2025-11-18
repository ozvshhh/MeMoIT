// src/entities/category.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  ManyToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "./user.entity";
import { Memo } from "./memo.entity";

@Entity("categories")
export class Category {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  name!: string;

  // 상위 카테고리
  @ManyToOne(() => Category, (category) => category.children, {
    nullable: true,
    onDelete: "CASCADE",
  })
  parent!: Category | null;

  // 하위 카테고리들
  @OneToMany(() => Category, (category) => category.parent)
  children!: Category[];

  // 해당 카테고리를 소유한 유저 (null이면 시스템 기본 카테고리)
  @ManyToOne(() => User, (user) => user.categories, {
    nullable: true,
    onDelete: "SET NULL",
  })
  user!: User | null;

  // 메모가 가진 "많은 카테고리"와의 N:N 역방향
  @ManyToMany(() => Memo, (memo) => memo.categories)
  memos!: Memo[];

  // 대표 상위 카테고리로 지정된 메모들 (옵션)
  @OneToMany(() => Memo, (memo) => memo.parentCategory)
  memosAsParent!: Memo[];

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;
}
