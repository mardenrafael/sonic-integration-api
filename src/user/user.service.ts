import { Injectable, Logger } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { DataSource } from "typeorm";

@Injectable()
export class UserService {
  private readonly logger: Logger = new Logger(UserService.name);

  constructor(private readonly dataSource: DataSource) {}

  public async create(createUserDto: CreateUserDto): Promise<string> {
    this.logger.log(createUserDto);
    return "This action adds a new user";
  }

  public async findAll(): Promise<string> {
    return `This action returns all user`;
  }

  public async findOne(id: number): Promise<string> {
    return `This action returns a #${id} user`;
  }

  public async update(
    id: number,
    updateUserDto: UpdateUserDto,
  ): Promise<string> {
    this.logger.log(updateUserDto);
    return `This action updates a #${id} user`;
  }

  public async remove(id: number): Promise<string> {
    return `This action removes a #${id} user`;
  }
}
