import { User } from "src/user/entities/user.entity";
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity({
  name: "post",
})
export class Post {
  @PrimaryGeneratedColumn({
    name: "pos_id",
    primaryKeyConstraintName: "pk_pos_id",
  })
  public id: number;

  @Column({
    name: "pos_title",
    nullable: false,
  })
  public title: string;

  @Column({
    name: "pos_content",
    nullable: false,
  })
  public content: string;

  @ManyToOne(() => User)
  @JoinColumn({
    name: "use_id",
    foreignKeyConstraintName: "fk_pos_use",
  })
  public user: User;
}
