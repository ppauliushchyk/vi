import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("books")
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ type: "timestamptz" })
  createdAt: Date;

  @DeleteDateColumn({ nullable: true, type: "timestamptz" })
  deletedAt?: Date;

  @UpdateDateColumn({ type: "timestamptz" })
  updatedAt: Date;

  @Column({ length: 255, type: "varchar" })
  author: string;

  @Column({ nullable: true, type: "text" })
  description?: string;

  @Column({ length: 20, nullable: true, type: "varchar" })
  isbn?: string;

  @Column({ length: 100, nullable: true, type: "varchar" })
  publisher?: string;

  @Column({ nullable: true, type: "integer" })
  publicationYear?: number;

  @Column({ length: 255, type: "varchar" })
  title: string;
}
