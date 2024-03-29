import { Injectable, Logger } from "@nestjs/common";
import { User } from "src/user/entities/user.entity";
import { CreateUserDto } from "../dto/create-user.dto";
import { UpdateUserDto } from "./../dto/update-user.dto";
import { UserService } from "./../user.service";

@Injectable()
export class UserBO {
  private readonly logger: Logger = new Logger(UserBO.name);

  private user: User;
  private started: boolean;

  constructor(private readonly userService: UserService) {}

  public start(): void {
    this.user = new User();
  }

  public async load(id: number): Promise<void> {
    this.user = await this.userService.findOneById(id);
  }

  public setData(createUserDto: CreateUserDto): void {
    if (this.started === false) {
      throw new Error("Não iniciou o BO corretamente!");
    }

    this.user.name = createUserDto.name;
  }

  public updateData(updateUserDto: UpdateUserDto): void {
    if (this.started === false) {
      throw new Error("Não iniciou o BO corretamente!");
    }

    this.user.name = updateUserDto.name;
  }

  public async save(): Promise<void> {
    this.user = await this.userService.create(this.user);
  }

  public async remove(): Promise<void> {
    await this.userService.remove(this.user.id);
  }

  public getUser(): User {
    return this.user;
  }
}
