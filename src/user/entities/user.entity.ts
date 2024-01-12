import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({
  name: "user",
})
export class User {
  @PrimaryGeneratedColumn({
    name: "use_id",
    primaryKeyConstraintName: "pk_use_id",
  })
  public id: number;

  @Column({
    name: "use_name",
    nullable: false,
  })
  public name: string;
}
