import { Injectable, Logger } from "@nestjs/common";
import { CreatePostDto } from "../dto/create-post.dto";
import { UpdatePostDto } from "../dto/update-post.dto";
import { Post } from "../entities/post.entity";
import { PostService } from "../post.service";
import { User } from "src/user/entities/user.entity";
import { UserBO } from "src/user/bo/user.bo";

@Injectable()
export class PostBO {
  private readonly logger: Logger = new Logger(PostBO.name);

  private post: Post;
  private user: User;
  private started: boolean;

  constructor(
    private readonly userBO: UserBO,
    private readonly postService: PostService,
  ) {}

  public start(): void {
    this.post = new Post();
    this.user = new User();
  }

  public async load(id: number): Promise<void> {
    this.post = await this.postService.findOneById(id);
  }

  public async setData(createPostDto: CreatePostDto): Promise<void> {
    if (this.started === false) {
      throw new Error("Não iniciou o BO corretamente!");
    }
    await this.userBO.load(createPostDto.user.id);

    this.post.title = createPostDto.title;
    this.post.content = createPostDto.content;
    this.post.user = this.userBO.getUser();
  }

  public updateData(updatePostDto: UpdatePostDto): void {
    if (this.started === false) {
      throw new Error("Não iniciou o BO corretamente!");
    }

    this.post.content = updatePostDto.content;
    this.post.title = updatePostDto.title;
  }

  public async save(): Promise<void> {
    this.post = await this.postService.create(this.post);
  }

  public async remove(): Promise<void> {
    await this.postService.remove(this.post.id);
  }

  public getPost(): Post {
    return this.post;
  }
}
