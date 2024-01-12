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
import { PostBO } from "./bo/post.bo";
import { CreatePostDto } from "./dto/create-post.dto";
import { UpdatePostDto } from "./dto/update-post.dto";
import { Post as PostEntity } from "./entities/post.entity";

@Controller("post")
export class PostController {
  constructor(private readonly postBO: PostBO) {}

  @Post()
  public async create(
    @Body() createPostDto: CreatePostDto,
  ): Promise<PostEntity> {
    this.postBO.start();
    this.postBO.setData(createPostDto);
    await this.postBO.save();

    const post = this.postBO.getPost();
    return post;
  }

  @Get(":id")
  public async findOne(
    @Param("id", ParseIntPipe) id: number,
  ): Promise<PostEntity> {
    await this.postBO.load(id);

    const post = this.postBO.getPost();

    return post;
  }

  @Patch(":id")
  public async update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updatePostDto: UpdatePostDto,
  ): Promise<PostEntity> {
    await this.postBO.load(id);
    this.postBO.updateData(updatePostDto);
    await this.postBO.save();

    const post = this.postBO.getPost();

    return post;
  }

  @Delete(":id")
  public async remove(@Param("id", ParseIntPipe) id: number): Promise<void> {
    await this.postBO.load(id);
    await this.postBO.remove();
  }
}
