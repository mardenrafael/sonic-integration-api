import { User } from "src/user/entities/user.entity";

export class CreatePostDto {
  private id: number;
  private title: string;
  private content: string;
  private user: User;

  public getId(): number {
    return this.id;
  }
  public getTitle(): string {
    return this.title;
  }
  public getContent(): string {
    return this.content;
  }
  public getUser(): User {
    return this.user;
  }
}
