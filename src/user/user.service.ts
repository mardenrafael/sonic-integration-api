import { Injectable, Logger } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User } from "./entities/user.entity";

@Injectable()
export class UserService {
  private readonly logger: Logger = new Logger(UserService.name);

  private readonly repository: Repository<User>;

  constructor(private readonly dataSource: DataSource) {
    this.repository = this.dataSource.getRepository(User);
  }

  public async create(user: User): Promise<User> {
    return await this.repository.save(user);
  }

  public async findAll(): Promise<string> {
    return `This action returns all user`;
  }

  public async findOneById(use_id: number): Promise<User> {
    return await this.repository.findOneBy({
      id: use_id,
    });
  }

  public async update(
    id: number,
    updateUserDto: UpdateUserDto,
  ): Promise<string> {
    this.logger.log(updateUserDto);
    return `This action updates a #${id} user`;
  }

  public async remove(id: number): Promise<void> {
    await this.repository.delete({
      id: id,
    });
  }
}
