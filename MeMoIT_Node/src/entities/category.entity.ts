// category.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { User } from "./user.entity";

@Entity("categories")
export class Category {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  name!: string;

  @ManyToOne(() => Category, category => category.children, { nullable: true, onDelete: "CASCADE" })
  parent!: Category | null;

  @OneToMany(() => Category, category => category.parent)
  children!: Category[];

  @ManyToOne(() => User, user => user.categories, { nullable: true, onDelete: "SET NULL" })
  user!: User | null; // null이면 시스템 기본 카테고리

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;
}
