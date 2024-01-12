import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from "@nestjs/common";
import { UserBO } from "./bo/user.bo";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User } from "./entities/user.entity";

@Controller("user")
export class UserController {
  constructor(private readonly userBO: UserBO) {}

  @Post()
  public async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    this.userBO.start();
    this.userBO.setData(createUserDto);
    await this.userBO.save();

    const user = this.userBO.getUser();

    return user;
  }

  @Get(":id")
  public async findOne(@Param("id", ParseIntPipe) id: number): Promise<User> {
    await this.userBO.load(id);
    const user = this.userBO.getUser();

    return user;
  }

  @Patch(":id")
  public async update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    this.userBO.load(id);
    this.userBO.updateData(updateUserDto);
    this.userBO.save();

    const user = this.userBO.getUser();

    return user;
  }

  @Delete(":id")
  public async remove(@Param("id", ParseIntPipe) id: number): Promise<void> {
    await this.userBO.load(id);
    await this.userBO.remove();
  }
}
