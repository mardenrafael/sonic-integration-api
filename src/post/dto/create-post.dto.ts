import { User } from "src/user/entities/user.entity";

export class CreatePostDto {
  public title: string;
  public content: string;
  public user: Pick<User, "id">;
}
